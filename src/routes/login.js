import React, { useContext, useState } from "react";
import { Form, Input, Button, Notification } from "@arco-design/web-react";
import Section from "../components/auth/Section";
import Container from "../components/auth/Container";
import Header from "../components/auth/Header";
import { Main } from "../components/auth/Main";
import apiErrors from "../constants/apiErrors";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import routes from "../constants/routes";
import login from "../handlers/login";

const FormItem = Form.Item;

const Login = () => {
  const navigate = useNavigate();

  const { setLoginDetails } = useContext(AppContext);

  const [loginError, setLoginError] = useState("");
  const [loading, setLoding] = useState(false);

  const [loginForm] = Form.useForm();

  const handleLoginUser = (userDetails) => {
    setLoginError("");
    setLoding(true);

    const payload = {
      ...userDetails,
    };

    const onSuccess = (res) => {
      delete payload.password;
      setLoginDetails({
        ...payload,
        token: res.data.token,
      });
      navigate(routes.home);
    };

    const onError = (response) => {
      const errorStatus = response?.data?.status;

      if (errorStatus === apiErrors.validationError) {
        const errors = response?.data?.errors || [];

        errors.forEach((error) => {
          const field = error.path[1];
          if (field) {
            loginForm.setFields({
              [field]: {
                error: {
                  message: error.message,
                },
              },
            });
          } else {
            setLoginError(error.message);
          }
        });
      }

      setLoding(false);
    };

    login(userDetails, onSuccess, onError);
  };

  return (
    <Main>
      <Section>
        <Container>
          <Header>Login</Header>
          <Form
            autoComplete="off"
            layout={"vertical"}
            className={"mt-8"}
            size="large"
            labelCol={{
              span: 7,
            }}
            wrapperCol={{
              span: 17,
            }}
            labelAlign={"right"}
            form={loginForm}
            onSubmit={handleLoginUser}
          >
            <FormItem
              label="Email"
              field={"email"}
              rules={[
                { required: true, message: "Please enter your email" },
                {
                  type: "email",
                  message: "Please enter a valid email",
                },
              ]}
            >
              <Input placeholder="Enter your email" />
            </FormItem>
            <FormItem
              label="Password"
              field="password"
              rules={[
                { required: true, message: "Please enter the password" },
                {
                  minLength: 6,
                  message: "Please enter a valid password",
                },
              ]}
            >
              <Input.Password placeholder="Enter your password" />
            </FormItem>
            {loginError && (
              <FormItem>
                <div className="text-center font-normal leading-tight text-red-600">
                  {loginError}
                </div>
              </FormItem>
            )}
            <FormItem className={"!mt-4"}>
              <Button type="primary" htmlType="submit" long loading={loading}>
                Login
              </Button>
            </FormItem>
          </Form>
        </Container>
      </Section>
    </Main>
  );
};

export default Login;
