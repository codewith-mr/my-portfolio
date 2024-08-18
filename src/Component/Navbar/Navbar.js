import React, { useState } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import "../../Component/Navbar/Navbar.css";
import Logo from "../../Images/Images.js";
import { menu_btn1, menu_btn2 } from "../Utils/Mock/MockData.js";

gsap.registerPlugin(ScrollToPlugin);

const Navbar = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const handleClick = () => {
    return "";
  };
  const handleMenuClick = (selector = null) => {
    if (isMenuVisible) {
      gsap.to(".right_section", {
        duration: 0.3,
        x: "100vw",
        opacity: 0,
        ease: "easeInOut",
        onComplete: () => {
          gsap.set(".right_section", { display: "none", overflow: "hidden" });
        },
      });
      gsap.to(".close-btn svg", {
        duration: 0.1,
        rotate: 0,
        scale: 0,
        ease: "back.in(1.7)",
      });
      gsap.to(".menu-btn svg", {
        duration: 0.5,
        scale: 1,
        ease: "back.out(1.7)",
      });
    } else {
      gsap.set(".right_section", { display: "flex" });
      gsap.to(".right_section", {
        duration: 0.3,
        x: 0,
        opacity: 1,
        ease: "easeInOut",
        onStart: () => {
          gsap.set(".right_section", { overflow: "hidden" });
        },
      });
      gsap.to(".menu-btn svg", {
        duration: 0.1,
        rotate: 90,
        scale: 1.2,
        ease: "easeInOut",
      });
      gsap.to(".close-btn svg", {
        duration: 0.5,
        scale: 0,
        ease: "back.in(1.7)",
      });
    }

    setIsMenuVisible((prevState) => !prevState);
    if (selector) {
      gsap.to(window, { duration: 1, scrollTo: selector });
    }
  };
  const handleSectionClick = (selector) => {
    handleMenuClick();
    gsap.to(window, { duration: 1, scrollTo: selector });
  };
  const handleSectionClick1 = (selector) => {
    handleClick();
    gsap.to(window, { duration: 1, scrollTo: selector });
  };
  return (
    <div className="container-fluid navbar">
      <Logo />

      <div className={`main_right_section ${isMenuVisible ? "hidden" : ""}`}>
        {menu_btn1.map((item, index) => (
          <span key={index} onClick={() => handleSectionClick1(`#${item.id}`)}>
            {item.name}
          </span>
        ))}
      </div>
      <div className={`right_section ${isMenuVisible ? "show" : ""}`}>
        {menu_btn2.map((item, index) => (
          <span key={index} onClick={() => handleSectionClick(`#${item.id}`)}>
            {item.name}
          </span>
        ))}
      </div>
      {!isMenuVisible && (
        <button
          className="btn menu-btn"
          data-hover
          onClick={() => handleMenuClick()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
          <div data-hover-bounds></div>
        </button>
      )}

      {isMenuVisible && (
        <button
          className="btn close-btn"
          data-hover
          onClick={() => handleMenuClick()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18" />
            <path d="M6 6L18 18" />
          </svg>
          <div data-hover-bounds></div>
        </button>
      )}
    </div>
  );
};

export default Navbar;
