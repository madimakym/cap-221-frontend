import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Form,
  Input,
  Select,
  Alert,
  Row,
  Col,
  Upload,
  Modal,
} from "antd";
import { useCreateArticleMutation } from "./service/article-api";
import { PlusOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { API_ROOT } from "../../utils/global-var";

const { Option } = Select;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const secteur_articles = [
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

export function ArticleCreatePage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [description, setDescription] = useState("");
  const [createArticle] = useCreateArticleMutation();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [isEditImage, setIsEditImage] = useState(null);
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  let articleToEdit = useLocation();

  useEffect(() => {
    if (articleToEdit.state) {
      if (articleToEdit.state.article.image !== null) {
        setIsEditImage(`${API_ROOT}/${articleToEdit.state.article.image}`);
      }
    }
  }, [articleToEdit]);

  const onFinish = (values) => {
    const data = {
      ...values,
      description,
      writer: 5,
      image: values.imageArticle.file.response.filename,
    };
    createArticle(data)
      .unwrap()
      .then((res) => {
        navigate("/articles");
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.data.message);
      });
  };

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => {
    setIsEditImage(null);
    setFileList(newFileList);
  };

  return (
    <div className="home-page">
      <Card size="small" title="Ajouter un article">
        <Form
          form={form}
          name="horizontal_login"
          onFinish={onFinish}
          layout="vertical"
        >
          <Row gutter={24}>
            <Col lg={17}>
              <Form.Item
                label="Titre de l'article"
                name="title"
                initialValue={
                  articleToEdit.state ? articleToEdit.state.article.title : ""
                }
                rules={[
                  {
                    required: true,
                    message: "Champs requis!",
                  },
                ]}
              >
                <Input type="text" placeholder="" />
              </Form.Item>

              <Form.Item
                label="Resumé"
                name="resume"
                rules={[
                  {
                    required: true,
                    message: "Champs requis!",
                  },
                ]}
              >
                <Input type="text" placeholder="" />
              </Form.Item>
              <Form.Item label="Contenu de l'article">
                <CKEditor
                  editor={ClassicEditor}
                  data={
                    articleToEdit.state
                      ? articleToEdit.state.article.description
                      : ""
                  }
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setDescription(data);
                    console.log({ event, editor, data });
                  }}
                />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item label="Image de l'article" name="imageArticle">
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  name="file"
                  onPreview={handlePreview}
                  onChange={handleChange}
                  action={`${API_ROOT}/api/v1/upload`}
                  //
                  accept="image/*"
                  multiple={false}
                >
                  {isEditImage ? (
                    <img
                      src={isEditImage}
                      alt={articleToEdit.state.article.title}
                    />
                  ) : fileList.length >= 1 ? null : (
                    <div className="addArticleImage imageArticleContent">
                      <PlusOutlined className="" />
                      <div className="image">Ajouter une image</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>

              <Form.Item
                label="Catégorie de l'article"
                name="category"
                initialValue={
                  articleToEdit.state
                    ? articleToEdit.state.article.category
                    : ""
                }
                rules={[
                  {
                    required: true,
                    message: "Champs requis!",
                  },
                ]}
              >
                <Select>
                  {secteur_articles.map((item, index) => (
                    <Option value={item} key={index}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <img
                  alt="example"
                  style={{
                    width: "100%",
                  }}
                  src={previewImage}
                />
              </Modal>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Enregistrer et publier
            </Button>
          </Form.Item>
        </Form>
        {error && <Alert message={error} type="error" closable />}
      </Card>
    </div>
  );
}
export default ArticleCreatePage;
