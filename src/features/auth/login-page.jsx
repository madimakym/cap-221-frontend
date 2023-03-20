import React, { useState } from "react";
import { Col, Row, Button, Form, Input, Alert } from "antd";
import { Link, useNavigate } from "react-router-dom";
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
  const [form] = Form.useForm();

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
            if (res.role === "admin") {
              setIsLoading(false);
              dispatch(setUser(res));
              navigate("/dashboard");
            } else if (res.role === "user") {
              setIsLoading(false);
              dispatch(setUser(res));
              navigate("/articles-vue-client/TOUS");
            } else {
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
    <div className="auth-page" data-aos="fade-in">
      <div className="section-login">
        <Row>
          <Col lg={8} offset={8}>
            <div className="blc-content">
              <div className="text-align-center">
                <img
                  src="assets/img/cap221-logo.png"
                  style={{ width: "50%" }}
                  alt="cap221"
                />
              </div>
              <h1>Connexion à votre compte</h1>
              <div>
                <Form
                  name="basic"
                  form={form}
                  onFinish={onFinish}
                  autoComplete="off"
                  layout="vertical"
                >
                  <label>Saisissez votre e-mail</label>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Champs requis!",
                      },
                    ]}
                  >
                    <Input placeholder="nom@votreemail.com" />
                  </Form.Item>
                  <label>Tapez votre mot de passe</label>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Champs requis!",
                      },
                    ]}
                  >
                    <Input.Password placeholder="Définir un mot de passe" />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="btn-lg"
                      loading={isLoading}
                      style={{ fontWeight: "600" }}
                    >
                      Se connecter
                    </Button>
                  </Form.Item>
                </Form>
                <p className="text-align-center">
                  Vous n’avez pas encore de compte ?
                  <Link to={"/"}> S’inscrire</Link>
                </p>
              </div>
              {isError && <Alert message={error} type="error" closable />}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
export default LoginPage;
