import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import PostCard from "../postcard/PostCard";

const Home = () => {

  const { postLoading, posts } = useSelector((state) => ({
    postLoading: state.post.isLoading,
    posts: state.post.posts
  }), shallowEqual);

  return (
    <Container>
      <Row className="gap-2">
        <Col md={6} className="mt-5 mb-4 boarder-bottom">
          <Col md={4}>
            <p className="py-3 text-center px-3 bg-dark text-white">
              Latest Posts
            </p>
          </Col>
        </Col>
      </Row>
      <Col md={6} className="mt-2 mb-5">
        {postLoading ? (
          <h1 className="my-5 text-center">Loading...</h1>
        ) : (
          posts.slice(0, 5).map((pst, index) => (
            <PostCard pst={pst} index={index} key={index} />
          ))
        )}
      </Col>
    </Container>
  );
};

export default Home;