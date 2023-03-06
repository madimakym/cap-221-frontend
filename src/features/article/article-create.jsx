import React, {useEffect, useState} from "react";
import {Card, Button, Form, Input, Select, Alert, Row, Col, Upload, Modal} from "antd";
import { useCreateArticleMutation, useUpdateArticleMutation } from "./service/article-api";
import { PlusOutlined } from '@ant-design/icons';
import {useLocation, useNavigate} from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {post} from "axios";
import {API_ROOT} from "../../utils/global-var";

const { Option } = Select;
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const secteur_articles = [
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

export function ArticleCreatePage() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [description, setDescription] = useState("");
    const [createArticle] = useCreateArticleMutation();
    const [updateArticle] = useUpdateArticleMutation();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [isEditImage, setIsEditImage] = useState(null);
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    const [form] = Form.useForm();
    let articleToEdit = useLocation();
    console.log(articleToEdit.state);

    useEffect(() => {
        if(articleToEdit.state){
            if(articleToEdit.state.article.image !== null){
                setIsEditImage(`${API_ROOT}/${ articleToEdit.state.article.image}`);
            }
        }
    }, []);

    const onFinish = (values) => {
        console.log("values:", values);
        if(articleToEdit.state){
           const  data =  { title : values.title , descripition:values.descripition, category: values.category ,image: values.imageArticle.file.response.filename ?? articleToEdit.state.article.image , id: articleToEdit.state.article.id }

            updateArticle(data)
                .unwrap()
                .then( (res) => {
                    navigate("/articles")
                })
                .catch((error) => {
                    setIsLoading(false);
                    setError(error.data.message);
                });
        }else{
           const data = { ...values, description, writer: 5, image: values.imageArticle.file.response.filename };
            createArticle(data)
                .unwrap()
                .then( (res) => {
                    navigate("/articles")
                })
                .catch((error) => {
                    setIsLoading(false);
                    setError(error.data.message);
                });
            createArticle(data)
                .unwrap()
                .then( (res) => {
                    navigate("/articles")
                })
                .catch((error) => {
                    setIsLoading(false);
                    setError(error.data.message);
                });
        }
    };

    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleChange = ({ fileList: newFileList }) => {
        setIsEditImage(null);
        setFileList(newFileList);
    };

    const uploadButton = (
        <div className="addArticleImage">
            <PlusOutlined />
            <div
                className="image"
            >
                Ajouter une image
            </div>
        </div>
    );


    return (
        <div className="home-page">
            <Card size="small" title="Ajouter un article">
                <Form
                    form={form}
                    name="horizontal_login"
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Row>
                        <Col lg={17}>
                            <Form.Item
                                label="Titre de l'article"
                                name="title"
                                initialValue={articleToEdit.state ? articleToEdit.state.article.title  : ''}
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
                                    data={articleToEdit.state ? articleToEdit.state.article.description  : ''}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setDescription(data);
                                        console.log({ event, editor, data });
                                    }}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={isLoading}>
                                    Enregistrer et publier
                                </Button>

                                {/*<Button type="link" htmlType="submit" loading={isLoading}>
                                    Enregistrer sans publier
                                </Button>*/}
                            </Form.Item>
                        </Col>
                        <Col lg={1}> </Col>
                        <Col lg={6}>
                            <Form.Item
                                label="Image de l'article"
                                name="imageArticle"
                                rules={[
                                    {
                                        required: true,
                                        message: "Champs requis!",
                                    },
                                ]}
                            >
                            <Upload
                                listType="picture-card"
                                fileList={fileList}
                                name="file"
                                onPreview={handlePreview}
                                onChange={handleChange}
                                action={`${API_ROOT}/api/v1/upload`}
                                className="imageArticleContent"
                                accept="image/*"
                                multiple={false}
                            >
                                { isEditImage ?
                                    <img src={isEditImage} alt={articleToEdit.state.article.title} /> :
                                    fileList.length >= 1 ? null : uploadButton
                                }
                            </Upload>
                            </Form.Item>

                            <Form.Item
                                label="Catégorie de l'article"
                                name="category"
                                initialValue={articleToEdit.state ? articleToEdit.state.article.category  : ''}
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

                            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                                <img
                                    alt="example"
                                    style={{
                                        width: '100%',
                                    }}
                                    src={previewImage}
                                />
                            </Modal>
                        </Col>
                    </Row>

                </Form>
                {error && <Alert message={error} type="error" closable />}
            </Card>
        </div>
    );
}
export default ArticleCreatePage;
