import React, { useState } from "react";
import { Col, Row, Button, Form, Input } from "antd";
import { Helmet } from "react-helmet-async";
import SuccessDialog from "../../../components/success";
import "moment/locale/fr";
import { useNavigate } from "react-router-dom";
import "./../styles/style.scss";
import { useRegisterMutation } from "../service/user-api";

export function GetpaidPage() {
  const [form] = Form.useForm();
  const [register] = useRegisterMutation();
  const userData = localStorage.getItem("userToAdd");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [isOtpForm, setIsOtpForm] = useState(false);
  const [wizallNumber, setWizallNumber] = useState("");

  const onFinish = () => {
    setIsLoading(true);
    console.log(userData);
    register(JSON.parse(userData))
      .unwrap()
      .then(() => {
        setIsLoading(false);
        navigate("/souscription-effectuee");
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("error1: ===>", error);
      });
  };

  const saveNumber = () => {
    setIsOtpForm(true);
  };

  function handleInputChange(event) {
    setWizallNumber(event.target.value);
  }

  return (
    <>
      <Helmet>
        <title>OTP Page</title>
        <meta name="description" content="CAP221" />
      </Helmet>
      <div className="register-page">
        <SuccessDialog
          message="Votre demande d'inscription a bien été enregistrée"
          //status={isSuccess}
          // handleCancel={() => setIsSuccess(false)}
        />
        <Row>
          <Col lg={8}>
            <div className="blc-left">
              <div>
                <img
                  src="assets/img/cap221-logo.png"
                  className="logo"
                  alt="cap221"
                />
                <p>
                  Vous êtes 3.765.923 de jeunes garçons et filles hors main
                  d’œuvre potentielle et inactifs. Aidez nous à vous recenser et
                  à vous orienter. <br />
                  <br />
                  <span style={{ color: "green" }}>Jàng Ligeey Tekki</span> est
                  une plateforme d’orientation professionnelle pour découvrir et
                  te former aux métiers d’aujourd’hui et de demain.
                  <br /> <br />
                  <span style={{ color: "#f5d200" }}>
                    Jàng Ligeey Tekki
                  </span>{" "}
                  est un moteur de recherche pour booster ta carrière en
                  développant des compétences très recherchées sur le marché de
                  l’emploi.
                  <br /> <br />
                  <span style={{ color: "red" }}> Jàng Ligeey Tekki</span>{" "}
                  t’offre plus de 750 Métiers pour ton indépendance et ton
                  épanouissement en découvrant le métier de tes rêves.
                  <br /> <br />
                  <span>
                    <em>Notre objectif : Un métier pour tous !</em>
                  </span>
                </p>
              </div>
            </div>
          </Col>
          <Col lg={16}>
            <div className="blc-right ">
              <div className="form-content">
                <Col lg={12}>
                  <Form
                    name="getpaid"
                    form={form}
                    layout="vertical"
                    onFinish={null}
                  >
                    <div>
                      {!isOtpForm ? (
                        <Col lg={12}>
                          <h1>PAIEMENT</h1>
                          <p>Veuillez renseigner votre compte Wizall</p>
                          <Form.Item
                            label="Numéro de téléphone"
                            name="number2"
                            rules={[
                              {
                                required: false,
                                message: "Champs requis!",
                              },
                            ]}
                          >
                            <Input
                              value={wizallNumber}
                              onChange={handleInputChange}
                            />
                          </Form.Item>
                          <Form.Item>
                            <Button
                              type="primary"
                              htmlType="button"
                              onClick={() => saveNumber()}
                              block
                            >
                              Valider
                            </Button>
                          </Form.Item>
                        </Col>
                      ) : (
                        <Col lg={12}>
                          <h1>CONFIRMER LE PAIEMENT</h1>
                          <h4 style={{ color: "white" }}>
                            Vous allez recevoir un code OTP pour valider le
                            paiement.
                          </h4>
                          <Form.Item
                            label="Code OTP reçu"
                            name="codeOtp"
                            rules={[
                              {
                                required: false,
                                message: "Champs requis!",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>

                          <Form.Item>
                            <Button
                              type="primary"
                              htmlType="submit"
                              block
                              onClick={onFinish}
                              loading={isLoading}
                            >
                              Payer
                            </Button>
                          </Form.Item>
                        </Col>
                      )}
                    </div>
                  </Form>
                </Col>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
