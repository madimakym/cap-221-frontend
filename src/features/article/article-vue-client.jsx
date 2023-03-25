import React from "react";
import { Row, Col } from "antd";
import { useFetchArticleQuery } from "./service/article-api";
import { API_ROOT } from "../../utils/global-var";
import "./style/style.scss";

export function ArticleVueClientPage() {
  const articles = useFetchArticleQuery();

  return (
    <div className="home-page article-page">
      <Row>
        <Col lg={18}>
          {articles && articles.isSuccess && (
            <Row gutter={24}>
              {articles?.data.map((item, index) => (
                <Col lg={5} key={index}>
                  <div className="blc">
                    <div
                      className="blc-img"
                      style={{
                        backgroundImage: `url(${API_ROOT}/${item.image})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></div>
                    <div className="blc-title">{item.title}</div>
                    <div className="blc-content">{item.resume}</div>
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
