import React from "react";
import styled from "styled-components";
import { RegisterForm } from "./registerForm";
import { AuthDTO } from "common";

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
  const onSubmit = (data: AuthDTO.SignUp) => {
    console.log('data :', data);
  };

  return (
    <s.Container>
      <RegisterForm onSubmit={onSubmit} />
    </s.Container>
  );
};

export { RegisterPage };
