import React, { useMemo } from "react";
import SimpleMde from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { marked } from "marked";
import highlightjs from "highlight.js";
import "highlight.js/styles/github.css";
import { storage } from "../../config/firebase";

const MarkdownEditor = ({ description, setDescription }) => {

  marked.setOptions({
    highlight: (code, lang) => {
      return highlightjs.highlightAuto(code, [lang]).value;
    },
  });
  
  const imageUploadFunction = (file) => {
    const storageRef = storage.ref(`images`);
    const imagesRef = storageRef.child(file.name);
    const upLoadTask = imagesRef.put(file);

    upLoadTask.on(
      "state_changed",
      (snapshot) => {
        console.log("snapshot", snapshot);
      },
      (error) => {
        console.log(error);
      },
      () => {
        upLoadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          setDescription((preMardown) => {
            return preMardown + `![image](${downloadURL})`;
          });
        });
      }
    );
  };
    
  const autoUploadImage = useMemo(() => {
    return {
      uploadImage: true,
      imageUploadFunction,
    };
  }, []);

  const onChange = (value) => {
    setDescription(value);
  };

  return (
    <div>
      <SimpleMde value={description} onChange={onChange} options={autoUploadImage} />
    </div>
  );
};

export default MarkdownEditor;
