import React, { useState } from "react";
import {
  Col,
  Row,
  Button,
  Form,
  Input,
  Alert,
  Select,
  Upload,
  Space,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuthCheckUserMutation } from "../service/auth-api";
import { API_ROOT } from "../../../utils/global-var";
import { useFetchByGroupeMutation } from "../../metier/service/metier-api";
import "../styles/style.scss";

const { Option } = Select;

const secteur_metiers = [
  "ADMINISTRATIF-SECRETARIAT",
  "AERONAUTIQUE",
  "AGRICULTURE-AGROALIMENTAIRE",
  "ART ET ARTISANAT",
];

export function Register1Page() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [authCheckUser] = useAuthCheckUserMutation();
  const [fetchByGroupe] = useFetchByGroupeMutation();
  const [metiers, setMetiers] = useState([]);

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

  return (
    <div className="auth-page" data-aos="fade-in">
      <Row>
        <Col lg={12} xs={24}>
          <div className="blc-left">
            <div>
              <img
                src=".assets/img/cap221-logo.png"
                className="logo"
                alt="cap221"
              />
              <p>
                <span style={{ color: "green" }}>Jàng Ligeey Tekki</span> est
                une plateforme d’orientation professionnelle pour découvrir et
                te former aux métiers d’aujourd’hui et de demain.
                <br /> <br />
                <span style={{ color: "#f5d200" }}>Jàng Ligeey Tekki</span> est
                un moteur de recherche pour booster ta carrière en développant
                des compétences très recherchées sur le marché de l’emploi.
                <br /> <br />
                <span style={{ color: "red" }}> Jàng Ligeey Tekki</span> t’offre
                plus de 750 Métiers pour ton indépendance et ton épanouissement
                en découvrant le métier de tes rêves.
                <br /> <br />
                <span>
                  <em>Notre objectif : Un métier pour tous !</em>
                </span>
              </p>
            </div>
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
                        label="Region"
                        name="region"
                        rules={[
                          {
                            required: true,
                            message: "Champs requis!",
                          },
                        ]}
                      >
                        <Select>
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
                    </Col>
                    <Col lg={12} xs={12}>
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
                    </Col>
                  </Row>

                  <Row gutter={24}>
                    <Col lg={12} xs={12}>
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
                    </Col>

                    <Col lg={12} xs={12}>
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
                    </Col>
                  </Row>
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

                  <Form.Item>
                    <div className="btn-register">
                      <Space>
                        <Button
                          type="primary"
                          htmlType="submit"
                          loading={isLoading}
                        >
                          Valider
                        </Button>
                      </Space>
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
