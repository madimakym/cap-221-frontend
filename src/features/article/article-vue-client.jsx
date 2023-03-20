import React from "react";
import { Card, List, Row, Col } from "antd";
import { useFetchArticleQuery } from "./service/article-api";
import { NavLink, useParams } from "react-router-dom";
import { API_ROOT } from "../../utils/global-var";
import Sidebar from "./sidebar";

export function ArticleVueClientPage() {
  const { name } = useParams();
  const articles = useFetchArticleQuery(name);
  return (
    <div className="home-page ArticleList">
      <Row>
        <Col lg={6}>
          <Sidebar />
        </Col>
        <Col lg={18}>
          {articles && articles.isSuccess && (
            <List
              grid={{ gutter: 16, column: 4 }}
              dataSource={articles.data}
              renderItem={(item) => (
                <List.Item>
                  <div className="article">
                    <div className="image">
                      <img
                        className="imgArticle"
                        src={
                          item.image
                            ? API_ROOT + "/" + item.image
                            : API_ROOT + "/default.png"
                        }
                        alt={item.title}
                      />
                    </div>
                    <Card title={item.title}>
                      <div
                        className="articleText"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      />
                      <NavLink
                        className="linkClass"
                        to={"/articles/lire-article/" + item.id}
                        state={{ article: item }}
                      >
                        Lire plus ...
                      </NavLink>
                    </Card>
                    <div className="articleFooter">{item.category}</div>
                  </div>
                </List.Item>
              )}
            />
          )}
        </Col>
      </Row>
    </div>
  );
}
export default ArticleVueClientPage;
