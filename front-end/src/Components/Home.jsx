import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import { motion } from "framer-motion";
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';

const Home = () => {

  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);
  window.THREE = THREE;

  const [feed, setFeed] = useState({ name: '', email: '', feedback: '' });

  useEffect(() => {
    vantaEffect.current = NET({
      el: vantaRef.current,
      THREE: window.THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0x00aaff,
      backgroundColor: 0x111111,
      points: 10.00,
      maxDistance: 20.00,
      spacing: 18.00
    });

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, []);


  const handleClick = async (e) => {
    e.preventDefault(); // Correct the method name
    const response = await fetch(`${import.meta.env.VITE_API_URL}/send_feed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: feed.name,
        email: feed.email,
        feedback: feed.feedback,
      }),
    });
    const json = await response.json();
    console.log(json);
    alert("Success!")
  };

  const onChange = (e) => {
    setFeed({ ...feed, [e.target.name]: e.target.value });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='home' ref={vantaRef}>
        <div className='Intro'>
          <h1>Kavitha Kumari.</h1>
          <p>
            I a web developer with knowledge in HTML, CSS, Javascript, ReactJs and know programming languages like Java, Python worked with apis and know cloud technology AWS.
          </p>
      </div>
      <div className='forms'>
          <h1>Connect with me!</h1>
          <form className='form-inputs'>
          <div>
            <input
              type="text"
              id="name"
              name="name"
              value={feed.name}
              className="input"
              onChange={onChange}
              placeholder='name'
            />
          </div>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              value={feed.email}
              className="input"
              onChange={onChange}
              placeholder='email'
            />
          </div>
          <div>
            <textarea
              className="textarea"
              placeholder="Leave a comment here"
              name="feedback"
              value={feed.feedback}
              onChange={onChange}
            ></textarea>
          </div>
          <button
            type="submit"
            className="button"
            onClick={handleClick}
          >
            Submit
          </button>
        </form>
      </div>
      <div className='my-contacts'>
        <h1>My Contacts: </h1>
        <ul>
          <li>
            <a href="mailto:kavithakumari351@gmail.com">📧 Email 
            </a>
          </li>
          <li>
            <a href="https://github.com/kavitha351" target="_blank" rel="noreferrer">
              🐙 GitHub
            </a>
          </li>
          <li>
            <a href="https://www.hackerrank.com/profile/Kavithakumari351" target="_blank" rel="noreferrer">
             🟢 HackerRank
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/kavitha-kumari-65016a272" target="_blank" rel="noreferrer">
              💼 LinkedIn
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/@Kiwicoders256" target="_blank" rel="noreferrer">
              ▶️ YouTube
            </a>
          </li>
        </ul>
      </div>
    </motion.div>
  );
};

export default Home;

