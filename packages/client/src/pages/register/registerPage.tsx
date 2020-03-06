import React from "react";
import styled from "styled-components";
import { RegisterForm } from "./registerForm";
import { AuthDTO } from "common";
import { useFetcher, Fetcher } from "react-fetcher-hooks";
import { useStoreState, useStoreActions } from "../../store";

const s = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  `
};

interface RegisterPageProps {}

const RegisterPage: React.FC<RegisterPageProps> = () => {
  const fetcher = useFetcher();
  const axios = useStoreState(state => state.axios);
  const actions = useStoreActions(actions => actions.auth);

  const onSubmit = (data: AuthDTO.SignUp) => {
    const request = () => axios.post<AuthDTO.Me>('auth/signUp', data);
    fetcher.fetch(request, res => {
      actions.setToken(res.token);
      window.location.href = '/';
    });
  };

  return (
    <s.Container>
      <Fetcher refs={fetcher}>
        <RegisterForm onSubmit={onSubmit} />
      </Fetcher>
    </s.Container>
  );
};

export { RegisterPage };
