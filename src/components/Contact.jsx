import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import axios from "axios";
import { toast } from "react-toastify";


const Contact = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading ,setLoading]=useState(false)
  const backend = "https://portfolio-sigma-lyart-48.vercel.app";
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
      // Validate fields individually
    
  
      if (!name) {
        toast.error("Please provide your Name");
        return;
      }
  
      if (!email) {
        toast.error("Please provide your Email");
        return;
      }
      if (!emailPattern.test(email)) {
        toast.error("Please enter a valid email address");
        return;
      }
  
      if (!msg) {
        toast.error("Please fill the Message field");
        return;
      }
  
      setLoading(true); // Set loading before the API call
  
      // Sending email
      const res = await axios.post(`${backend}/api/v1/portfolio/sendEmail`, {
        name,
        email,
        msg,
      });
  
      if (res?.data?.success) {
        setLoading(false); // Stop loading
        toast.success(res.data.message);
        setname("");   // Clear the form fields
        setEmail("");
        setMsg("");
      } else {
        toast.error(res.data.message);
      }
  
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
      setLoading(false); // Stop loading in case of an error
    }
  };
  
  

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
         
          className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input
              type='text'
              name="name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              placeholder="What's your good name?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your email</span>
            <input
              type='email'
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="What's your web address?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea
              rows={7}
              name="msg"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder='What you want to say?'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>

          <button
            type='submit'
            className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
            onClick={handleSubmit}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
