import React, { useState, useRef, useMemo, useEffect } from "react";
import styled from "styled-components";
import { Card } from "../../shared/components/card";
import {
  Steps,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  ButtonToolbar,
  Button,
  InputGroup,
  Icon,
  InputPicker,
  AutoComplete,
  Loader
} from "rsuite";
import useForm from "react-hook-form";
import algoliasearch from "algoliasearch";
import { useDebouncedCallback } from "use-debounce";
import { ItemDataType } from "rsuite/lib/@types/common";
import { AuthDTO } from "common";

interface RegisterFormProps {
  onSubmit: (data: AuthDTO.SignUp) => void;
}

interface Form {
  firstName: string;
  lastName: string;
  location: string;
  email: string;
  password: string;
}

interface PlaceSuggestion {
  country: string;
  city: string;
  label: string;
  geo: {
    latitude: number;
    longitude: number;
  };
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [step, setStep] = useState(0);
  const place = useRef<algoliasearch.Places.PlaceInterface>();
  const [placeSuggestions, setPlaceSuggestions] = useState<PlaceSuggestion[]>(
    []
  );
  const [placeLoading, setPlaceLoading] = useState(false);
  const [placeValue, setPlaceValue] = useState<PlaceSuggestion>();
  const [placeLabel, setPlaceLabel] = useState("");
  const { register, handleSubmit, errors, setValue: setFormValue } = useForm<
    Form
  >();
  const [formData, setFormData] = useState<Form>({} as any);

  useEffect(() => {
    register("location", { required: true, name: "location" });
    /**
     * We're using Algolia Places API to geo-reverse and search
     * location in order to setup user's profile.
     * https://community.algolia.com/places
     */
    place.current = algoliasearch.initPlaces(
      "plYZPQ85CQKF",
      "e79835bdbafdefb2cfdef90c64903762"
    );
  }, []);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(async res => {
      setPlaceLoading(true);
      const results = await place.current.reverse({
        aroundLatLng: `${res.coords.latitude},${res.coords.longitude}`
      });
      setPlaceLoading(false);
      if (results && results.hits.length > 0) {
        const value = results.hits[0];
        const sugg: PlaceSuggestion = {
          country: value.country.default,
          city: value.administrative[0],
          label: `${value.country.default}, ${value.administrative[0]}`,
          geo: {
            latitude: value._geoloc.lat,
            longitude: value._geoloc.lng
          }
        };
        setPlaceValue(sugg);
        setPlaceLabel(sugg.label);
        setFormValue("location", sugg.label);
      }
    });
  };

  const [onPlaceInputChange] = useDebouncedCallback(async (value: string) => {
    if (!value) return;
    setPlaceLoading(true);
    const results = await place.current.search({
      query: value,
      type: "city",
      hitsPerPage: 2
    });
    setPlaceLoading(false);
    setPlaceSuggestions(
      results.hits.map(v => ({
        country: v.country.default,
        city: v.administrative[0],
        label: `${v.country.default}, ${v.administrative[0]}`,
        geo: {
          latitude: v._geoloc.lat,
          longitude: v._geoloc.lng
        }
      }))
    );
  }, 500);

  const onPlaceLabelChange = (value: string) => {
    setPlaceLabel(value);
    onPlaceInputChange(value);
  };

  const onPlaceSelect = (data: ItemDataType) => {
    setPlaceValue(data as any);
    setImmediate(() => {
      setPlaceLabel(data.label);
      setFormValue("location", data.label);
    });
  };

  const onProfilSubmit = (data: Form) => {
    setFormData(v => ({
      ...v,
      ...data
    }));
    setStep(1);
  };

  const onCredentialsSubmit = (data: Form) => {
    const { location, ...submitData }: Form = {
      ...formData,
      ...data
    };
    onSubmit({
      ...submitData,
      latitude: placeValue.geo.latitude,
      longitude: placeValue.geo.longitude
    });
  };

  const renderProfilForm = () => {
    return (
      <Form fluid>
        <FormGroup>
          <ControlLabel>Last Name</ControlLabel>
          <input
            className="rs-input"
            name="lastName"
            ref={register({ required: true })}
          />
          {errors.lastName && (
            <HelpBlock style={{ color: "red" }}>Required</HelpBlock>
          )}
        </FormGroup>
        <FormGroup>
          <ControlLabel>First Name</ControlLabel>
          <input
            className="rs-input"
            name="firstName"
            ref={register({ required: true })}
          />
          {errors.firstName && (
            <HelpBlock style={{ color: "red" }}>Required</HelpBlock>
          )}
        </FormGroup>
        <FormGroup>
          <ControlLabel>Location</ControlLabel>
          <InputGroup>
            <InputGroup.Button onClick={getCurrentLocation}>
              <Icon icon="map-marker" />
            </InputGroup.Button>
            <AutoComplete
              data={placeSuggestions}
              onChange={onPlaceLabelChange}
              onSelect={onPlaceSelect}
              value={placeLabel}
            />
            {placeLoading && (
              <InputGroup.Addon>
                <Loader />
              </InputGroup.Addon>
            )}
          </InputGroup>
          {errors.location && (
            <HelpBlock style={{ color: "red" }}>Required</HelpBlock>
          )}
        </FormGroup>
        <FormGroup>
          <ButtonToolbar>
            <Button appearance="primary" onClick={handleSubmit(onProfilSubmit)}>
              Next
            </Button>
          </ButtonToolbar>
        </FormGroup>
      </Form>
    );
  };

  const renderCredentialsForm = () => {
    return (
      <Form>
        <FormGroup>
          <ControlLabel>Email</ControlLabel>
          <input
            className="rs-input"
            name="email"
            ref={register({
              required: true,
              validate: v => {
                return v && !!(v as string).match(/.+\@.+\..+/i);
              }
            })}
          />
          {errors.email && (
            <HelpBlock style={{ color: "red" }}>Valid email required</HelpBlock>
          )}
        </FormGroup>
        <FormGroup>
          <ControlLabel>Password</ControlLabel>
          <input
            className="rs-input"
            name="password"
            type="password"
            ref={register({ required: true })}
          />
          {errors.password && (
            <HelpBlock style={{ color: "red" }}>Required</HelpBlock>
          )}
        </FormGroup>
        <FormGroup>
          <ButtonToolbar>
            <Button onClick={() => setStep(0)}>Previous</Button>
            <Button
              appearance="primary"
              onClick={handleSubmit(onCredentialsSubmit)}
            >
              Submit
            </Button>
          </ButtonToolbar>
        </FormGroup>
      </Form>
    );
  };

  return (
    <Card title="Sign Up" style={{ width: 300 }}>
      <Steps current={step} small>
        <Steps.Item title="Profile" />
        <Steps.Item title="Credentials" />
      </Steps>
      <br />
      <div>{step === 0 && renderProfilForm()}</div>
      <div>{step === 1 && renderCredentialsForm()}</div>
    </Card>
  );
};

export { RegisterForm };
