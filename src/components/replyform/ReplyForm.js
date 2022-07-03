import React, { useState } from "react";

const ReplyForm = ({ comment }) => {

  const [openReplyForm, setOpenReplyForm] = useState(false);
  const [reply, setReply] = useState("");

  return (
    <>
      {openReplyForm ? (
        <form className="mt-5">
          <div className="form-group">
            <textarea
              placeholder="Do Reply..."
              className="form-control"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group mt-4">
            <button
              type="submit"
              className="btn text-primary me-3"
            >
              Reply
            </button>
            <button
              type="button"
              onClick={() => setOpenReplyForm(false)}
              className="btn text-danger"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <p
          onClick={() => setOpenReplyForm(true)}
            className="btn text-primary text-left mt-5"
            style={{ cursor: "pointer"}}
        >
          Reply
        </p>
      )}
    </>
  );
};

export default ReplyForm;