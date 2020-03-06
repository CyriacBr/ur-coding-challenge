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
import { LocationInput } from "../../shared/components/locationInput";

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
  const [placeValue, setPlaceValue] = useState<PlaceSuggestion>();
  const { register, handleSubmit, errors, setValue: setFormValue } = useForm<
    Form
  >();
  const [formData, setFormData] = useState<Form>({} as any);

  useEffect(() => {
    register("location", { required: true, name: "location" });
  }, []);

  const onPlaceChanged = (data: PlaceSuggestion) => {
    setFormValue("location", data.label);
    setPlaceValue(data);
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
          <LocationInput onPlaceChanged={onPlaceChanged} />
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
