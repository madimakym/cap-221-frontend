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
    authlogin(values)
      .unwrap()
      .then((res) => {
        saveTokenState(res.access_token);
        dispatch(setToken(res.access_token));
        authFetchToken()
          .unwrap()
          .then((res) => {
            console.log()
            if (res.role === "admin") {
              setIsLoading(false);
              dispatch(setUser(res));
              navigate("/dashboard");
            } else if (res.role === "user") {
              setIsLoading(false);
              dispatch(setUser(res));
              navigate("/articles-vue-client/TOUS");
            }else{
              setError("Cet utilisateur n'existe pas!");
              setIsLoading(false);
              setIsError(true);
            }
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
        <div style={{ textAlign: "center"}}>
          <img
              src="assets/img/cap221-logo.png"
              style={{width: "50%"}}
              alt="cap221"
          />
        </div>
        <h2>Connectez-vous sur CAP 221</h2>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{ email: "", password: "" }}
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
