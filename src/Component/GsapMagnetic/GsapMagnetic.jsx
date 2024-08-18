import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const MagneticButton = ({ children }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const xTo = gsap.quickTo(buttonRef.current, "x", {
      duration: 0.1,
      ease: "power2.out",
    });
    const yTo = gsap.quickTo(buttonRef.current, "y", {
      duration: 0.1,
      ease: "power2.out",
    });

    const mouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } =
        buttonRef.current.getBoundingClientRect();
      const x = (clientX - (left + width / 2)) * 0.4;
      const y = (clientY - (top + height / 2)) * 0.4;
      xTo(x);
      yTo(y);
    };

    const mouseLeave = () => {
      gsap.to(buttonRef.current, {
        x: 0,
        y: 0,
        duration: 0.2,
        ease: "power2.inOut",
      });
    };

    const button = buttonRef.current;
    button.addEventListener("mousemove", mouseMove);
    button.addEventListener("mouseleave", mouseLeave);

    return () => {
      button.removeEventListener("mousemove", mouseMove);
      button.removeEventListener("mouseleave", mouseLeave);
    };
  }, []);

  return (
    <div ref={buttonRef} style={{ display: "inline-block" }}>
      {children}
    </div>
  );
};

export default MagneticButton;
