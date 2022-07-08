import React from "react";
import { Button, Card } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const PostCard = ({ pst, index }) => {
  const { isLoggedIn, user_id } = useSelector(state => ({
    isLoggedIn: state.auth.isLoggedIn,
    user_id: state.auth.user_id
  }), shallowEqual);

  const history = useHistory();

  return (
    <Card className="mx-auto px-0 mb-3" key={index}>
      <Card.Img src={pst.postData.image} alt={pst.postData.title} />
      <Card.Body>
        <Card.Title>
          {pst.postData.title}
        </Card.Title>
        <Card.Subtitle>
          {pst.postData.description.length > 100
            ? `${pst.postData.description.slice(0, 100)}...`
            : pst.postData.description}
        </Card.Subtitle>
      </Card.Body>
      <Card.Footer className="bg-white">
        <div className="d-flex w-100 px-5 py-2 align-items-center justify-content-between">
          <p className="py-1 px-2 bg-dark text-white">
            {pst.postData.author}
          </p>
        </div>
        <Button
          type="button"
          variant="primary"
          bg="primary"
          className="form-control mb-2 my42"
          onClick={() => history.push(`/post/${pst.postId}`)}
        >
          See Post
        </Button>
        {isLoggedIn && pst.postData.createdBy === user_id &&
          <Button
            type="button"
            variant="outline-primary"
            bg="primary"
            className="form-control"
            onClick={() => history.push(`/admin/dashboard/post/${pst.postId}/edit`)}
          >
            Edit Post
          </Button>
        }
      </Card.Footer>
    </Card>
  );
};

export default PostCard;