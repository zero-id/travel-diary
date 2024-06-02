import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IValue } from ".";

const EditorText = ({
  setForm,
  form,
}: {
  setForm: React.Dispatch<React.SetStateAction<IValue>>;
  form: IValue;
}) => {
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    setForm({ ...form, description: description });
  }, [description]);

  console.log(form );
  

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <div style={{ backgroundColor: "#fff" }} className="text-editor">
      <ReactQuill
        theme="snow"
        value={description}
        onChange={setDescription}
        placeholder="Write something amazing..."
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default EditorText;
