import React from "react";
import "../Loader/LoaderScreen.css";

const LoaderScreen = () => {
  return (
    <>
      <div className="main">
        <div class="wrapper">
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="shadow"></div>
          <div class="shadow"></div>
          <div class="shadow"></div>
        </div>
      </div>
    </>
  );
};

export default LoaderScreen;
