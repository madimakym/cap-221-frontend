import React, { useState } from "react";
import { Col, Row, Button, Form, Input, Alert } from "antd";
import { Link } from "react-router-dom";
import { useUserResetPasswordMutation } from "../../user/service/user-api";

export function SendResetPassword() {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [resetSend, setResetSend] = useState(false);
  const [error, setError] = useState(false);
  const [userResetPassword] = useUserResetPasswordMutation();

  const onFinish = async (values) => {
    setIsLoading(true);
    userResetPassword(values)
      .unwrap()
      .then((res) => {
        if (res?.status === 400) {
          setIsLoading(false);
          setError(res.message);
        } else {
          form.resetFields();
          setIsLoading(false);
          setResetSend(true);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  };

  return (
    <div className="auth-page" data-aos="fade-in">
      <Row>
        <Col lg={5} offset={10}>
          <div className="section-reset-password">
            <div className="blc-content">
              <div style={{ textAlign: "center" }}>
                <img
                  src="assets/img/cap221-logo.png"
                  style={{ width: "50%" }}
                  alt="cap221"
                />
              </div>
              <h1>
                Réinitialisation de votre <br />
                mot de passe
              </h1>
              {!resetSend ? (
                <div>
                  <Form
                    name="basic"
                    form={form}
                    onFinish={onFinish}
                    autoComplete="off"
                    layout="vertical"
                  >
                    <label>Saisir l’email associé à votre compte</label>
                    <Form.Item
                      name="email"
                      rules={[
                        {
                          type: "email",
                          message: "Email invalide!",
                        },
                        {
                          required: true,
                          message: "Champs requis!",
                        },
                      ]}
                    >
                      <Input placeholder="nom@votreemail.com" />
                    </Form.Item>
                    <br />

                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="btn-lg"
                        loading={isLoading}
                      >
                        Envoyer
                      </Button>
                    </Form.Item>

                    <div className="btn-link">
                      <Link to={"/"}>Retour</Link>
                    </div>
                  </Form>
                </div>
              ) : (
                <div className="align-center">
                  <h4>Envoyé !</h4>
                  <p className="text-info">
                    Vous allez recevoir un lien pour réinitialiser votre mot de
                    passe (pensez à regarder dans vos spams si vous ne voyez
                    rien arriver).
                  </p>
                  <Link to={"/login"}>Retour à la page de connexion</Link>
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

export default SendResetPassword;
