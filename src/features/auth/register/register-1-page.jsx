import React, { useState } from "react";
import { Col, Row, Button, Form, Input, Alert, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAuthCheckUserMutation } from "../service/auth-api";
import "../styles/style.scss";

const { Option } = Select;

export function Register1Page() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [authCheckUser] = useAuthCheckUserMutation();

  const onFinish = async (values) => {
    setIsLoading(true);
    authCheckUser({ email: values.email })
      .unwrap()
      .then(() => {
        setIsLoading(false);
        setError("Adresse email existante");
      })
      .catch((error) => {
        if (error.data.message === "Cet utilisateur n'existe pas!") {
          navigate("/register/2", {
            state: values,
          });
        } else {
          setIsLoading(false);
          setError(error.data.message);
        }
      });
  };

  return (
    <div className="auth-page" data-aos="fade-in">
      <Row>
        <Col lg={12} xs={24}>
          <div className="blc-left">
            <div>
              <img
                src="assets/img/cap221-logo.png"
                className="logo"
                alt="cap221"
              />
              <p>
                Vous êtes <strong>3.765.923</strong> de jeunes, garçons et
                filles, hors main-d’œuvre potentielle et inactifs.
              </p>
              <p>Aidez-nous à vous recenser et à vous orienter.</p>
              <p>
                <span style={{ color: "green" }}>Jàng Ligeey Tekki</span> est
                une plateforme d’orientation professionnelle pour découvrir et
                vous former aux métiers d’aujourd’hui et de demain.
                <br /> <br />
                <span style={{ color: "#f5d200" }}>Jàng Ligeey Tekki</span> est
                un moteur de recherche pour booster votre carrière en
                développant des compétences très recherchées sur le marché de
                l’emploi.
                <br /> <br />
                <span style={{ color: "red" }}> Jàng Ligeey Tekki</span> vous
                offre plus de 750 Métiers pour votre indépendance et
                votreépanouissement en découvrant le métier de vos rêves.
                <br /> <br />
                <span>
                  <em>Notre objectif : Un métier pour tous !</em>
                </span>
              </p>

              <div className="reseaux-sociaux">
                <a
                  href="https://instagram.com/cap221jangligeey?igshid=Mzc0YWU1OWY="
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="assets/img/icons-instagram.png" alt="cap221" />
                </a>
                <a
                  href="https://twitter.com/jangligeeytekki?s=08"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="assets/img/icons-twitter.png" alt="cap221" />
                </a>
                <a
                  href="https://www.youtube.com/@jangligeeytekki8067"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="assets/img/icons-youtube.png" alt="cap221" />
                </a>
                <a
                  href="https://www.snapchat.com/add/jangligeeytekki?share_id=AHQNV0IK1J0&locale=en-US"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="assets/img/icons-snapchat.png" alt="cap221" />
                </a>
              </div>
              <Link
                to={"/contact"}
                style={{
                  color: "black",
                  fontWeight: "600",
                  textDecoration: "revert",
                }}
              >
                {" "}
                Nous contacter
              </Link>
            </div>
            <br /> <br /><br /> <br />
          </div>
        </Col>
        <Col lg={12} xs={24}>
          <div className="blc-right">
            <div className="section-1">
              <div className="blc-content">
                <h1>Créez votre compte</h1>
                <p className="subtitle">
                  Vous êtes 3.765.923 de jeunes garçons et filles hors main
                  d’œuvre potentielle et inactifs. Aidez nous à vous recenser et
                  à vous orienter.
                </p>

                <Form
                  name="basic"
                  form={form}
                  onFinish={onFinish}
                  autoComplete="off"
                  layout="vertical"
                >
                  <Row gutter={24}>
                    <Col lg={12} xs={12}>
                      <Form.Item
                        label="Nom"
                        name="lastname"
                        rules={[
                          {
                            required: true,
                            message: "Champs requis!",
                          },
                        ]}
                      >
                        <Input placeholder="Nom de famille" />
                      </Form.Item>
                    </Col>
                    <Col lg={12} xs={12}>
                      <Form.Item
                        label="prénom"
                        name="firstname"
                        rules={[
                          {
                            required: true,
                            message: "Champs requis!",
                          },
                        ]}
                      >
                        <Input placeholder="Prénom" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={24}>
                    <Col lg={12} xs={12}>
                      <Form.Item
                        label="Téléphone"
                        name="phone"
                        rules={[
                          {
                            required: true,
                            message: "Champs requis!",
                          },
                        ]}
                      >
                        <Input placeholder="Nom de famille" />
                      </Form.Item>
                    </Col>
                    <Col lg={12} xs={12}>
                      <Form.Item
                        label="Age"
                        name="dob"
                        rules={[
                          {
                            required: true,
                            message: "Champs requis!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={24}>
                    <Col lg={12} xs={12}>
                      <Form.Item
                        label="Email"
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
                    </Col>
                    <Col lg={12} xs={12}>
                      <Form.Item
                        label="Genre"
                        name="genre"
                        rules={[
                          {
                            required: true,
                            message: "Champs requis!",
                          },
                        ]}
                      >
                        <Select placeholder="">
                          <Option value="homme">Homme</Option>
                          <Option value="femme">Femme</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={24}>
                    <Col lg={12} xs={12}>
                      {" "}
                      <Form.Item
                        label="Mot de passe"
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Champs requis!",
                          },
                          {
                            min: 6,
                            message: "min 6 caractères",
                          },
                          {
                            pattern: /[#?!@$%^&*-]/g,
                            message:
                              "Veuillez renseigner un caractere special!",
                          },
                        ]}
                      >
                        <Input.Password placeholder="Définir un mot de passe" />
                      </Form.Item>
                    </Col>
                    <Col lg={12} xs={12}>
                      <Form.Item
                        label="Confirmer le nouveau mot de passe"
                        name="passwordConfirm"
                        rules={[
                          { required: true, message: "Champs requis!" },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                getFieldValue("password") === value
                              ) {
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
                        <Input.Password placeholder="Définir un mot de passe" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item>
                    <div className="btn-register">
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="btn-lg"
                        loading={isLoading}
                      >
                        Continuer
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
                <p>
                  Vous avez déjà un compte ?{" "}
                  <Link to={"/login"}> Se connecter</Link>
                </p>

                {error && <Alert message={error} type="error" closable />}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Register1Page;
