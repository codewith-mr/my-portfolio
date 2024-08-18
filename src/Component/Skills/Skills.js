import React, { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import Observer from "gsap/Observer";
import "./Skills.css";
import Marquee from "react-fast-marquee";
import plus from "../../Images/plus.png";
import { boxes } from "../Utils/Mock/MockData";

gsap.registerPlugin(Draggable, Observer);

const Skills = () => {
  const rotateRef = useRef(null);
  const velocity = useRef(0);
  const lastY = useRef(0);

  useEffect(() => {
    const rotateElement = rotateRef.current;
    const boxes = gsap.utils.toArray(".box");
    const numBoxes = boxes.length;
    const radius = 520;
    const angleStep = (2 * Math.PI) / numBoxes;
    boxes.forEach((box, i) => {
      const angle = i * angleStep;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const rotation = angle * (180 / Math.PI) + 90;
      gsap.set(box, {
        x: x,
        y: y,
        rotation: rotation,
        transformOrigin: "center",
      });
    });
    const alignTopBox = () => {
      const rotateElement = rotateRef.current;
      const boxes = gsap.utils.toArray(".box");
      let closestBox = null;
      let minDistance = Infinity;

      boxes.forEach((box) => {
        const boxRect = box.getBoundingClientRect();
        const containerRect = rotateElement.getBoundingClientRect();
        const containerCenterX = containerRect.left + containerRect.width / 4;
        const distance = Math.abs(
          boxRect.left + boxRect.width / 4 - containerCenterX
        );
        if (distance < minDistance) {
          minDistance = distance;
          closestBox = box;
        }
      });
      if (closestBox) {
        const currentRotation = gsap.getProperty(rotateElement, "rotation");
        const boxRotation = gsap.getProperty(closestBox, "rotation");
        const boxIndex = gsap.utils.toArray(".box").indexOf(closestBox);
        const angleStep = (2 * Math.PI) / boxes.length;
        const boxAngle = angleStep * boxIndex;
        const targetRotation = -boxAngle * (180 / Math.PI) + 90;
        gsap.to(rotateElement, {
          rotation: currentRotation + targetRotation,
          duration: 0.5,
          ease: "power2.inOut",
        });
      }
    };
    Observer.create({
      target: rotateElement,
      type: "wheel,touch",
      preventDefault: true,
      onChangeY(self) {
        if (
          Math.abs(self.velocityY) > Math.abs(velocity.current) ||
          (self.deltaY < 0 && velocity.current > 0) ||
          (self.deltaY > 0 && velocity.current < 0) ||
          self.isDragging
        ) {
          velocity.current = self.velocityY * (self.isDragging ? 10 : 1);
        }
      },
    });

    Draggable.create(rotateElement, {
      type: "rotation",
      inertia: true,
      onPress() {
        gsap.killTweensOf(rotateElement);
        lastY.current = this.y;
      },
      onDrag() {
        const deltaY = lastY.current - this.y;
        lastY.current = this.y;
        gsap.set(rotateElement, { rotation: `+=${deltaY * 0.95}` });
        velocity.current = deltaY;
      },
      onRelease() {
        gsap.to(rotateElement, {
          rotation: `+=${velocity.current * 5}`,
          duration: 2,
          ease: "power1.out",
          onComplete: () => {
            alignTopBox();
            gsap.to(rotateElement, {
              rotation: `+=0`,
              duration: 1,
              ease: "power2.out",
            });
          },
        });
        velocity.current = 0;
      },
    });
    gsap.ticker.add((time, deltaTime) => {
      if (Math.abs(velocity.current) < 50) {
        velocity.current = 0;
        return;
      }
      const adjustedVelocity = (deltaTime * velocity.current) / 100000;
      gsap.set(rotateElement, { rotation: `+=${adjustedVelocity}` });
      velocity.current *= 0.99;
    });
    const setSize = () => {
      const size = Math.min(window.innerWidth * 0.7, window.innerHeight * 1.1);
      document.body.style.setProperty("--radius", `${size}px`);
    };
    setSize();
    window.addEventListener("resize", setSize);
    return () => {
      window.removeEventListener("resize", setSize);
    };
  }, []);

  // ========== Marquee logic ===========

  const [direction, setDirection] = useState("left");
  const [key, setKey] = useState(0);
  const handleScroll = (dets) => {
    const newDirection = dets.deltaY > 0 ? "left" : "right";
    if (newDirection !== direction) {
      gsap.to(".Marquee", {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setDirection(newDirection);
          setKey((prevKey) => prevKey + 1);
        },
      });
      gsap.to(".Marquee span img", {
        rotate: 360,
        duration: 0.5,
      });
    }
  };
  useEffect(() => {
    const debouncedScroll = (dets) => setTimeout(() => handleScroll(dets), 100);
    window.addEventListener("wheel", debouncedScroll);
    return () => window.removeEventListener("wheel", debouncedScroll);
  }, [direction]);

  gsap.to(".Marquee span img", {
    rotate: 0,
  });
  // ====================================

  return (
    <div id="skills" className="skills-container">
      <h1>SKILLS</h1>
      <div className="rotate_bg">
        <div className="rotate wheel" ref={rotateRef}>
          {boxes.map((item, index) => (
            <div key={index} className={item.className}>
              <img src={item.Image} alt="img" />
            </div>
          ))}
        </div>
        <div className="circle_button"></div>
      </div>

      <div className="slider_container ">
        <Marquee key={key} direction={direction} className="Marquee">
          ACCESSIBILITY
          <span>
            &nbsp;
            <img className="plus" src={plus} />
            &nbsp;
          </span>
          PERFORMANCE
          <span>
            &nbsp;
            <img className="plus" src={plus} />
            &nbsp;
          </span>
          INTERACTIVE
          <span>
            &nbsp;
            <img className="plus" src={plus} />
            &nbsp;
          </span>
          RESPONSIVENESS
          <span>
            &nbsp;
            <img className="plus" src={plus} />
            &nbsp;
          </span>
        </Marquee>
      </div>
    </div>
  );
};

export default Skills;
