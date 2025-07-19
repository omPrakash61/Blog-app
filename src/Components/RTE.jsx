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
        render={({ field: { onChange, value  } }) => ( 
          <Editor
            apiKey="4ga4qbbmij4u436mupexca4sf7chzh3tmykxb7ls8z0q0z42" 
            onInit={(evt , editor) => (editorRef.current = editor)}
            onEditorChange={onChange}
            
            value={value}
            init={{
              height: 350,
              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help",
            }}
          />
        )}
      />
    </div>
  );
}
