import React, { useState } from "react";
import { Card, Button, Form, Input, Select, Alert } from "antd";
import { useCreateMetierMutation } from "./service/metier-api";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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

export function MetierCreatePage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [desc, setDesc] = useState("");
  const [createMetier] = useCreateMetierMutation();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const data = { ...values, desc };
    console.log("values:", data);
    createMetier(values)
      .unwrap()
      .then(() => navigate("/metiers"))
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
          onFinish={onFinish}
          layout="vertical"
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
            <Select>
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
          <Form.Item label="Description">
            <CKEditor
              editor={ClassicEditor}
              data=""
              onChange={(event, editor) => {
                const data = editor.getData();
                setDesc(data);
                console.log({ event, editor, data });
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Ajouter
            </Button>
          </Form.Item>
        </Form>
        {error && <Alert message={error} type="error" closable />}
      </Card>
    </div>
  );
}
export default MetierCreatePage;
