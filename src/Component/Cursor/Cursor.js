import React, { useEffect } from "react";
import gsap from "https://esm.sh/gsap";
import { vec2 } from "https://esm.sh/vecteur";
import "../Cursor/Cursor.css";

const Cursor = () => {
  useEffect(() => {
    class Cursor {
      constructor(targetEl) {
        this.el = targetEl;
        this.position = {
          previous: vec2(-100, -100),
          current: vec2(-100, -100),
          target: vec2(-100, -100),
          lerpAmount: 0.1,
        };
        this.scale = {
          previous: 1,
          current: 1,
          target: 1,
          lerpAmount: 0.1,
        };
        this.isHovered = false;
        this.hoverEl = null;

        this.addListeners();
      }

      update() {
        this.position.current.lerp(
          this.position.target,
          this.position.lerpAmount
        );
        this.scale.current = gsap.utils.interpolate(
          this.scale.current,
          this.scale.target,
          this.scale.lerpAmount
        );

        const delta = this.position.current.clone().sub(this.position.previous);
        this.position.previous.copy(this.position.current);
        this.scale.previous = this.scale.current;

        gsap.set(this.el, {
          x: this.position.current.x,
          y: this.position.current.y,
          scaleX: this.scale.current,
          scaleY: this.scale.current,
        });

        if (!this.isHovered) {
          const angle = Math.atan2(delta.y, delta.x) * (180 / Math.PI);
          const distance =
            Math.sqrt(delta.x * delta.x + delta.y * delta.y) * 0.04;

          gsap.set(this.el, {
            rotate: angle,
            scaleX: this.scale.current + Math.min(distance, 1),
            scaleY: this.scale.current - Math.min(distance, 0.3),
          });
        }
      }

      updateTargetPosition(x, y) {
        if (this.isHovered) {
          const bounds = this.hoverEl.getBoundingClientRect();
          const cx = bounds.x + bounds.width / 2;
          const cy = bounds.y + bounds.height / 2;
          const dx = x - cx;
          const dy = y - cy;

          const attractionStrength = 1;
          this.position.target.x = cx + dx * attractionStrength;
          this.position.target.y = cy + dy * attractionStrength;
          this.scale.target = 1;

          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          const distance = Math.sqrt(dx * dx + dy * dy) * 0.01;

          gsap.set(this.el, { rotate: angle });
          gsap.to(this.el, {
            scaleX:
              this.scale.target + Math.pow(Math.min(distance, 0.6), 3) * 3,
            scaleY:
              this.scale.target - Math.pow(Math.min(distance, 0.3), 3) * 3,
            duration: 0.5,
            ease: "power4.out",
            overwrite: true,
          });
        } else {
          this.position.target.x = x;
          this.position.target.y = y;
          this.scale.target = 1;
        }
      }

      addListeners() {
        gsap.utils.toArray("[data-hover]").forEach((hoverEl) => {
          const hoverBoundsEl = hoverEl.querySelector("[data-hover-bounds]");
          hoverBoundsEl.addEventListener("pointerover", () => {
            this.isHovered = true;
            this.hoverEl = hoverBoundsEl;
          });
          hoverBoundsEl.addEventListener("pointerout", () => {
            this.isHovered = false;
            this.hoverEl = null;
          });

          const xTo = gsap.quickTo(hoverEl, "x", {
            duration: 1,
            ease: "elastic.out(1, 0.3)",
          });
          const yTo = gsap.quickTo(hoverEl, "y", {
            duration: 1,
            ease: "elastic.out(1, 0.3)",
          });

          hoverEl.addEventListener("pointermove", (event) => {
            const { clientX: cx, clientY: cy } = event;
            const { height, width, left, top } =
              hoverEl.getBoundingClientRect();
            const x = cx - (left + width / 2);
            const y = cy - (top + height / 2);
            xTo(x * 0.2);
            yTo(y * 0.2);
          });

          hoverEl.addEventListener("pointerout", () => {
            xTo(0);
            yTo(0);
          });
        });
      }
    }

    const cursor = new Cursor(document.querySelector(".cursor"));

    function update() {
      cursor.update();
    }

    function onMouseMove(event) {
      const x = event.clientX;
      const y = event.clientY;
      cursor.updateTargetPosition(x, y);
    }

    gsap.ticker.add(update);
    window.addEventListener("pointermove", onMouseMove);

    return () => {
      window.removeEventListener("pointermove", onMouseMove);
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <main>
      <div className="cursor"></div>
    </main>
  );
};

export default Cursor;
