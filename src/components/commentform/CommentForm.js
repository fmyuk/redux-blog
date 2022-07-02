import React from "react";
import { shallowEqual, useSelector } from "react-redux";

const CommentForm = () => {

  const { isLoggedIn, user } = useSelector(state => ({
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user
  }), shallowEqual);
  
  return (
    <form className="w-100 pe-5">
      {!isLoggedIn
        ? (
          <div className="form-group mb-2">
            <textarea className="form-control" placeholder="Comment..."></textarea>
          </div>
        ) : (
          <>
            <div className="form-group d-flex mb-2 gap-2">
              <input type="text" className="form-control" placeholder="Name" />
              <input type="email" className="form-control" placeholder="Email" />
            </div>
            <div className="form-group mb-2">
              <textarea className="form-control" placeholder="Comment..."></textarea>
            </div>
          </>
        )
      }
      <div className="form-group d-flex mb-2 gap-2">
        <input
          type="submit"
          className="form-control btn btn-primary"
          value="Add Comment"
        />
      </div>
    </form>
  );
};

export default CommentForm;