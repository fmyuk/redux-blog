import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CommentForm from "../commentform/CommentForm";

const SeePost = () => {
  const { postId } = useParams();
  
  const { isLoading, posts } = useSelector((state) => ({
    isLoading: state.post.isLoading,
    posts: state.post.posts
  }), shallowEqual);

  const currentPost = posts.length > 0 &&
    posts.find((pst) => pst.postId === postId);
  
  console.log(currentPost)

  if (isLoading) {
    return (
      <Container>
        <Row>
          <Col>
            <h1 className="text-center my-5 display-2">Loading Post...</h1>
          </Col>
        </Row>
      </Container>
    );
  }

  if (!isLoading && (currentPost === undefined || currentPost === false)) {
    return (
      <Container>
        <Row>
          <h1 className="text-center my-5 display-2">No Post Found</h1>
        </Row>
      </Container>
    );
  }

  return (
    <Container fluid className="px-0" style={{ overflowX: "hidden" }}>
      <Row>
        <Col md={12}>
          <Image
            style={{ height: "650", width: "100%" }}
            src={currentPost.postData.image}
            alt={currentPost.postData.title}
          />
        </Col>
      </Row>
      <Row className="align-items-center justify-content-between">
        <Col md={6} className="py-5 px-5">
          <p className="display-3">{currentPost.postData.title}</p>
        </Col>
        <Col md={5} className="d-flex gap-1 align-items-center justify-content-end pr-5">
          {currentPost.postData.category.map((cat, index) => (
            <p className="py-1 bg-primary text-white px-2 mr-3" key={index + 55}>
              {cat}
            </p>
          ))}
        </Col>
      </Row>
      <div className="d-flex">
        <p
          className="card-text text-wrap overflow-hidden px-5 py-0 w-50 text-justify"
          style={{ wordWrap: "wrap", wordBreak: "break-word" }}
        >
          {currentPost.postData.description}
        </p>
        <div className="col-md-6">
          <CommentForm />
        </div>
      </div>
    </Container>
  );
};

export default SeePost;