import React from "react";

const LoadingScreen = () => {
  return (
    <div
      className="w-screen h-screen flex items-center justify-center fixed top-0 left-0 z-[99999999]"
      style={{
        background:
          "linear-gradient(110.6deg, rgb(184, 142, 252) 2.2%, rgb(104, 119, 244) 100.2%)",
      }}
    >
      <div class="content">
        <div class="planet">
          <div class="ring"></div>
          <div class="cover-ring"></div>
          <div class="spots">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <p>loading</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
