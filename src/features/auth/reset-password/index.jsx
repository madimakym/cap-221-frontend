import React, { useState, useEffect } from "react";
import { Col, Row, Button, Form, Input, Alert } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  useUserCheckTokenMutation,
  useUserChangePasswordMutation,
} from "../../user/service/user-api";
import "../styles/style.scss";

export function ResetPassword() {
  const navigate = useNavigate();
  let token = new URLSearchParams(window.location.search).get("token");
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [tokenExpired, setTokenExpired] = useState(false);
  const [userCheckToken] = useUserCheckTokenMutation();
  const [userChangePassword] = useUserChangePasswordMutation();
  const [userId, setUserId] = useState();

  const onFinish = async ({ password }) => {
    setIsLoading(true);
    userChangePassword({ id: userId, password })
      .unwrap()
      .then(() => navigate("/login"))
      .catch((error) => {
        setIsLoading(false);
        setError(error.data.message);
      });
  };

  useEffect(() => {
    userCheckToken({ token })
      .unwrap()
      .then((res) => {
        setUserId(res.message.id);
      })
      .catch(() => setTokenExpired(true));
  }, [userCheckToken, token]);

  return (
    <div className="auth-page" data-aos="fade-in">
      <Row>
        <Col lg={5} offset={10}>
          <div className="section-reset-password">
            <div className="blc-content">
              <img
                src="assets/img/cap221-logo.png"
                className="logo"
                alt="kliner"
              />
              <h1>
                Définir un nouveau
                <br /> mot de passe
              </h1>
              {tokenExpired && (
                <p style={{ textAlign: "center" }}>
                  Le lien de réinitialisation du mot de passe a expiré. Veuillez
                  demander une nouvelle{" "}
                  <Link to={"/send-reset-password"}>
                    réinitialisation du mot de passe.
                  </Link>
                </p>
              )}
              {!tokenExpired && (
                <div>
                  <Form
                    name="basic"
                    form={form}
                    onFinish={onFinish}
                    autoComplete="off"
                    layout="vertical"
                  >
                    <label>Saisissez votre nouveau mot de passe</label>
                    <Form.Item
                      label=""
                      name="password"
                      rules={[
                        { required: true, message: "Champs requis!" },
                        {
                          min: 8,
                          message: "min 8 caractères",
                        },
                      ]}
                      hasFeedback
                    >
                      <Input.Password />
                    </Form.Item>
                    <br />
                    <label>Confirmez le nouveau mot de passe</label>
                    <Form.Item
                      name="passwordConfirm"
                      onPaste={(e) => {
                        e.preventDefault();
                        return false;
                      }}
                      onCopy={(e) => {
                        e.preventDefault();
                        return false;
                      }}
                      rules={[
                        { required: true, message: "Champs requis!" },
                        {
                          min: 8,
                          message: "min 8 caractères",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error(
                                "Les mots de passe ne correspondent pas!"
                              )
                            );
                          },
                        }),
                      ]}
                      dependencies={["password"]}
                      hasFeedback
                    >
                      <Input.Password />
                    </Form.Item>
                    <br />
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="btn-lg"
                        loading={isLoading}
                      >
                        Enregistrer
                      </Button>
                    </Form.Item>
                    <p className="text-info">
                      Une fois le nouveau mot de passe enregistré, vous allez
                      être redirigé vers la page de connexion.
                    </p>
                  </Form>
                </div>
              )}
              <br />
              {error && <Alert message={error} type="error" closable />}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ResetPassword;
