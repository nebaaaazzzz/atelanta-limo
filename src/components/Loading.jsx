import React from "react";

function Loading() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        aspectRatio: "3 / 1",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="spinner-border spinner-border-lg text-primary"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;
