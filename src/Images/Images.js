import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import logo from "../Images/logo.png";

const Logo = () => {
  const logoRef = useRef(null);
  const rotationTimelineRef = useRef(null);
  const hoverTimelineRef = useRef(null);

  useEffect(() => {
    rotationTimelineRef.current = gsap.timeline({ repeat: -1, paused: true });
    rotationTimelineRef.current.fromTo(
      logoRef.current,
      { rotation: 0 },
      {
        rotation: 360,
        duration: 15,
        ease: "linear",
        transformOrigin: "center center",
      }
    );
    rotationTimelineRef.current.play();
    return () => {
      rotationTimelineRef.current.kill();
      if (hoverTimelineRef.current) {
        hoverTimelineRef.current.kill();
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (rotationTimelineRef.current.isActive()) {
      rotationTimelineRef.current.pause();
    }
    hoverTimelineRef.current = gsap.timeline({ repeat: -1, paused: false });
    hoverTimelineRef.current.fromTo(
      logoRef.current,
      { rotation: 0 },
      {
        rotation: -360,
        duration: 5,
        ease: "linear",
      }
    );
  };
  const handleMouseLeave = () => {
    if (hoverTimelineRef.current) {
      hoverTimelineRef.current.kill();
    }
    rotationTimelineRef.current.play();
  };

  return (
    <img
      src={logo}
      alt="Logo"
      className="Logo"
      style={{ height: "80px", display: "block" }}
      ref={logoRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
};

export default Logo;
