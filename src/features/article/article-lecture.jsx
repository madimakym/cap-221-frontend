import React from "react";
import { Row, Col } from "antd";
import { useLocation } from "react-router-dom";
import { API_ROOT } from "../../utils/global-var";

export function ArticleLectureClientPage() {
  let state;
  state = useLocation();

  return (
    <div className="home-page article-detail">
      <Row>
        <Col lg={5}></Col>
        <Col lg={14}>
          <img
            className="imgHeader"
            src={
              state.state.article.image
                ? API_ROOT + "/" + state.state.article.image
                : API_ROOT + "/default.png"
            }
            alt={state.state.article.title}
          />
          <br />
          <h1 className="titleHeader">{state.state.article.title}</h1>

          <p
            dangerouslySetInnerHTML={{
              __html: state.state.article.description,
            }}
          />
        </Col>
        <Col lg={5}></Col>
      </Row>
    </div>
  );
}
export default ArticleLectureClientPage;
