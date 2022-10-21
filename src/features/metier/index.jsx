import React, { useState } from "react";
import {
  Card,
  Table,
  Button,
  Form,
  Input,
  Select,
  Alert,
  Popconfirm,
} from "antd";
import {
  useCreateMetierMutation,
  useDeleteMetierMutation,
  useFetchMetierQuery,
} from "./service/metier-api";
const { Option } = Select;

const secteur_metiers = [
  "ADMINISTRATIF-SECRETARIAT",
  "AERONAUTIQUE",
  "AGRICULTURE-AGROALIMENTAIRE",
  "ART ET ARTISANAT",
  "AUDIOVISUEL",
  "AUTOMOBILE-MOTO",
  "BANQUE-FINANCE-ASSURANCES",
  "CHIMIE-BIOLOGIE",
  "COMMERCE-VENTE",
  "COMMUNICATION",
  "COMPTABILITE-GESTION",
  "CREATION",
  "CULTURE",
  "DISTRIBUTEUR",
  "ENSEIGNEMENT-ORIENTATION",
  "ESTHETIQUE-BEAUTE",
  "HOTELLERIE-RESTAURATION",
  "HUMANITAIRE",
  "IMMOBILIER",
  "INDUSTRIE",
  "INFORMATIQUE-INTERNET-MULTIMEDIA",
  "JOURNALISME",
  "JUSTICE-DROIT",
  "LIVRE ET EDITION",
  "MODE",
  "MUSIQUE",
  "NATURE, ENVIRONNEMENT ET DEVELOPPEMENT DURABLE",
  "PSYCHOLOGUE",
  "PUBLICITE-MARKETING",
  "RESSOURCES HUMAINES",
  "SANTE ET PARAMEDICAL",
  "SECTEUR ANIMALIER",
  "SOCIAL",
  "SPORT",
  "TOURISME",
  "TRANSPORT ET LOGISTIQUE",
  "URBANISME-ARCHITECTURE-BTP",
  "VIGNE-VIN",
];

export function MetierPage() {
  const metiers = useFetchMetierQuery();
  const [isLoading, setIsLoading] = useState(false);
  const [deleteMetier] = useDeleteMetierMutation();
  const [error, setError] = useState(false);
  const [createMetier] = useCreateMetierMutation();
  const [form] = Form.useForm();

  const handleDelete = (id) => {
    deleteMetier(id)
      .unwrap()
      .then(() => {})
      .catch((error) => console.log("error ===>", error));
  };

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

    {
      title: "Action",
      key: "action",
      width: 300,
      render: (record) => (
        <Popconfirm
          title="Voulez-vous supprimer ?"
          onConfirm={() => handleDelete(record.id)}
        >
          <Button type="primary" size="small" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
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
