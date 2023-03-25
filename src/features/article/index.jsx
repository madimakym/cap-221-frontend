import React from "react";
import { Card, Table, Button, Popconfirm, Space } from "antd";
import {
  useDeleteArticleMutation,
  useFetchArticleQuery,
} from "./service/article-api";
import { NavLink, useNavigate } from "react-router-dom";
import { getUser } from "../../utils/global-var";

export function ArticlePage() {
  const articles = useFetchArticleQuery("TOUS");
  const [deleteArticle] = useDeleteArticleMutation();
  const navigate = useNavigate();
  const userData = getUser();
  if (userData.role === "user") {
    navigate("/articles-vue-client");
  }
  const handleDelete = (id) => {
    deleteArticle(id)
      .unwrap()
      .then(() => {})
      .catch((error) => console.log("error ===>", error));
  };

  const columns = [
    {
      title: "Titre",
      dataIndex: "title",
      key: "title",
      render: (text) => <span>{text}</span>,
    },

    {
      title: "Categorie",
      dataIndex: "category",
      key: "category",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => <span>{text === null ? "non" : "oui"}</span>,
    },

    {
      title: "Afficher",
      dataIndex: "active",
      key: "active",
      render: (text) => <span>{text === 0 ? "non" : "oui"}</span>,
    },

    {
      title: "Action",
      key: "action",
      width: 100,
      render: (record) => (
        <Space>
          <NavLink
            to={`/articles/create/${record.id}`}
            state={{ article: record }}
          >
            {/* <Button type="primary" size="small">
              Editer
            </Button> */}
          </NavLink>
          <Popconfirm
            title="Voulez-vous supprimer ?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="primary" size="small" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="home-page">
      <Card
        size="small"
        title="Liste des articles"
        extra={
          <NavLink to={"/articles/create"}>
            <Button type="primary" size="small">
              Ajouter un article
            </Button>
          </NavLink>
        }
      >
        {articles && articles.isSuccess && (
          <Table columns={columns} dataSource={articles.data} />
        )}
      </Card>
    </div>
  );
}
export default ArticlePage;
