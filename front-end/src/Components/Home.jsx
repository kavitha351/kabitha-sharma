
import React, { useEffect, useRef, useState } from 'react';
import './Home.css';
import { motion } from 'framer-motion';
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';

// Vanta's NET effect expects Three.js on window.
window.THREE = THREE;

const terminalCommands = [
  { command: 'whoami', output: 'Kavitha Kumari | Cloud & DevOps Enthusiast' },
  { command: 'cat skills.txt', output: 'AWS · Docker · Kubernetes · Terraform · Jenkins · Ansible' },
  { command: 'git status', output: 'Ready to learn, build, and deploy.' },
  { command: 'deploy --portfolio', output: '✓ Portfolio environment ready!' },
];

const Home = () => {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  const [feed, setFeed] = useState({
    name: '',
    email: '',
    feedback: '',
  });

  const [activeCommand, setActiveCommand] = useState(0);
  const [typedCommand, setTypedCommand] = useState('');

  // Type the selected terminal command.
  useEffect(() => {
    const command = terminalCommands[activeCommand].command;
    let index = 0;

    setTypedCommand('');

    const timer = setInterval(() => {
      index += 1;
      setTypedCommand(command.slice(0, index));

      if (index >= command.length) {
        clearInterval(timer);
      }
    }, 65);

    return () => clearInterval(timer);
  }, [activeCommand]);

  // Vanta animated background.
  useEffect(() => {
    if (!vantaRef.current) return;

    vantaEffect.current = NET({
      el: vantaRef.current,
      THREE,
      mouseControls: false,
      touchControls: false,
      gyroControls: false,
      minHeight: 200,
      minWidth: 200,
      scale: 1,
      scaleMobile: 1,
      color: 0x00cfff,
      backgroundColor: 0x070d18,
      points: 7,
      maxDistance: 16,
      spacing: 23,
    });

    return () => {
      vantaEffect.current?.destroy();
      vantaEffect.current = null;
    };
  }, []);

  const onChange = (e) => {
    setFeed({ ...feed, [e.target.name]: e.target.value });
  };

  
const handleClick = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/send_feed`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: feed.name,
          email: feed.email,
          feedback: feed.feedback,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);

    alert('Feedback submitted successfully!');

    setFeed({
      name: '',
      email: '',
      feedback: '',
    });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    alert('Unable to submit feedback. Please try again.');
  }
};


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="home"
      ref={vantaRef}
    >
      <section className="Intro">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="eyebrow">HELLO, WORLD! I'M</p>

          <h1>Kavitha Kumari<span>.</span></h1>

          <h2>Cloud & DevOps Enthusiast</h2>

          <p className="hero-description">
            I build applications and explore cloud infrastructure,
            automation, and deployment using AWS and modern DevOps tools.
          </p>

          <div className="hero-actions">
            <a href="https://github.com/kavitha351" target="_blank" rel="noreferrer">
              Explore My GitHub ↗
            </a>

            <a href="#contact" className="secondary-action">
              Connect with me
            </a>
          </div>
        </motion.div>

        <motion.div
          className="terminal"
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="terminal-header">
            <div className="terminal-dots">
              <span />
              <span />
              <span />
            </div>
            <span className="terminal-title">kavitha@cloud-lab: ~</span>
            <span className="online-status">● ONLINE</span>
          </div>

          <div className="terminal-body">
            <p className="terminal-muted">Interactive terminal</p>

            <p className="terminal-prompt">
              <span>$</span> {typedCommand}
              <span className="terminal-cursor">▋</span>
            </p>

            <motion.p
              key={activeCommand}
              className="terminal-output"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {terminalCommands[activeCommand].output}
            </motion.p>

            <div className="terminal-options">
              <p>Try a command:</p>

              {terminalCommands.map((item, index) => (
                <button
                  type="button"
                  key={item.command}
                  className={activeCommand === index ? 'command active' : 'command'}
                  onClick={() => setActiveCommand(index)}
                >
                  {item.command}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
      <div className='forms'>
        <h1>Connect with me!</h1>
        <form className='form-inputs' onSubmit={handleClick}>
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
          <button type="submit" className="button">
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
