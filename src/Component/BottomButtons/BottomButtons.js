import React from "react";
import "../BottomButtons/BottomButtons.css";
import { gsap } from "gsap";
import { menu_btn1 } from "../Utils/Mock/MockData";

const BottomButtons = () => {
  const handleClick = () => {
    return "";
  };
  const handleSectionClick1 = (selector) => {
    handleClick();
    gsap.to(window, { duration: 1, scrollTo: selector });
  };
  return (
    <>
      <div className="BottomButtons_bg">
        {menu_btn1.map((item, index) => (
          <button
            key={index}
            onClick={() => handleSectionClick1(`#${item.id}`)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </>
  );
};

export default BottomButtons;
