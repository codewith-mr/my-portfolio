import React, { useEffect } from "react";
import "../Resume/Resume.css";
import resume_img from "../../Images/resume.jpg";
import resume_bgImg from "../../Images/resume_bgImg.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Resume = () => {
  useEffect(() => {
    gsap.fromTo(
      ".resumeImg_1",
      { rotate: 12, height: 520 },
      {
        rotate: 3,
        height: 550,
        duration: 1,
        scrollTrigger: {
          trigger: ".resumeImg_1",
          start: "top 69%",
          end: "top 10%",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      ".resumeImg_2",
      { rotate: -8, height: 500 },
      {
        rotate: -1,
        height: 600,
        duration: 1,
        scrollTrigger: {
          trigger: ".resumeImg_2",
          start: "top 69%",
          end: "top 10%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <>
      <div id="resume" className="container-fluid  Resume_projects">
        <h1>RESUME</h1>
        <div className="resume_box">
          <div className="resumeImg_wrapper_1">
            <img className="resumeImg_1" src={resume_bgImg} alt="resume" />
          </div>
          <div className="resumeImg_wrapper_2">
            <a href=" https://drive.google.com/file/d/1LNXgwslZWd7PvVEYYWZ8XR2PtrFmMZAX/view?usp=sharing">
              <img className="resumeImg_2" src={resume_img} alt="resume" />
            </a>
          </div>
          <div className="light"></div>
        </div>
      </div>
    </>
  );
};

export default Resume;
