import React, { useContext, useState } from "react";
import { Form, Input, Button, Notification } from "@arco-design/web-react";
import Section from "../components/auth/Section";
import Container from "../components/auth/Container";
import Header from "../components/auth/Header";
import { Main } from "../components/auth/Main";
import createUser from "../handlers/createUser";
import apiErrors from "../constants/apiErrors";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import routes from "../constants/routes";

const FormItem = Form.Item;

const Register = () => {
  const navigate = useNavigate();

  const { setLoginDetails } = useContext(AppContext);

  const [userCreating, setUserCreating] = useState(false);

  const [registerForm] = Form.useForm();

  const handleRegisterUser = (userDetails) => {
    setUserCreating(true);

    const payload = {
      ...userDetails,
    };
    delete payload.confirm_password;

    const onSuccess = (res) => {
      Notification.success({
        closable: true,
        title: "Success",
        content: "Successfully created an account.",
      });
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
            registerForm.setFields({
              [field]: {
                error: {
                  message: error.message,
                },
              },
            });
          }
        });
      }

      setUserCreating(false);
    };

    createUser(userDetails, onSuccess, onError);
  };

  return (
    <Main>
      <Section>
        <Container>
          <Header>Register</Header>
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
            form={registerForm}
            onSubmit={handleRegisterUser}
          >
            <FormItem
              label="Name"
              field="name"
              required
              rules={[
                { required: true, message: "Please enter your name" },
                {
                  minLength: 3,
                  message: "Please enter atleast three characters",
                },
              ]}
            >
              <Input placeholder="Enter your name" />
            </FormItem>
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
                  message: "Please enter atleast six characters",
                },
              ]}
            >
              <Input.Password placeholder="Enter your password" />
            </FormItem>
            <FormItem
              field="confirm_password"
              label="Confirm Password"
              dependencies={["password"]}
              required
              rules={[
                {
                  validator: (v, cb) => {
                    if (!v) {
                      return cb("Confirma Password is required");
                    } else if (registerForm.getFieldValue("password") !== v) {
                      return cb("Confirm Password must be equal with password");
                    }
                    cb(null);
                  },
                },
              ]}
            >
              <Input.Password placeholder="please confirm your password" />
            </FormItem>
            <FormItem className={"!mt-4"}>
              <Button
                type="primary"
                htmlType="submit"
                long
                loading={userCreating}
              >
                Register
              </Button>
            </FormItem>
          </Form>
        </Container>
      </Section>
    </Main>
  );
};

export default Register;
