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
import { Link, useLocation } from "react-router-dom";
import { API_ROOT } from "../../../utils/global-var";
import { useFetchByGroupeMutation } from "../../metier/service/metier-api";
import "../styles/style.scss";
import PaiementDialog from "./paiement-dialog";

const { Option } = Select;

const secteur_metiers = [
  "administratif-secretariat",
  "aeronautique",
  "agriculture-agroalimentaire",
  "art et artisanat",
  "audiovisuel",
  "automobile-moto",
  "banque-finance-assurances",
  "chimie-biologie",
  "commerce-vente",
  "communication",
  "comptabilite-gestion",
  "creation",
  "culture",
  "distributeur",
  "enseignement-orientation",
  "esthetique-beaute",
  "hotellerie-restauration",
  "humanitaire",
  "immobilier",
  "industrie",
  "informatique-internet-multimedia",
  "journalisme",
  "justice-droit",
  "livre et edition",
  "mode",
  "musique",
  "nature, environnement et developpement durable",
  "psychologue",
  "publicite-marketing",
  "ressources humaines",
  "sante et paramedical",
  "secteur animalier",
  "social",
  "sport",
  "tourisme",
  "transport et logistique",
  "urbanisme-architecture-btp",
  "vigne-vin",
];

export function Register1Page() {
  const { state } = useLocation();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [showPaiementModal, setShowPaiementModal] = useState(false);
  const [error, setError] = useState(false);
  const [fetchByGroupe] = useFetchByGroupeMutation();
  const [userInfo, setUserInfo] = useState();
  const [metiers, setMetiers] = useState([]);

  const onFinish = async (values) => {
    const data = {
      ...state,
      role: "user",
      metier: values.metier,
      numero_cni: values.numero_cni,
      region: values.region,
      secteur: values.secteur,
      cv: values.cv.file.name,
      cni: values.cni.file.name,
    };
    setUserInfo(data);
    setShowPaiementModal(true);
  };

  const handleMetier = (value) => {
    fetchByGroupe({ groupe: value })
      .unwrap()
      .then((res) => setMetiers(res))
      .catch((error) => {
        setIsLoading(false);
        setError(error.data.message);
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
                src="assets/img/cap221-logo.png"
                className="logo"
                alt="cap221"
              />
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
            <br /> <br />
            <br /> <br />
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
                    <div className="btn-register_">
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="btn-lg"
                        loading={isLoading}
                      >
                        Valider
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
                <div>
                  <Link to={"/"} className="link-prev">
                    {" "}
                    Page précedente
                  </Link>
                </div>
                {error && <Alert message={error} type="error" closable />}
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <PaiementDialog
        status={showPaiementModal}
        user={userInfo}
        handleCancel={() => setShowPaiementModal(false)}
      />
    </div>
  );
}

export default Register1Page;
