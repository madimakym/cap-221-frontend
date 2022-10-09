import React, { useState } from "react";
import {
  Col,
  Row,
  Button,
  Checkbox,
  Space,
  DatePicker,
  Form,
  Input,
  Select,
  Upload,
} from "antd";
import { Helmet } from "react-helmet-async";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import "moment/locale/fr";
import locale from "antd/es/date-picker/locale/fr_FR";
import "./styles/style.scss";
import { useRegisterMutation } from "./service/user-api";
const { Option } = Select;

export function RegisterPage() {
  const [date, setDate] = useState();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [register] = useRegisterMutation();

  const onFinish = (values) => {
    const data = { ...values, dob: date, password: "passer", role: "user" };
    setIsLoading(true);

    register(data)
      .unwrap()
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.data.message);
        console.log("error1: ===>", error);
      });
  };

  const handleChangeDate = (date, dateString) => {
    console.log("ddateStringata:", dateString);
    console.log("date:", date);

    setDate(dateString);
  };

  return (
    <>
      <Helmet>
        <title>Inscription Page</title>
        <meta name="description" content="A React application RegisterPage" />
      </Helmet>
      <div className="register-page">
        <Row>
          <Col lg={8}>
            <div className="blc-left">
              <img
                src="assets/img/cap221-logo.png"
                className="logo"
                alt="cap221"
              />
            </div>
          </Col>
          <Col lg={16}>
            <div className="blc-right">
              <div className="form-content">
                <Col lg={12}>
                  <h1>INSCRIPTION</h1>
                  <Form
                    name="basic"
                    layout="vertical"
                    onFinish={onFinish}
                    defaultValue={moment("2015-01-01", "YYYY-MM-DD")}
                    initialValues={{
                      firstname: "Makymadi",
                      lastname: "Madi",
                      email: "makymadi123@gmail.com",
                      phone: "3333333",
                      cni: "s23s",
                      secteur: "Informatique",
                    }}
                  >
                    <Row gutter={24}>
                      <Col lg={12}>
                        <Form.Item
                          label="Prénom"
                          name="firstname"
                          rules={[
                            {
                              required: true,
                              message: "Champs requis!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>

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
                          <Input />
                        </Form.Item>

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
                          <Input />
                        </Form.Item>

                        <Form.Item label="Date de naissance" name="dob">
                          <Space
                            direction="vertical"
                            style={{
                              width: "100%",
                            }}
                          >
                            <DatePicker
                              defaultValue={moment("2015-01-01", "YYYY-MM-DD")}
                              placeholder=" "
                              style={{
                                width: "100%",
                              }}
                              locale={locale}
                              onChange={handleChangeDate}
                            />
                          </Space>
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked">
                          <Checkbox>
                            J'accepte les conditions générales et la politique
                            de confidentialité
                          </Checkbox>
                        </Form.Item>
                      </Col>
                      <Col lg={12}>
                        <Form.Item
                          label="Email"
                          name="email"
                          rules={[
                            {
                              required: true,
                              message: "Champs requis!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>

                        <Form.Item
                          label="Secteur d'activités"
                          name="secteur"
                          rules={[
                            {
                              required: true,
                              message: "Champs requis!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>

                        <Form.Item
                          label="Numéro CNI"
                          name="cni"
                          rules={[
                            {
                              required: true,
                              message: "Champs requis!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>

                        <Form.Item
                          name="metier"
                          label="metier"
                          rules={[
                            {
                              required: true,
                              message: "Champs requis!",
                            },
                          ]}
                        >
                          <Select
                            placeholder="Select a option and change input text above"
                            // onChange={onGenderChange}
                            allowClear
                          >
                            <Option value="male">male</Option>
                            <Option value="female">female</Option>
                            <Option value="other">other</Option>
                          </Select>
                        </Form.Item>

                        {/* <Row>
                          <Space>
                            <Form.Item
                              label="fichier CNI"
                              name="cv"
                              rules={[
                                {
                                  required: true,
                                  message: "Champs requis!",
                                },
                              ]}
                            >
                              <Upload
                                style={{
                                  width: "100%",
                                }}
                              >
                                <Button
                                  icon={<UploadOutlined />}
                                  style={{
                                    width: "100%",
                                  }}
                                >
                                  Click to Upload
                                </Button>
                              </Upload>
                            </Form.Item>

                            <Form.Item
                              label="CV"
                              name="cv"
                              rules={[
                                {
                                  required: true,
                                  message: "Champs requis!",
                                },
                              ]}
                            >
                              <Upload
                                style={{
                                  width: "100%",
                                }}
                              >
                                <Button
                                  icon={<UploadOutlined />}
                                  style={{
                                    width: "100%",
                                  }}
                                >
                                  Click to Upload
                                </Button>
                              </Upload>
                            </Form.Item>
                          </Space>
                        </Row> */}
                      </Col>
                    </Row>

                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={isLoading}
                      >
                        Valider
                      </Button>
                    </Form.Item>
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
