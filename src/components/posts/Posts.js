import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import PostCard from "../postcard/PostCard";

const Posts = () => {

  const { postLoading, posts } = useSelector((state) => ({
    postLoading: state.post.isLoading,
    posts: state.post.posts
  }), shallowEqual);

  return (
    <Container>
      <Row>
        <Col md={12} className="mt-5 mb-4">
          <Col md={12}>
            <p className="py-3 text-center px-3 bg-dark text-white">
              All Posts
            </p>
          </Col>
        </Col>
      </Row>
      <Row className="mt-2 mb-5">
        {postLoading ? (
          <h1 className="my-5 text-center">Loading...</h1>
        ) : (
          posts.map((pst, index) => (
            <Col md={12} key={index}>
              <PostCard pst={pst} index={index} />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default Posts;