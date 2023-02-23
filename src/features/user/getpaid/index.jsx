import React, { useEffect, useState } from "react";
import { Col, Row, Button, Form, Input, Alert } from "antd";
import { Helmet } from "react-helmet-async";
import "./../styles/style.scss";
import SuccessDialog from "../../../components/success";
import "moment/locale/fr";
import { useNavigate } from "react-router-dom";

export function GetpaidPage() {
  const [error, setError] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isOtpForm, setIsOtpForm] = useState(false);
  const [otpbloc, setOtpbloc] = useState({
    status: "invisible",
  });
  useEffect(() => {
    console.log(otpbloc);
  }, [otpbloc]);

  const onFinish = (values) => {
    /*const data = {
          ...values,
          // dob: date,
          password: "passer",
          role: "user",
          cv: values.cv.file.name,
          cni: values.cni.file.name,
        };*/
    // console.log(values);
  };

  console.log(otpbloc.status);
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
                    onFinish={onFinish}
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
                            <Input />
                          </Form.Item>
                          <Form.Item>
                            <Button
                              type="primary"
                              htmlType="button"
                              onClick={() => setIsOtpForm(true)}
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
                              onClick={() =>
                                navigate("/souscription-effectuee")
                              }
                            >
                              Payer
                            </Button>
                          </Form.Item>
                        </Col>
                      )}
                    </div>
                    {error && <Alert message={error} type="error" closable />}
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
