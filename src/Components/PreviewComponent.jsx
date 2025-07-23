import React from "react";

export const PreviewComponent = ({ content }) => {
  return (
    <div className="prose prose-lg p-4 rounded border shadow bg-white">
      <h2 className="text-xl font-semibold mb-2">Live Preview</h2>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

