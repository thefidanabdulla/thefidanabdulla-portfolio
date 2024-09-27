import React from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

const Portfolio = () => {
  return (
      <div className="screenHeight px-10  pb-[200px]">
        <h1 className="text-[40px] mb-4 font-bold mt-10 text-white">
          Portfolio and Experience
        </h1>
        <div className="mt-10">
          <p className="text-xl font-semibold md:max-w-[75%] text-white">
            In my exciting programming journey, my focus as a Frontend Developer
            has yielded sleek user interfaces. Beyond that, I delve into Unity
            game development, Three.js, and .NET backend (MVC/API). Always eager
            to learn, I'm committed to pushing the boundaries of technology and
            honing my skills for innovative solutions.
          </p>
          <p className="mt-10 text-[18px] mb-8 font-semibold text-[#ffffff70] flex gap-2 items-center">
            You can see more on my Github
            <Link
                to={"https://github.com/thefidanabdulla"}
                className="hover:text-white"
            >
              <FaGithub/>
            </Link>
          </p>
        </div>
        <div>
          <h3 className="text-[28px] font-bold mt-10 text-white">Public Client Projects</h3>
          <div className="mt-4 flex  flex-wrap items-center justify-center md:justify-start gap-4">
            <div
                className="w-[300px] py-5 border-[2px] font-bold text-lg tracking-wide border-white rounded-sm bg-transparent hover:bg-[#ffffff50] transition-all duration-300 text-white flex flex-col items-center justify-center gap-3">
              <Link
                  target="_blank"
                  to={"https://ekid.az/"}
                  className="border-b border-white"
              >
                Ekid
              </Link>
            </div>
            <div
                className="w-[300px] py-5 border-[2px] font-bold text-lg tracking-wide border-white rounded-sm bg-transparent hover:bg-[#ffffff50] transition-all duration-300 text-white flex flex-col items-center justify-center gap-3">
              <Link
                  target="_blank"
                  to={"https://afteks-company.com/"}
                  className="border-b border-white"
              >
                Afteks
              </Link>
            </div>
            <div
                className="w-[300px] py-5 border-[2px] font-bold text-lg tracking-wide border-white rounded-sm bg-transparent hover:bg-[#ffffff50] transition-all duration-300 text-white flex flex-col items-center justify-center gap-3">
              <Link
                  target="_blank"
                  to={"https://bouncefiller.co.kr/"}
                  className="border-b border-white"
              >
                Bounce
              </Link>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-[28px] font-bold mt-10 text-white">Three JS projects</h3>
          <div className="mt-4 flex  flex-wrap items-center justify-center  md:justify-start gap-4">
            <div
                className="w-[300px] py-5 border-[2px] font-bold text-lg tracking-wide border-white rounded-sm bg-transparent hover:bg-[#ffffff50] transition-all duration-300 text-white flex flex-col items-center justify-center gap-3">
              <Link
                  target="_blank"
                  to={"https://three-js-360-viewer.vercel.app/"}
                  className="border-b border-white"
              >
                360 Viewer
              </Link>
              <Link
                  target="_blank"
                  to={"https://github.com/thefidanabdulla/three-js-360-viewer"}
                  className="text-xl text-center"
              >
                <FaGithub/>
              </Link>
            </div>
            <div
                className="w-[300px] py-5 border-[2px] font-bold text-lg tracking-wide border-white rounded-sm bg-transparent hover:bg-[#ffffff50] transition-all duration-300 text-white flex flex-col items-center justify-center gap-3">
              <Link
                  target="_blank"
                  to={"https://threejs-materials-nine.vercel.app/"}
                  className="border-b border-white"
              >
                Materials
              </Link>
              <Link
                  target="_blank"
                  to={"https://github.com/thefidanabdulla/threejs_materials"}
                  className="text-xl text-center"
              >
                <FaGithub/>
              </Link>
            </div>
            <div
                className="w-[300px] py-5 border-[2px] font-bold text-lg tracking-wide border-white rounded-sm bg-transparent hover:bg-[#ffffff50] transition-all duration-300 text-white flex flex-col items-center justify-center gap-3">
              <Link
                  target="_blank"
                  to={"https://threejs-scroll-base-animation.vercel.app/"}
                  className="border-b border-white"
              >
                Scroll base animation
              </Link>
              <Link
                  target="_blank"
                  to={"https://github.com/thefidanabdulla/threejs_scroll_base_animation"}
                  className="text-xl text-center"
              >
                <FaGithub/>
              </Link>
            </div>
            <div
                className="w-[300px] py-5 border-[2px] font-bold text-lg tracking-wide border-white rounded-sm bg-transparent hover:bg-[#ffffff50] transition-all duration-300 text-white flex flex-col items-center justify-center gap-3">
              <Link
                  target="_blank"
                  to={"https://threejs-galaxy-generator-blond.vercel.app/"}
                  className="border-b border-white"
              >
                Galaxy Generator
              </Link>
              <Link
                  target="_blank"
                  to={"https://github.com/thefidanabdulla/threejs_galaxy-generator"}
                  className="text-xl text-center"
              >
                <FaGithub/>
              </Link>
            </div>
            <div
                className="w-[300px] py-5 border-[2px] font-bold text-lg tracking-wide border-white rounded-sm bg-transparent hover:bg-[#ffffff50] transition-all duration-300 text-white flex flex-col items-center justify-center gap-3">
              <Link
                  target="_blank"
                  to={"https://threejs-haunted-house-sigma.vercel.app/"}
                  className="border-b border-white"
              >
                Haunted House
              </Link>
              <Link
                  target="_blank"
                  to={"https://github.com/thefidanabdulla/threejs_haunted-house"}
                  className="text-xl text-center"
              >
                <FaGithub/>
              </Link>
            </div>
            <div
                className="w-[300px] py-5 border-[2px] font-bold text-lg tracking-wide border-white rounded-sm bg-transparent hover:bg-[#ffffff50] transition-all duration-300 text-white flex flex-col items-center justify-center gap-3">
              <Link
                  target="_blank"
                  to={"https://threejs-3d-text-one-lilac.vercel.app/"}
                  className="border-b border-white"
              >
                3D Text
              </Link>
              <Link
                  target="_blank"
                  to={"https://github.com/thefidanabdulla/threejs_3d-text"}
                  className="text-xl text-center"
              >
                <FaGithub/>
              </Link>
            </div>
            <div
                className="w-[300px] py-5 border-[2px] font-bold text-lg tracking-wide border-white rounded-sm bg-transparent hover:bg-[#ffffff50] transition-all duration-300 text-white flex flex-col items-center justify-center gap-3">
              <Link
                  target="_blank"
                  to={"https://threejs-particles-df45.vercel.app/"}
                  className="border-b border-white"
              >
                Particles
              </Link>
              <Link
                  target="_blank"
                  to={"https://github.com/thefidanabdulla/threejs_particles"}
                  className="text-xl text-center"
              >
                <FaGithub/>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-[28px] font-bold mt-10 text-white">My Projects</h3>
          <div className="mt-4 flex  flex-wrap items-center justify-center md:justify-start gap-4">
            <div
                className="w-[300px] py-5 border-[2px] font-bold text-lg tracking-wide border-white rounded-sm bg-transparent hover:bg-[#ffffff50] transition-all duration-300 text-white flex flex-col items-center justify-center gap-3">
              <Link
                  target="_blank"
                  to={"https://mern-booking-app-fqdj.onrender.com/"}
                  className="border-b border-white"
              >
                Hotel Booking App
              </Link>
              <Link
                  target="_blank"
                  to={"https://github.com/thefidanabdulla/mern-booking-app"}
                  className="text-xl text-center"
              >
                <FaGithub/>
              </Link>
            </div>
            <div
                className="w-[300px] py-5 border-[2px] font-bold text-lg tracking-wide border-white rounded-sm bg-transparent hover:bg-[#ffffff50] transition-all duration-300 text-white flex flex-col items-center justify-center gap-3">
              <Link
                  target="_blank"
                  to={"https://react-admin-dashboard-one-olive.vercel.app/"}
                  className="border-b border-white"
              >
                Admin Dashboard
              </Link>
              <Link
                  target="_blank"
                  to={"https://github.com/thefidanabdulla/React-Admin-Dashboard"}
                  className="text-xl text-center"
              >
                <FaGithub/>
              </Link>
            </div>
            <div
                className="w-[300px] py-5 border-[2px] font-bold text-lg tracking-wide border-white rounded-sm bg-transparent hover:bg-[#ffffff50] transition-all duration-300 text-white flex flex-col items-center justify-center gap-3">
              <Link
                  target="_blank"
                  to={"https://youtube-clone-ten-ashy-89.vercel.app/"}
                  className="border-b border-white"
              >
                Youtube Clone
              </Link>
              <Link
                  target="_blank"
                  to={"https://github.com/thefidanabdulla/YoutubeClone"}
                  className="text-xl text-center"
              >
                <FaGithub/>
              </Link>
            </div>
            
            
          </div>
        </div>
      </div>
  );
};

export default Portfolio;
