import React from "react";
import { Card, Table, Button, Popconfirm, Space } from "antd";
import {
  useDeleteMetierMutation,
  useFetchMetierQuery,
} from "./service/metier-api";
import {NavLink, useNavigate} from "react-router-dom";
import {getUser} from "../../utils/global-var";

export function MetierPage() {
  const metiers = useFetchMetierQuery();
  const [deleteMetier] = useDeleteMetierMutation();
  const navigate = useNavigate();
  const userData = getUser();
  if(userData.role === "user"){
    navigate("/articles-vue-client");
  }
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
      width: 100,
      render: (record) => (
        <Space>
          <NavLink to={`/metiers/${record.id}`}>
            <Button type="primary" size="small">
              Editer
            </Button>
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
        title="Liste des metiers"
        extra={
          <NavLink to={"/metiers/create"}>
            <Button type="primary" size="small">
              Ajouter un metier
            </Button>
          </NavLink>
        }
      >
        {metiers && metiers.isSuccess && (
          <Table columns={columns} dataSource={metiers.data} />
        )}
      </Card>
    </div>
  );
}
export default MetierPage;
