import {
  Col,
  Row,
  Button,
  Checkbox,
  Space,
  DatePicker,
  Form,
  Input,
  Upload,
} from "antd";
import { Helmet } from "react-helmet-async";
import { UploadOutlined } from "@ant-design/icons";
import "./styles/style.scss";

export function RegisterPage() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
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
                          label="Date de naissance"
                          name="dob"
                          rules={[
                            {
                              required: true,
                              message: "Champs requis!",
                            },
                          ]}
                        >
                          <Space
                            direction="vertical"
                            style={{
                              width: "100%",
                            }}
                          >
                            <DatePicker
                              placeholder=" "
                              style={{
                                width: "100%",
                              }}
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

                        <Row>
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
                        </Row>
                      </Col>
                    </Row>

                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Valider
                      </Button>
                    </Form.Item>
                  </Form>
                </Col>
              </div>
            </div>
          </Col>
        </Row>

        {/* <div className="section">
          <Row>
            <Col lg={12}>
              <div className="blc-left">
                <h1>INFORMATION</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maxime mollitia, molestiae quas vel sint commodi repudiandae
                  consequuntur voluptatum laborum numquam blanditiis harum
                  quisquam eius sed odit fugiat iusto fuga praesentium optio,
                  eaque rerum! Provident similique accusantium nemo autem.
                  Veritatis obcaecati tenetur iure eius earum ut molestias
                  architecto voluptate aliquam nihil, eveniet aliquid
                </p>
              </div>
            </Col>
            <Col lg={12}>
              <div className="blc-right">
                <h1>INSCRIPTION</h1>
                <Form
                  name="basic"
                  layout="vertical"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Prénom"
                    name="username"
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
                    label="Prénom"
                    name="username"
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
                    label="Prénom"
                    name="username"
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
                    label="Prénom"
                    name="username"
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
                    label="Prénom"
                    name="username"
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
                    label="Prénom"
                    name="username"
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
                    label="Prénom"
                    name="username"
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
                    label="Prénom"
                    name="username"
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
                    label="Prénom"
                    name="username"
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
                    label="Prénom"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Champs requis!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Valider
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Col>
          </Row>
        </div> */}
      </div>
    </>
  );
}
