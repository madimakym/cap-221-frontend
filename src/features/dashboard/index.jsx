import React from "react";
import "./styles/style.scss";
import { Row, Col, Card, Table } from "antd";
import { useFetchUserQuery } from "../user/service/user-api";

export function HomePage() {
  const users = useFetchUserQuery();

  const columns = [
    {
      title: "Prenom",
      dataIndex: "firstname",
      key: "firstname",
      render: (text) => <span>{text}</span>,
    },

    {
      title: "Nom",
      dataIndex: "lastname",
      key: "lastname",
      render: (text) => <span>{text}</span>,
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <span>{text}</span>,
    },

    {
      title: "Metier",
      dataIndex: "metier",
      key: "metier",
      render: (text) => <span>{text}</span>,
    },
  ];

  return (
    <div className="home-page">
      <Row gutter={24}>
        <Col lg={6} xs={24}>
          <Card size="small" title="Total d'inscrits">
            {users && users.isSuccess && <h4>{users.data.length}</h4>}
          </Card>
        </Col>

        <Col lg={6} xs={24}>
          <Card size="small" title="Ayant bénéficiés de formation">
            <h4>23</h4>
          </Card>
        </Col>

        <Col lg={6} xs={24}>
          <Card size="small" title="Hommes" className="blc-hairdresser">
            <h4>123</h4>
          </Card>
        </Col>

        <Col lg={6} xs={24}>
          <Card size="small" title="Femmes" className="blc-hairdresser">
            <h4>123</h4>
          </Card>
        </Col>
      </Row>
      <br />
      <br />
      <Card size="small" title="Total d'inscrits">
        {users && users.isSuccess && (
          <Table columns={columns} dataSource={users.data} />
        )}
      </Card>
    </div>
  );
}
export default HomePage;
