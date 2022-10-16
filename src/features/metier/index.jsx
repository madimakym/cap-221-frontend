import React, { useState } from "react";
import { Card, Table, Button, Form, Input, Select, Alert } from "antd";
import {
  useCreateMetierMutation,
  useFetchMetierQuery,
} from "./service/metier-api";
const { Option } = Select;

const secteur_metiers = [
  "ADMINISTRATIF-SECRETARIAT",
  "AERONAUTIQUE",
  "AGRICULTURE-AGROALIMENTAIRE",
  "ART ET ARTISANAT",
];

export function MetierPage() {
  const metiers = useFetchMetierQuery();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [createMetier] = useCreateMetierMutation();
  const [form] = Form.useForm();

  const columns = [
    {
      title: "Metier",
      dataIndex: "libelle",
      key: "libelle",
      render: (text) => <span>{text}</span>,
    },

    {
      title: "Groupe",
      dataIndex: "groupe",
      key: "groupe",
      render: (text) => <span>{text}</span>,
    },
  ];

  const onFinish = (values) => {
    createMetier(values)
      .unwrap()
      .then(() => {
        setIsLoading(false);
        form.resetFields();
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.data.message);
      });
  };

  return (
    <div className="home-page">
      <Card size="small" title="Ajouter un metier">
        <Form
          form={form}
          name="horizontal_login"
          layout="inline"
          onFinish={onFinish}
        >
          <Form.Item
            label="Secteur"
            name="groupe"
            rules={[
              {
                required: true,
                message: "Champs requis!",
              },
            ]}
          >
            <Select
              style={{
                width: 200,
              }}
            >
              {secteur_metiers.map((item, index) => (
                <Option value={item} key={index}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Metier"
            name="libelle"
            rules={[
              {
                required: true,
                message: "Champs requis!",
              },
            ]}
          >
            <Input type="text" placeholder="" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Ajouter
            </Button>
          </Form.Item>
        </Form>
        {error && <Alert message={error} type="error" closable />}
      </Card>
      <br />
      <Card size="small" title="Liste des metiers">
        {metiers && metiers.isSuccess && (
          <Table columns={columns} dataSource={metiers.data} />
        )}
      </Card>
    </div>
  );
}
export default MetierPage;
