import React from "react";
import { Card } from "../../shared/components/card";
import {
  Form,
  FormGroup,
  ControlLabel,
  HelpBlock,
  ButtonToolbar,
  Button
} from "rsuite";
import useForm from "react-hook-form";
import { AuthDTO } from "common";

interface LoginFormProps {
  onSubmit: (data: AuthDTO.SignIn) => void;
}

interface Form {
  email: string;
  password: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, errors, setValue: setFormValue } = useForm<
    Form
  >();

  return (
    <Card title="Sign In" style={{ width: 300 }}>
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
            <Button appearance="primary" onClick={handleSubmit(onSubmit)}>
              Submit
            </Button>
          </ButtonToolbar>
        </FormGroup>
      </Form>
    </Card>
  );
};

export { LoginForm };
