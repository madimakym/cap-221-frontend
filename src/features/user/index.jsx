import React, { useState } from "react";
import {
  Col,
  Row,
  Button,
  Space,
  Form,
  Input,
  Select,
  Upload,
  Alert,
} from "antd";
import { Helmet } from "react-helmet-async";
import { UploadOutlined } from "@ant-design/icons";
// import locale from "antd/es/date-picker/locale/fr_FR";
import "./styles/style.scss";
import { useRegisterMutation } from "./service/user-api";
import { useFetchByGroupeMutation } from "../metier/service/metier-api";
import { API_ROOT } from "../../utils/global-var";
import SuccessDialog from "../../components/success";
import "moment/locale/fr";

const { Option } = Select;

const secteur_metiers = [
  "ADMINISTRATIF-SECRETARIAT",
  "AERONAUTIQUE",
  "AGRICULTURE-AGROALIMENTAIRE",
  "ART ET ARTISANAT",
];

export function RegisterPage() {
  // const [date, setDate] = useState();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [metiers, setMetiers] = useState([]);
  const [error, setError] = useState(false);
  const [register] = useRegisterMutation();
  const [fetchByGroupe] = useFetchByGroupeMutation();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const data = {
      ...values,
      // dob: date,
      password: "passer",
      role: "user",
      cv: values.cv.file.name,
      cni: values.cni.file.name,
    };
    setIsLoading(true);
    register(data)
      .unwrap()
      .then(() => {
        setIsLoading(false);
        setIsSuccess(true);
        form.resetFields();
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.data.message);
        console.log("error1: ===>", error);
      });
  };

  // const handleChangeDate = (date, dateString) => {
  //   console.log("ddateStringata:", dateString);
  //   console.log("date:", date);
  //   setDate(dateString);
  // };

  const handleMetier = (value) => {
    fetchByGroupe({ groupe: value })
      .unwrap()
      .then((res) => {
        setMetiers(res);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.data.message);
        console.log("error1: ===>", error);
      });
  };

  const propsCNI = {
    name: "file",
    multiple: false,
    action: `${API_ROOT}/api/v1/upload`,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const propsCV = {
    name: "file",
    multiple: false,
    action: `${API_ROOT}/api/v1/upload`,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handlePay = () => {
    new PayTech({
      some_post_data_1: 2, //will be sent to paiement.php page
      some_post_data_3: 4,
    })
      .withOption({
        requestTokenUrl: "paiement.php",
        method: "POST",
        headers: {
          Accept: "text/html",
        },
        prensentationMode: PayTech.OPEN_IN_POPUP,
        willGetToken: function () {},
        didGetToken: function (token, redirectUrl) {},
        didReceiveError: function (error) {},
        didReceiveNonSuccessResponse: function (jsonResponse) {},
      })
      .send();

    //.send params are optional
  };

  return (
    <>
      <button class="buy" onclick={() => handlePay()} data-item-id="88">
        Acheter iphone (450000 XOF)
      </button>
      <Helmet>
        <title>Inscription Page</title>
        <meta name="description" content="CAP221" />
      </Helmet>
      <div className="register-page">
        <SuccessDialog
          message="Votre demande d'inscription a bien été enregistrée"
          status={isSuccess}
          handleCancel={() => setIsSuccess(false)}
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
            <div className="blc-right">
              <div className="form-content">
                <Col lg={12}>
                  <h1>INSCRIPTION</h1>
                  <Form
                    name="basic"
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    // defaultValue={moment("2015-01-01", "YYYY-MM-DD")}
                    // initialValues={{
                    //   firstname: "Makymadi",
                    //   lastname: "Madi",
                    //   email: "makymadi123@gmail.com",
                    //   phone: "3333333",
                    //   cni: "s23s",
                    //   secteur: "Informatique",
                    // }}
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
                        {/* 
                        <Form.Item label="Date de naissance" name="dob">
                          <Space
                            direction="vertical"
                            style={{
                              width: "100%",
                            }}
                          >
                            <DatePicker
                              // defaultValue={moment("2015-01-01", "YYYY-MM-DD")}
                              placeholder=" "
                              style={{
                                width: "100%",
                              }}
                              locale={locale}
                              onChange={handleChangeDate}
                            />
                          </Space>
                        </Form.Item> */}

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
                          label="Genre"
                          name="genre"
                          rules={[
                            {
                              required: true,
                              message: "Champs requis!",
                            },
                          ]}
                        >
                          <Select placeholder="" onChange={handleMetier}>
                            <Option value="homme">Homme</Option>
                            <Option value="femme">Femme</Option>
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col lg={12}>
                        <Form.Item
                          label="Region"
                          name="region"
                          rules={[
                            {
                              required: true,
                              message: "Champs requis!",
                            },
                          ]}
                        >
                          <Select placeholder="" onChange={handleMetier}>
                            <Option value="Dakar">Dakar</Option>
                            <Option value="Diourbel">Diourbel</Option>
                            <Option value="Fatick">Fatick</Option>
                            <Option value="Kaffrine">Kaffrine</Option>
                            <Option value="Kaolack">Kaolack</Option>
                            <Option value="Kédougou">Kédougou</Option>
                            <Option value="Kolda">Kolda</Option>
                            <Option value="Louga">Louga</Option>
                            <Option value="Matam">Matam</Option>
                            <Option value="Sédhiou">Sédhiou</Option>
                            <Option value="St Louis">St Louis</Option>
                            <Option value="Tambacounda">Tambacounda</Option>
                            <Option value="Thiès">Thiès</Option>
                            <Option value="Ziguinchor">Ziguinchor</Option>
                          </Select>
                        </Form.Item>

                        <Form.Item
                          label="Numéro CNI"
                          name="numero_cni"
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
                          <Select placeholder="" onChange={handleMetier}>
                            {secteur_metiers.map((item, index) => (
                              <Option value={item} key={index}>
                                {item}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>

                        <Form.Item
                          name="metier"
                          label="Metier"
                          rules={[
                            {
                              required: true,
                              message: "Champs requis!",
                            },
                          ]}
                        >
                          <Select placeholder="" onChange={handleMetier}>
                            {metiers.map((item, index) => (
                              <Option value={item.libelle} key={index}>
                                {item.libelle}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>

                        <Row>
                          <Space>
                            <Form.Item
                              label="fichier CNI"
                              name="cni"
                              rules={[
                                {
                                  required: true,
                                  message: "Champs requis!",
                                },
                              ]}
                            >
                              <Upload
                                {...propsCNI}
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
                                {...propsCV}
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
                        </Row>
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
