import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
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
      <Row className="my-5 px-5 gap-2">
        {postLoading ? (
          <h1 className="my-5 text-center">Loading...</h1>
        ) : (
          posts.slice(0, 4).map((pst, index) => (
            <Card className="col-md-5 mx-auto px-0" key={index}>
              <PostCard pst={pst} index={index} key={index} />
            </Card>
          ))
        )}
      </Row>
    </Container>
  );
};

export default Home;