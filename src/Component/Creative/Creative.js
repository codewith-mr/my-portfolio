import React, { useEffect } from "react";
import "../Creative/Creative.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Creative = () => {
  useEffect(() => {
    const applyAnimations = () => {
      if (window.innerWidth > 950) {
        gsap.fromTo(
          ".creative_txt",
          { x: -1260 },
          {
            x: -100,
            duration: 1,
            scrollTrigger: {
              trigger: ".creative_txt",
              start: "top 69%",
              end: "top 10%",
              scrub: true,
            },
          }
        );

        gsap.fromTo(
          ".designer_txt",
          { x: 1260 },
          {
            x: -100,
            duration: 1,
            scrollTrigger: {
              trigger: ".designer_txt",
              start: "top 100%",
              end: "top 42%",
              scrub: true,
            },
          }
        );
      } else if (window.innerWidth > 555) {
        // Set position to x: -100 if width is between 555px and 950px
        gsap.set(".creative_txt, .designer_txt", { x: -100 });
      } else {
        gsap.set(".creative_txt", { x: -50 });
        gsap.set(".designer_txt", { x: -150 });
      }
    };

    applyAnimations();

    // Reapply animations on window resize
    const handleResize = () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); // Clear existing animations
      applyAnimations();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); // Cleanup on unmount
    };
  }, []);

  return (
    <div className="creative_projects">
      <div className="txt_container">
        <div className="creative_txt">
          <span>Creative</span>
        </div>
        <div className="frontend_txt">
          <span>Frontend</span>
        </div>
        <div className="designer_txt">
          <span>Developer</span>
        </div>
        <div className="paragraph_div">
          <p className="paragraph_txt">
            I'm a Front-End Web Developer who transforms designs into seamless,
            interactive experiences. I build stunning, responsive websites that
            captivate users and drive engagement.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Creative;
