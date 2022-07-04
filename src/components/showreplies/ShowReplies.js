import React, { useState } from "react";

const ShowReplies = ({ allReplies }) => {

  const [replies, setReplies] = useState();

  return (
    <>
      <p className="mt-2">Replies:-</p>
      {allReplies.length > 0 ? (
        replies && (
          <div className="w-100 my-4">
            {allReplies.map((reply, index) => (
              <div
                key={index + 5555}
                className="w-100 card px-5 py-3 my-2"
              >
                <div className="w-100 d-flex align-center justify-content-between">
                  <div className="d-flex">
                    <p className="my-0 text-capitalize text-white bg-dark py-3 me-4 px-4 rounded-circle">
                      {reply.name[0]}
                    </p>
                    <div>
                      <p className="my-0 card-title">{reply.name}</p>
                      <p className="my-0 card-text small mx-2">{reply.email}</p>
                    </div>
                  </div>
                  <div className="d-flex gap-1 align-items-center justify-content-end">
                    {reply.admin && (
                      <p className="bg-dark text-white py-1 px-2 mx-2">Admin</p>
                    )}
                    {reply.postOwner && (
                      <p className="bg-dark text-white py-1 px-2">Author</p>
                    )}
                  </div>
                </div>
                <p className="mt-4 text-left">{reply.reply}</p>
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="w-100 my-4">
          <p className="text-center my-0">No Replies</p>
        </div>
      )}
      {allReplies.length > 0 && (
        <button
          className="btn text-primary text-left mt-4"
          onClick={() => setReplies(prevReplies => !prevReplies)}
        >
          {replies ? "Hide" : "View"} {allReplies.length} reply(s)
        </button>
      )}
    </>
  );
};

export default ShowReplies;