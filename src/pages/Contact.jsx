import React from 'react'
import { Canvas } from '@react-three/fiber'
import { MdEmail } from "react-icons/md";
import { FaGithub, FaSquareInstagram, FaTelegram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";

const Contact = () => {
  return (
    <div className='screenHeight px-4 pt-10 md:px-10  pb-[200px]'>
      <h1 className="text-[48px] mb-4 font-bold mt-10 text-white">Contact</h1>
      <div className='flex flex-col gap-3'>
        <span className='text-[24px] font-bold  text-white flex items-center gap-2'><MdEmail />  Email:</span>
        <a className='text-base md:text-[24px] border-2 border-white py-4 w-[300px] md:w-[400px] flex justify-center hover:bg-[#ffffff50] transition-all duration-300 font-bold cursor-pointer text-white' href="mailto:thefidanabdulla@gmail.com">thefidanabdulla@gmail.com</a>
      </div>
      <div className='flex flex-col gap-3 mt-10'>
        <span className='text-[24px] font-bold  text-white '>Sosials and Others:</span>
        <div className='flex md:w-[75%] flex-wrap gap-4'>
          <a className='text-base md:text-[24px] border-2 border-white py-4 w-[200px] justify-center hover:bg-[#ffffff50] transition-all duration-300 font-bold cursor-pointer flex items-center gap-2  text-white' target='_blank' href="https://github.com/thefidanabdulla"><FaGithub />Github</a>
          <a className='text-base md:text-[24px] border-2 border-white py-4 w-[200px] justify-center hover:bg-[#ffffff50] transition-all duration-300 font-bold cursor-pointer flex items-center gap-2  text-white' target='_blank' href="https://www.linkedin.com/in/thefidanabdulla/"><FaLinkedin />Linkedin</a>
          <a className='text-base md:text-[24px] border-2 border-white py-4 w-[200px] justify-center hover:bg-[#ffffff50] transition-all duration-300 font-bold cursor-pointer flex items-center gap-2  text-white' target='_blank' href="https://www.facebook.com/fidan.abdulla.1/"><FaFacebookSquare />Facebook</a>
          <a className='text-base md:text-[24px] border-2 border-white py-4 w-[200px] justify-center hover:bg-[#ffffff50] transition-all duration-300 font-bold cursor-pointer flex items-center gap-2  text-white' target='_blank' href="https://t.me/thefidanabdulla/"><FaTelegram />Telegram</a>
        </div>
      </div>
      
    </div>
  )
}

export default Contact
