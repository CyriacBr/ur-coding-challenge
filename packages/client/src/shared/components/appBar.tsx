import React from "react";
import styled from "styled-components";
import { Dropdown, Avatar, Icon, Button } from "rsuite";
import { useStoreState } from "../../store";

const s = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1em;
    z-index: 10;

    box-shadow: 0 8px 20px 0 rgba(218, 224, 235, 0.6);
    background: rgb(251, 252, 253);
  `,
  Title: styled.span`
    font-size: 2em;
    font-weight: 600;
  `,
  Bloc: styled.div``
};

interface AppBarProps {}

const AppBar: React.FC<AppBarProps> = () => {
  const isLoggedIn = useStoreState(state => state.auth.loggedIn);
  const user = useStoreState(state => state.auth.userData);

  const renderBloc = () => {
    return isLoggedIn ? (
      renderAvatar()
    ) : (
      <Button appearance="primary">Register</Button>
    );
  };

  const renderAvatar = () => {
    const { profile } = user;
    const initials = `${profile.firstName[0]} ${profile.lastName[0]}`;
    const fullName = `${profile.firstName} ${profile.lastName}`;
    return (
      <Dropdown
        renderTitle={() => {
          return <Avatar circle>{initials}</Avatar>;
        }}
      >
        <Dropdown.Item panel style={{ padding: 10, width: 160 }}>
          <p>Signed in as</p>
          <strong>{fullName}</strong>
        </Dropdown.Item>
        <Dropdown.Item divider />
        <Dropdown.Item>
          <Icon icon="language" /> Change language
        </Dropdown.Item>
        <Dropdown.Item>
          <Icon icon="location-arrow" /> Change location
        </Dropdown.Item>
        <Dropdown.Item divider />
        <Dropdown.Item>
          <Icon icon="sign-out" /> Déconnexion
        </Dropdown.Item>
      </Dropdown>
    );
  };

  return (
    <s.Container>
      <s.Title>ShopList</s.Title>
      <s.Bloc>{renderBloc()}</s.Bloc>
    </s.Container>
  );
};

export { AppBar };
