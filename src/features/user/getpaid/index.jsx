import React, {useState} from "react";
import { Col, Row, Button, Form, Input, message } from "antd";
import { Helmet } from "react-helmet-async";
import SuccessDialog from "../../../components/success";
import "moment/locale/fr";
import { useNavigate } from "react-router-dom";
import "./../styles/style.scss";
import {useRegisterMutation} from "../service/user-api";
import {useGetTokenMutation, useSendOTPMutation, useConfirmPayMutation} from "../service/wizall-cash-out";

export function GetpaidPage() {
  const [form] = Form.useForm();
 const [register] = useRegisterMutation();
 const [getToken] = useGetTokenMutation();
 const [sendOTP] = useSendOTPMutation();
 const [confirmPay] = useConfirmPayMutation();
  const userData = localStorage.getItem("userToAdd");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [isOtpForm, setIsOtpForm] = useState(false);
  const [myToken, setMyToken] = useState("");
  const [requestOtpRepsonse, setRequestOtpRepsonse] = useState({});
  const [wizallNumber, setWizallNumber] = useState("");
  const [wizallOTP, setWizallOTP] = useState("");

    if(!userData){
        navigate("/");
    }

  const onFinish = () => {
    setIsLoading(true);
    //console.log(wizallOTP);
    var data = {
        body : {
            "merchant_pin": "7314",
            "merchant_msisdn": "777314929",
            "transaction_id": requestOtpRepsonse.TransactionID,
            "otp": wizallOTP,
            "country": "sn"
        },
        header: "Bearer "+myToken
    };
    confirmPay(data).unwrap().then((res) =>{
        message.success("Paiement effectué!");
        console.log(res);
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
    }).catch((error) => {
        console.log(error);
        message.error("Code OTP incorrect ou expiré,  veuillez relancer la demande !");
    });
  };

  const saveNumber = () => {
      if(wizallNumber.length !== 9){
          message.error("Numéro de téléphone incorrect, veuillez rééssayer.");
      }else {
          setIsOtpForm(true);
          var data = {
              "username": "digitalubuntu",
              "grant_type": "password",
              "client_type": "public",
              "client_id": "AKOLWm5vf8GIX5o5KNstduNUlBtDLKR2cMjO6uex",
              "client_secret": "qN5xpN5EvIynwXIKoarW5yxysuFL9Si5qyQZAPuSt3KplrmUGdGiUBdRmOttQ0w5oUKXrMxK2RfRZ4hx15S856G3AEVoAM5Rq172yGeUt0nP6hZk2K0HOcpOrIswSiKv",
              "password": "256378dgubuntu798869",
              "country": "sn"
          };
          getToken(data).unwrap().then( (res) => {
              setMyToken(res.access_token);
              var otpRequest = {
                  body: {
                      "msisdn": wizallNumber,
                      "merchant_msisdn": "777314929",
                      "merchant_pin": "7314",
                      "amount": "50",
                      "country": "sn"
                  },
                  header: "Bearer " + res.access_token
              }
              //console.log(otpRequest);
              sendOTP(otpRequest).unwrap().then((res) => {
                  console.log(res.code);
                  if(res.code){
                      setIsOtpForm(false);
                      message.error(res.error);
                  }
                  setRequestOtpRepsonse(res);
              }).catch((error) => {
                  setIsOtpForm(false);
                  //console.log(error);
                  message.error("erreur : "+error);
              });
          }).catch((error) => {
              console.log(error);
              message.error("Erreur losr de l'initialisation de la transaction.");
          });
      }
  };

  const getOtpRequest = () =>{
      var otpRequest = {
          body: {
              "msisdn": wizallNumber,
              "merchant_msisdn": "777314929",
              "merchant_pin": "7314",
              "amount": "50",
              "country": "sn"
          },
          header: "Bearer " + myToken
      }
      //console.log(otpRequest);
      sendOTP(otpRequest).unwrap().then((res) => {
          //console.log(res.code);
          if(res.code){
              setIsOtpForm(false);
              message.error(res.error);
          }
          setRequestOtpRepsonse(res);
      }).catch((error) => {
          setIsOtpForm(false);
          //console.log(error);
          message.error("erreur : "+error);
      });
  };

  function handleInputChange(event) {
      if(!userData){
          navigate("/");
      }
    setWizallNumber(event.target.value);
  }

  function handleInputChangeOTP(event) {
    setWizallOTP(event.target.value);
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
                            <Input value={wizallOTP} onChange={handleInputChangeOTP} />
                          </Form.Item>
                            <Form.Item>
                                <Button type="link" htmlType="button" onClick={getOtpRequest} style={{ color: "yellow"}}>
                                    renvoyer le code
                                </Button>
                            </Form.Item>

                          <Form.Item>
                            <Button
                              type="primary"
                              htmlType="submit"
                              block
                              loading={isLoading}
                              onClick={
                                  onFinish
                              }

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
