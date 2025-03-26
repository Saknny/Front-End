import React from "react";
import "./Loading.scss";
function Loading() {
  return (
    <>
      <div className="loading-container">
        <div className="loading-balls">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
}

export default Loading;
