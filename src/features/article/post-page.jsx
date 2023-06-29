import React from "react";
import { Row, Col } from "antd";
import { useParams } from "react-router-dom";
// import { API_ROOT } from "../../utils/global-var";
import { useFetchPostQuery } from "./service/article-api";

export function PostPage() {
  const { id } = useParams();
  const post = useFetchPostQuery(id);

  return (
    <div className="home-page article-detail">
      <Row>
        <Col lg={5}></Col>
        {post.isSuccess && (
          <Col lg={14}>
            {/* <img
            // className="imgHeader"
            // src={
            //   state.state.article.image
            //     ? API_ROOT + "/" + state.state.article.image
            //     : API_ROOT + "/default.png"
            // }
            // alt={state.state.article.title}
          /> */}
            <br />
            <h1 className="titleHeader">
              <span
                dangerouslySetInnerHTML={{
                  __html: post.data.title.rendered,
                }}
              />
            </h1>

            <p
              dangerouslySetInnerHTML={{
                __html: post.data.content.rendered,
              }}
            />
          </Col>
        )}

        <Col lg={5}></Col>
      </Row>
    </div>
  );
}
export default PostPage;
