import React from "react";
import "./styles/style.scss";
import { Row, Col, Card, Table, Image } from "antd";
import {
  useFetchByRegionQuery,
  useFetchGenreQuery,
  useFetchUserQuery,
} from "../user/service/user-api";
import { API_ROOT } from "../../utils/global-var";

export function HomePage() {
  const users = useFetchUserQuery();
  const mens = useFetchGenreQuery("homme");
  const wommens = useFetchGenreQuery("femme");
  const regions = useFetchByRegionQuery();

  console.log("regions:", regions.data);

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

    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
      render: (text) => <span>{text}</span>,
    },

    {
      title: "Region",
      dataIndex: "region",
      key: "region",
      render: (text) => <span>{text}</span>,
    },

    {
      title: "CV",
      key: "cv",
      render: (text) => (
        <span>
          <Image width={50} src={`${API_ROOT}/${text.cv}`} />
        </span>
      ),
    },

    {
      title: "CNI",
      key: "cni",
      render: (text) => (
        <span>
          <Image width={50} src={`${API_ROOT}/${text.cni}`} />
        </span>
      ),
    },
  ];

  const columns2 = [
    {
      title: "Region",
      dataIndex: "region",
      key: "region",
      render: (text) => <span>{text}</span>,
    },

    {
      title: "Total",
      dataIndex: "total",
      key: "total",
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
            <h4>0</h4>
          </Card>
        </Col>

        <Col lg={6} xs={24}>
          <Card size="small" title="Hommes" className="blc-hairdresser">
            <h4>{mens.data}</h4>
          </Card>
        </Col>

        <Col lg={6} xs={24}>
          <Card size="small" title="Femmes" className="blc-hairdresser">
            <h4>{wommens.data}</h4>
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
      <br />
      <br />
      <Card size="small" title="Total d'inscrits par region">
        {regions && regions.isSuccess && (
          <Table columns={columns2} dataSource={regions.data} />
        )}
      </Card>
    </div>
  );
}
export default HomePage;
