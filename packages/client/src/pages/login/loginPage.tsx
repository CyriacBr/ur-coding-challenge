import React, { useState } from "react";
import styled from "styled-components";
import { AuthDTO, hasServerError } from "common";
import { LoginForm } from "./loginForm";
import { useFetcher, Fetcher } from "react-fetcher-hooks";
import { useStoreState, useStoreActions } from "../../store";
import { Message } from "rsuite";

const s = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  `
};

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  const fetcher = useFetcher();
  const axios = useStoreState(state => state.axios);
  const actions = useStoreActions(actions => actions.auth);
  const [error, setError] = useState<AuthDTO.Error>();

  const onSubmit = (data: AuthDTO.SignIn) => {
    setError(null);
    const request = () => axios.post<AuthDTO.Me>("auth/signIn", data);
    fetcher.fetch(request, res => {
      if (hasServerError<AuthDTO.Error>(res)) {
        setError(res);
      } else {
        actions.setToken(res.token);
        window.location.href = "/";
      }
    });
  };

  const errorMessage = () => {
    if (error.accountNotFound) return `Account doesn't exist`;
    if (error.incorrectCredentials) return `Incorrect email or password`;
    return "Unexpected error";
  };

  return (
    <s.Container>
      <Fetcher refs={fetcher}>
        {error && (
          <>
            <Message type="error" description={errorMessage()} />
            <br />
          </>
        )}
        <LoginForm onSubmit={onSubmit} />
      </Fetcher>
    </s.Container>
  );
};

export { LoginPage };
