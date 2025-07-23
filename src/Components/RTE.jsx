import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label }) {
  const editorRef = useRef(null);

  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
  name={name || "content"}
  control={control}
  render={({ field: { onChange, value } }) => (
    <Editor
      apiKey="4ga4qbbmij4u436mupexca4sf7chzh3tmykxb7ls8z0q0z42"
      onInit={(evt, editor) => (editorRef.current = editor)}
      onEditorChange={onChange}
      value={value}
      init={{
        height: 500,
        menubar: false, // hides default top menubar
        plugins: [
          "advlist", "autolink", "lists", "link", "image", "charmap",
          "preview", "anchor", "searchreplace", "visualblocks", "code",
          "fullscreen", "insertdatetime", "media", "table", "wordcount"
        ],
        toolbar: `
          preview fullscreen | undo redo | formatselect fontsizeselect fontselect |
          bold italic underline forecolor | alignleft aligncenter alignright alignjustify |
          bullist numlist outdent indent | link image table media | code
        `,
        font_size_formats: "12px 14px 16px 18px 24px 36px",
        font_family_formats:
          "Arial=arial,helvetica,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Tahoma=tahoma,arial,helvetica; Times New Roman=times new roman,times; Verdana=verdana,geneva;",
        content_style: "body { font-family:Arial; font-size:14px }"
      }}
    />
  )}
/>

    </div>
  );
}
