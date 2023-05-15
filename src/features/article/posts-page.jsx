import React from "react";
import { Row, Col } from "antd";
import { useFetchCategoryPostsQuery } from "./service/article-api";
import { NavLink, useParams } from "react-router-dom";
import "./style/style.scss";
import Sidebar from "./sidebar";

export function PostsPage() {
  const { id } = useParams();
  const posts = useFetchCategoryPostsQuery(id);

  return (
    <div className="home-page article-page">
      <Row gutter={24}>
        <Col lg={6}>
          <Sidebar />
        </Col>

        <Col lg={18}>
          {posts && posts.isSuccess && (
            <Row gutter={24}>
              {posts?.data.map((item, index) => (
                <Col lg={6} key={index} style={{ marginBottom: "10px" }}>
                  <div className="blc" style={{ height: "100%" }}>
                    <NavLink
                      className="linkClass"
                      to={"/post/" + item.id}
                      state={{ article: item }}
                    >
                      <div className="blc-img">
                        <img
                          src="/assets/img/cap221-logo.png"
                          width={150}
                          alt=""
                        />
                      </div>
                      <div className="blc-title">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: item.title.rendered,
                          }}
                        />
                      </div>
                      <div className="blc-content">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: item.excerpt.rendered,
                          }}
                        />
                      </div>
                    </NavLink>
                  </div>
                  <br />
                  <br />
                  <br />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </div>
  );
}
export default PostsPage;
