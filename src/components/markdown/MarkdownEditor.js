import React from "react";
import SimpleMde from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const MarkdownEditor = ({ description, setDescription }) => {

  const onChange = (value) => {
    setDescription(value);
  };

  return (
    <div>
      <SimpleMde value={description} onChange={onChange} />
    </div>
  );
};

export default MarkdownEditor;
