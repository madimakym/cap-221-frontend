import React from "react";
import { Row, Col } from "antd";
import { useFetchArticleQuery } from "./service/article-api";
import { NavLink, useParams } from "react-router-dom";
import { API_ROOT } from "../../utils/global-var";
import "./style/style.scss";
import Sidebar from "./sidebar";

export function ArticleVueClientPage() {
  const { name } = useParams();
  const articles = useFetchArticleQuery(name);

  return (
    <div className="home-page article-page">
      <Row gutter={24}>
        <Col lg={6}>
          <Sidebar />
        </Col>

        <Col lg={18}>
          {articles && articles.isSuccess && (
            <Row gutter={24}>
              {articles?.data.map((item, index) => (
                <Col lg={6} key={index}>
                  <div className="blc">
                    <NavLink
                      className="linkClass"
                      to={"/articles/lire-article/" + item.id}
                      state={{ article: item }}
                    >
                      <div
                        className="blc-img"
                        style={{
                          backgroundImage: `url(${API_ROOT}/${item.image})`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                        }}
                      />
                      <div className="blc-title">{item.title}</div>
                      <div className="blc-content">{item.resume}</div>
                    </NavLink>
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </div>
  );
}
export default ArticleVueClientPage;
