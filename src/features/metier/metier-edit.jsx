import React, { useState, useEffect } from "react";
import { Card, Button, Form, Input, Select, Alert } from "antd";
import { useParams } from "react-router-dom";
import { useFetchOneMetierQuery } from "./service/metier-api";
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

export function MetierEditPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [form] = Form.useForm();
  const metier = useFetchOneMetierQuery(id);

  //   console.log("metier:", metier);

  useEffect(() => {
    if (metier.isSuccess) {
      form.setFieldsValue({
        groupe: metier.data.groupe,
        libelle: metier.data.libelle,
      });
    }
  }, [metier, form]);

  const onFinish = (values) => {
    setIsLoading(true);
    // const data = { ...values, desc };
    // createMetier(values)
    //   .unwrap()
    //   .then(() => navigate("/metiers"))
    //   .catch((error) => {
    //     setIsLoading(false);
    setError(error.data.message);
    //   });
  };

  return (
    <div className="home-page">
      <Card size="small" title="Editer un metier">
        {metier.data && (
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
                data={metier.data.description}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  console.log({ event, editor, data });
                }}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Enregistrer
              </Button>
            </Form.Item>
          </Form>
        )}
        {error && <Alert message={error} type="error" closable />}
      </Card>
    </div>
  );
}
export default MetierEditPage;
