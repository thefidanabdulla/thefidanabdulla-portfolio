import React from "react";
import AboutModel from "../components/AboutModel";
import { Canvas } from "@react-three/fiber";

const About = () => {
  return (
    <div
      className="screenHeight pb-[200px] md:pb-0"
      style={{
        background: "linear-gradient(to right, #355c7d, #6c5b7b, #c06c84)",
      }}
    >
      <div className="flex">
        <div 
        className="md:block hidden"
         style={{
          background: "transparent",
          width: "45%",
          height: "100vh",
          flexShrink: "0",
        }}
        >
          <Canvas
            style={{
              background: "transparent",
              width: "100%",
              height: "100vh",
              flexShrink: "0",
            }}
            className="r3f "
            camera={{
              fov: 45,
              near: 0.1,
              far: 2000,
              position: [-3, 1.5, 4],
            }}
          >
            <AboutModel />
          </Canvas>
        </div>
        <div className="screenHeight flex justify-center flex-col text-white p-4">
          <div>
            <h1 className="text-[40px] mb-4 font-bold">Hi, Who I Am?</h1>
            <p className="text-2xl font-semibold ">
              Dedicated developer with a passion for transforming ideas into
              sleek digital solutions. Meticulous and innovative, I craft
              seamless user experiences that epitomize excellence in the digital
              realm
            </p>
          </div>
          <div className="mt-6">
            <h2 className="text-[32px] mb-4 font-bold">My Skills</h2>
            <div className="flex flex-wrap items-center gap-4">
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
        </div>
      </div>
    </div>
  );
};

export default About;
