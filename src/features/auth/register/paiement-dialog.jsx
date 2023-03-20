import React, { useState } from "react";
import { Modal, Col, Alert, Space, Button, Form, Input, Result } from "antd";
import {
  useConfirmPayMutation,
  useGetTokenMutation,
  useSendOTPMutation,
} from "../service/auth-paiement-api";
import { useAuthRegisterMutation } from "../service/auth-api";
import { Link } from "react-router-dom";

function PaiementDialog({ status, handleCancel, user }) {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [error, setError] = useState(false);
  const [token, setToken] = useState(false);
  const [isOtpRequest, setIsOtpRequest] = useState(false);
  const [transactionId, setTransactionId] = useState();
  const [isSuccess, setIsSuccess] = useState(false);
  const [getToken] = useGetTokenMutation();
  const [sendOTP] = useSendOTPMutation();
  const [confirmPay] = useConfirmPayMutation();
  const [authRegister] = useAuthRegisterMutation();
  const onCancel = () => handleCancel();

  const onFinish = (values) => {
    const data = {
      username: "digitalubuntu",
      grant_type: "password",
      client_type: "public",
      client_id: "AKOLWm5vf8GIX5o5KNstduNUlBtDLKR2cMjO6uex",
      client_secret:
        "qN5xpN5EvIynwXIKoarW5yxysuFL9Si5qyQZAPuSt3KplrmUGdGiUBdRmOttQ0w5oUKXrMxK2RfRZ4hx15S856G3AEVoAM5Rq172yGeUt0nP6hZk2K0HOcpOrIswSiKv",
      password: "256378dgubuntu798869",
      country: "sn",
    };
    setIsLoading(true);
    getToken(data)
      .unwrap()
      .then((res) => {
        setToken(res.access_token);
        handleOtpRequest(values.msisdn, res.access_token);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.data.message);
      });
  };

  const handleOtpRequest = (msisdn, token) => {
    const data = {
      msisdn: msisdn,
      merchant_msisdn: "777314929",
      merchant_pin: "7314",
      amount: "25",
      country: "sn",
      token: token,
    };
    sendOTP(data)
      .unwrap()
      .then((res) => {
        setIsLoading(false);
        setIsOtpRequest(true);
        setTransactionId(res.TransactionID);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.data.error);
      });
  };

  const handleConfirmCashout = (values) => {
    setIsLoading(true);
    const data = {
      merchant_pin: "7314",
      merchant_msisdn: "777314929",
      transaction_id: transactionId,
      otp: values.codeOtp,
      country: "sn",
      token: token,
    };
    confirmPay(data)
      .unwrap()
      .then(() => handleRegister())
      .catch((error) => {
        setIsLoading(false);
        handleRegister();
        setError(error.data.error);
      });
  };

  const handleRegister = () => {
    authRegister(user)
      .unwrap()
      .then(() => setIsSuccess(true))
      .catch((error) => {
        setIsLoading(false);
        setError(error.data.error);
      });
  };

  return (
    <>
      <Modal open={status} footer={null} closable={true} onCancel={onCancel}>
        {!isSuccess ? (
          <div>
            {!isOtpRequest ? (
              <div>
                <h2>PAIEMENT</h2>
                <h4>Veuillez renseigner votre compte Wizall</h4>
                <Form
                  name="basic"
                  form={form}
                  onFinish={onFinish}
                  autoComplete="off"
                  layout="vertical"
                >
                  <Col lg={24}>
                    <Form.Item
                      label="Numéro de téléphone"
                      name="msisdn"
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
                  <br />
                  <Space style={{ display: "flex", justifyContent: "end" }}>
                    <Button
                      type="default"
                      className="btn"
                      onClick={() => onCancel()}
                    >
                      Annuler
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="btn-lg"
                      loading={isLoading}
                    >
                      Valider
                    </Button>
                  </Space>
                  {error && <Alert message={error} type="error" closable />}
                </Form>
              </div>
            ) : (
              <div>
                <h2>CONFIRMER LE PAIEMENT</h2>
                <h4>
                  Vous allez recevoir un code OTP pour valider le paiement.
                </h4>
                <Form
                  name="basic"
                  form={form}
                  onFinish={handleConfirmCashout}
                  autoComplete="off"
                  layout="vertical"
                >
                  <Col lg={24}>
                    <Form.Item
                      label="Code OTP"
                      name="codeOtp"
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
                  <br />
                  <Space style={{ display: "flex", justifyContent: "end" }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="btn-lg"
                      loading={isLoading}
                    >
                      Valider
                    </Button>
                  </Space>
                  {error && <Alert message={error} type="error" closable />}
                </Form>
              </div>
            )}
          </div>
        ) : (
          <div>
            <Result
              status="success"
              title="Success!"
              subTitle="Votre demande d'inscription a bien été enregistrée"
              extra={[
                <Link to={"/login"}>
                  <Button type="primary" key="console">
                    Connexion
                  </Button>
                </Link>,
              ]}
            />
          </div>
        )}
      </Modal>
    </>
  );
}

export default PaiementDialog;
