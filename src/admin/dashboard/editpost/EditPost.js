import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updatePostData } from "../../../redux/actionCreators/postActionCreators";

const EditPost = () => {
  const { postId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const posts = useSelector((state) => state.post.posts);

  const currentPost = posts.find((pst) => pst.postId === postId);

  useEffect(() => {
    if (currentPost) {
      setTitle(currentPost.postData.title);
      setDescription(currentPost.postData.description);
    }
  }, [currentPost]);
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description) {
      return toast.warning("Please fill in all fields!");
    }

    const data = { title, description };

    dispatch(updatePostData(postId, currentPost, data));
  };

  return (
    <Container>
      <Row>
        <h1 className="display-3 text-center mt-4">Edit Post {postId}</h1>
        <Col md={6} className="mx-auto mt-5">
          <Form onSubmit={handleSubmit}>
            <Form.Control
              type="text"
              placeholder="Title"
              value={title}
              className="mt-5 mb-3"
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Description"
              value={description}
              className="form-control"
              rows="10"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <Button type="submit" className="mt-4 form-control" variant="dark">
              Update Post
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditPost;