import React from "react";
import "easymde/dist/easymde.min.css";
import { marked } from "marked";
import DOMPurify from "dompurify";
import highlightjs from "highlight.js";
import "highlight.js/styles/github.css";

const MarkdownView = ({ description }) => {
  marked.setOptions({
    highlight: (code, lang) => {
      return highlightjs.highlightAuto(code, [lang]).value;
    },
  });

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(marked(description)),
      }}
    ></div>
  );
};

export default MarkdownView;
