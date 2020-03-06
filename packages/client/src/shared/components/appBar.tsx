import React, { useState } from "react";
import styled from "styled-components";
import { Dropdown, Avatar, Icon, Button, Modal } from "rsuite";
import { useStoreState, useStoreActions } from "../../store";
import { Link } from "react-router-dom";
import { LocationInput, PlaceSuggestion } from "./locationInput";
import { UserAvatar } from "./userAvatar";

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

  return (
    <s.Container>
      <s.Title>ShopList</s.Title>
      <s.Bloc>
        {isLoggedIn ? (
          <UserAvatar />
        ) : (
          <Button appearance="primary">
            <Link to="/register">Register</Link>
          </Button>
        )}
      </s.Bloc>
    </s.Container>
  );
};

export { AppBar };
