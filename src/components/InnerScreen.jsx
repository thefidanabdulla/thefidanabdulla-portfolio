import React from "react";
import { Link } from "react-router-dom";

const InnerScreen = () => {
  return (
    <div
      className="w-[1024px] h-[670px] overflow-y-auto p-10 text-white"
      style={{
        background:
          "linear-gradient(110.6deg, rgb(184, 142, 252) 2.2%, rgb(104, 119, 244) 100.2%)",
      }}
    >
      <div>
        <h1 className="text-[64px] mb-4 font-bold">Hi, Who I Am?</h1>
        <p className="text-3xl font-semibold md:max-w-[75%]">
          Dedicated developer with a passion for transforming ideas into sleek
          digital solutions. Meticulous and innovative, I craft seamless user
          experiences that epitomize excellence in the digital realm
        </p>
      </div>
      <div className="mt-10">
        <h2 className="text-[48px] mb-4 font-bold">My Skills</h2>
        <div className="flex md:max-w-[75%] flex-wrap items-center gap-4">
          <div className="px-5 py-2 border-[2px] font-bold text-lg tracking-wide border-white rounded-sm bg-transparent hover:bg-[#ffffff50] transition-all duration-75 ">
            React
          </div>
          <div className="px-5 py-2 border-[2px] font-bold text-lg tracking-wide border-white rounded-sm bg-transparent hover:bg-[#ffffff50] transition-all duration-75 ">
            Next Js
          </div>
          <div className="px-5 py-2 border-[2px] font-bold text-lg tracking-wide border-white rounded-sm bg-transparent hover:bg-[#ffffff50] transition-all duration-75 ">
            Javascript
          </div>
          <div className="px-5 py-2 border-[2px] font-bold text-lg tracking-wide border-white rounded-sm bg-transparent hover:bg-[#ffffff50] transition-all duration-75 ">
            Tailwind
          </div>
          <div className="px-5 py-2 border-[2px] font-bold text-lg tracking-wide border-white rounded-sm bg-transparent hover:bg-[#ffffff50] transition-all duration-75 ">
            HTML / CSS
          </div>
          <div className="px-5 py-2 border-[2px] font-bold text-lg tracking-wide border-white rounded-sm bg-transparent hover:bg-[#ffffff50] transition-all duration-75 ">
            SASS / SCSS
          </div>
          <div className="px-5 py-2 border-[2px] font-bold text-lg tracking-wide border-white rounded-sm bg-transparent hover:bg-[#ffffff50] transition-all duration-75 ">
            THREE JS
          </div>
          <div className="px-5 py-2 border-[2px] font-bold text-lg tracking-wide border-white rounded-sm bg-transparent hover:bg-[#ffffff50] transition-all duration-75 ">
            C#
          </div>
          <div className="px-5 py-2 border-[2px] font-bold text-lg tracking-wide border-white rounded-sm bg-transparent hover:bg-[#ffffff50] transition-all duration-75 ">
            .Net
          </div>
          <div className="px-5 py-2 border-[2px] font-bold text-lg tracking-wide border-white rounded-sm bg-transparent hover:bg-[#ffffff50] transition-all duration-75 ">
            Unity
          </div>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-[48px] mb-4 font-bold">Experience</h2>
        <p className="text-xl font-semibold md:max-w-[75%]">
          In my exciting programming journey, my focus as a Frontend Developer has
          yielded sleek user interfaces. Beyond that, I delve into Unity game
          development, Three.js, and .NET backend (MVC/API). Always eager to
          learn, I'm committed to pushing the boundaries of technology and
          honing my skills for innovative solutions.
        </p>
      </div>
    </div>
  );
};

export default InnerScreen;
