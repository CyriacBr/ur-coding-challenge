import React, { useRef, useState, useEffect } from "react";
import algoliasearch from "algoliasearch";
import { useDebouncedCallback } from "use-debounce/lib";
import { ItemDataType } from "rsuite/lib/@types/common";
import { InputGroup, Icon, AutoComplete, Loader } from "rsuite";

export interface PlaceSuggestion {
  country: string;
  city: string;
  label: string;
  geo: {
    latitude: number;
    longitude: number;
  };
}

interface LocationInputProps {
  onPlaceChanged: (place: PlaceSuggestion) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({ onPlaceChanged }) => {
  const place = useRef<algoliasearch.Places.PlaceInterface>();
  const [placeSuggestions, setPlaceSuggestions] = useState<PlaceSuggestion[]>(
    []
  );
  const [placeLoading, setPlaceLoading] = useState(false);
  const [placeValue, setPlaceValue] = useState<PlaceSuggestion>();
  const [placeLabel, setPlaceLabel] = useState("");

  useEffect(() => {
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
        onPlaceChanged(sugg);
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
      onPlaceChanged(data as any);
    });
  };

  return (
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
  );
};

export { LocationInput };
