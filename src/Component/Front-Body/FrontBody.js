import React, { useEffect } from "react";
import "../Front-Body/FrontBody.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BottomButtons from "../BottomButtons/BottomButtons";

gsap.registerPlugin(ScrollTrigger);

const FrontBody = () => {
  useEffect(() => {
    const initialWidth = window.innerWidth <= 900 ? "50px" : "50px";
    const finalWidth = window.innerWidth <= 900 ? "50px" : "150px";

    gsap.fromTo(
      "#minus",
      { width: initialWidth },
      {
        width: finalWidth,
        duration: 0.3,
        scrollTrigger: {
          trigger: "#minus",
          scroller: "body",
          markers: false,
          start: "top 30%",
          end: "top 60%",
          scrub: true,
          onEnter: () => console.log("Enter triggered"),
          onLeave: () => console.log("Leave triggered"),
          onEnterBack: () => console.log("Enter back triggered"),
          onLeaveBack: () => console.log("Leave back triggered"),
        },
      }
    );
  }, []);

  return (
    <div className="container-fluid FrontBody_projects">
      <div className="FrontBody_content">
        <div className="content_bg">
          <span className="title">
            <h1>
              FRONT <span id="minus"> </span> END
            </h1>
            <h4>DEVELOPER</h4>
            <div className="paragraph">
              <p>
                I'm a Front-End Web Developer who transforms designs into
                seamless, interactive experiences. I build stunning, responsive
                websites that captivate users and drive engagement.
              </p>
            </div>
          </span>
          <BottomButtons />
        </div>
      </div>
    </div>
  );
};

export default FrontBody;
