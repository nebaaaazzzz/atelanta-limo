import React from "react";
export function FullScreenSpinner() {
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
      <Spinner />
    </div>
  );
}
function Spinner() {
  return (
    <div
      className="spinner-border spinner-border-lg text-primary"
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}

export default Spinner;
