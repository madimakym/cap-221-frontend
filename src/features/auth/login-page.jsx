import React, { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  useAuthFetchTokenMutation,
  useAuthloginMutation,
} from "./service/auth-api";
import { setToken, setUser } from "./service/auth-slice";
import { saveTokenState } from "../../utils/local-storage";
import "./styles/style.scss";

export function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(false);
  const [authlogin] = useAuthloginMutation();
  const [authFetchToken] = useAuthFetchTokenMutation();

  const onFinish = (values) => {
    setIsLoading(true);
    const data = { ...values, role: "admin" };
    authlogin(data)
      .unwrap()
      .then((res) => {
        console.log("res:", res);
        saveTokenState(res.access_token);
        dispatch(setToken(res.access_token));
        authFetchToken()
          .unwrap()
          .then((res) => {
            setIsLoading(false);
            dispatch(setUser(res));
            navigate("/dashboard");
          })
          .catch((error) => {
            setError(error.data.message);
            setIsLoading(false);
            setIsError(true);
          });
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        setError(error.data.message);
      });
  };

  return (
    <div className="auth-page">
      <div className="auth-content">
        <h2>Authentification</h2>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{ email: "makymadi@gmail.com", password: "passer" }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Identifiant"
            name="email"
            rules={[{ required: true, message: "Champs requis" }]}
          >
            <Input className="form-control" />
          </Form.Item>

          <Form.Item
            label="Mot de passe"
            name="password"
            rules={[{ required: true, message: "Champs requis" }]}
          >
            <Input.Password className="form-control" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="btn btn-lg btn-primary"
              loading={isLoading}
            >
              Connexion
            </Button>
          </Form.Item>
          {isError && error && <Alert message={error} type="error" showIcon />}
        </Form>
      </div>
    </div>
  );
}
export default LoginPage;
