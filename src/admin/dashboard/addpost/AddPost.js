import React, { useState } from "react";
import { Button, Col, Container, Form, Row, ProgressBar } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { doPost } from "../../../redux/actionCreators/postActionCreators";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0)

  const { user, userId } = useSelector(state => ({
    user: state.auth.user,
    userId: state.auth.user_id
  }), shallowEqual);

  const dispatch = useDispatch();
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !category || !description) {
      return toast.warning("Please fill in all fields!");
    }

    if (!image || image === undefined) {
      return toast.warning("Please select an image!");
    }

    if (image.size > 5242880) {
      return toast.info("Image should be less than or equal to 5 MB");
    }
    const data = {
      title,
      author: user.displayName,
      category: category.split(","),
      createdDate: new Date(),
      description,
      image: "",
      comments: [],
      createdBy: userId
    };

    dispatch(doPost(data, image, setProgress));
  };

  return (
    <Container>
      <Row>
        <Col md={12} style={{ textAlign: "right" }} className="my-5">
          <Button
            as={Link}
            to="/admin/dashboard"
            variant="dark"
            bg="dark"
            className="mr-2"
          >
            Go Back
          </Button>
        </Col>
        <Col md={12} className="mb-3">
          <h1 className="display-3 text-dark text-center">Add Post</h1>
        </Col>
        <Col md={6} className="mx-auto shadow">
          {progress > 0 && progress < 100 ?
            <>
              <h1>Uploading Post {progress} %</h1>
              <ProgressBar now={progress} max={100} />
            </>
            : progress === 100 ?
              <>
                <h1>Post uploaded successfully</h1>
              </>
              :
              <Form onSubmit={handleSubmit} className="p-4">
                <Form.Group controlId="name" className="my-2">
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="categories" className="my-2">
                  <Form.Control
                    type="text"
                    name="categories"
                    placeholder="Categories [followed with commas for multiple]"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="desc" className="my-2">
                  <textarea
                    placeholder="Enter the description"
                    name="desc"
                    className="form-control"
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </Form.Group>
                <Form.Group controlId="file" className="my-2">
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </Form.Group>
                <Form.Group controlId="file" className="my-2">
                  <Button
                    type="submit"
                    variant="dark"
                    className="form-control"
                  >
                    Add Post
                  </Button>
                </Form.Group>
              </Form>
          }
        </Col>
      </Row>
    </Container>
  );
};

export default AddPost;