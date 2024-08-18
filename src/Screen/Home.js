import React from "react";
import Cursor from "../Component/Cursor/Cursor.js";
import Projects from "../Component/Projects/Projects.js";
import Skills from "../Component/Skills/Skills.js";
import Creative from "../Component/Creative/Creative.js";
import Resume from "../Component/Resume/Resume.js";
import Contact from "../Component/Contact/Contact.js";
import FrontBody from "../Component/Front-Body/FrontBody.js";
import Navbar from "../Component/Navbar/Navbar.js";

const Home = () => {
  return (
    <>
      <section data-scroll-section>
        <Navbar />
        <FrontBody />
        <Cursor />
        <Projects />
        <Skills />
        <Creative />
        <Resume />
        <Contact />
      </section>
    </>
  );
};

export default Home;
