import React from "react";
import { Row, Col } from "antd";
import { useFetchCategoryPostsQuery } from "./service/article-api";
import { NavLink, useParams } from "react-router-dom";
// import { API_ROOT } from "../../utils/global-var";
import "./style/style.scss";
import Sidebar from "./sidebar";

export function PostsPage() {
  const { id } = useParams();
  const posts = useFetchCategoryPostsQuery(id);

  console.log("posts:", posts);

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
                <Col lg={6} key={index}>
                  <div className="blc">
                    <NavLink
                      className="linkClass"
                      to={"/post/" + item.id}
                      state={{ article: item }}
                    >
                      <div
                        className="blc-img"
                        // style={{
                        //   backgroundImage: `url(${API_ROOT}/${item.image})`,
                        //   backgroundPosition: "center",
                        //   backgroundSize: "cover",
                        //   backgroundRepeat: "no-repeat",
                        // }}
                      />
                      <div className="blc-title">{item.title.rendered}</div>
                      <div className="blc-content">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: item.excerpt.rendered,
                          }}
                        />
                      </div>
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
export default PostsPage;
