import React, { useState } from "react";
import styled from "styled-components";
import { useFetcher, Fetcher } from "react-fetcher-hooks";
import { Dropdown, Icon, Avatar, Modal, Button } from "rsuite";
import { useStoreActions, useStoreState } from "../../store";
import { PlaceSuggestion, LocationInput } from "./locationInput";
import { IUserProfile, ILocation } from "common";

const s = {};

interface UserAvatarProps {}

const UserAvatar: React.FC<UserAvatarProps> = () => {
  const fetcher = useFetcher();
  const user = useStoreState(state => state.auth.userData);
  const actions = useStoreActions(actions => actions.auth);
  const axios = useStoreState(state => state.axios);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [location, setLocation] = useState<PlaceSuggestion>();

  const signOut = () => {
    actions.onLogOff();
    window.location.href = "/";
  };

  const onLocationChange = (location: PlaceSuggestion) => {
    setLocation(location);
  };

  const validateNewLocation = () => {
    const request = () =>
      axios.patch("locations", {
        latitude: location.geo.latitude,
        longitude: location.geo.longitude
      } as Partial<ILocation>);
    fetcher.fetch(request, res => {
      window.location.href = "/";
    });
  };

  const { profile } = user;
  const initials = `${profile.firstName[0]}${profile.lastName[0]}`;
  const fullName = `${profile.firstName} ${profile.lastName}`;
  return (
    <>
      <Dropdown
        placement="leftStart"
        renderTitle={() => {
          return (
            <Avatar circle style={{ background: "#edfae1", color: "#4caf50" }}>
              {initials}
            </Avatar>
          );
        }}
      >
        <Dropdown.Item panel style={{ padding: 10, width: 160 }}>
          <p>Signed in as</p>
          <strong>{fullName}</strong>
        </Dropdown.Item>
        <Dropdown.Item divider />
        <Dropdown.Item disabled>
          <Icon icon="language" /> Change language
        </Dropdown.Item>
        <Dropdown.Item onSelect={() => setShowLocationModal(true)}>
          <Icon icon="location-arrow" /> Change location
        </Dropdown.Item>
        <Dropdown.Item divider />
        <Dropdown.Item onSelect={signOut}>
          <Icon icon="sign-out" /> Déconnexion
        </Dropdown.Item>
      </Dropdown>

      <Modal
        show={showLocationModal}
        onHide={() => setShowLocationModal(false)}
      >
        <Fetcher refs={fetcher}>
          <Modal.Header>
            <Modal.Title>Change Location</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Select a new location for your account
            <LocationInput onPlaceChanged={onLocationChange} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={validateNewLocation} appearance="primary">
              Validate and refresh page
            </Button>
            <Button
              onClick={() => setShowLocationModal(false)}
              appearance="subtle"
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Fetcher>
      </Modal>
    </>
  );
};

export { UserAvatar };
