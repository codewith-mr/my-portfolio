import React from "react";
import "../Contact/Contact.css";
import GsapMagnetic from "../../Component/GsapMagnetic/GsapMagnetic";
import call_icon from "../../Images/phone-call.svg";
import mail_icon from "../../Images/mail.svg";
import { social_icons, social_icons_2 } from "../Utils/Mock/MockData";

const Contact = () => {
  return (
    <div className="container-fluid contact_projects">
      <h1>CONTACT US</h1>
      <div className="conatct_container">
        <div className="box_1 col-lg-7">
          <div className="icon_box1">
            <div className="title">
              <p>LET'S CONNECT</p>
              <span>WITH US</span>
            </div>
            <div className="icons">
              {social_icons.map((item, index) => (
                <GsapMagnetic key={index}>
                  <img
                    className={item.className}
                    src={item.social_Image}
                    alt="icon"
                  />
                </GsapMagnetic>
              ))}
            </div>
          </div>
          <div className="icon_box2">
            <div className="title">
              <p>I WILL BE YOUR</p>
              <span>WEB DEVELOPER</span>
            </div>
            <div className="icons">
              {social_icons_2.map((item, index) => (
                <GsapMagnetic key={index}>
                  <img
                    className={item.className}
                    src={item.social_Image}
                    alt="icon"
                  />
                </GsapMagnetic>
              ))}
            </div>
          </div>
        </div>
        <div className="box_2 col-lg-5">
          <div className="opentowork">
            <span className="dot">
              <p className="blink1"></p>
              <p className="blink3"></p>
            </span>

            <p>OPEN TO WORK</p>
          </div>
          <h2>
            <img className="mail_icon" src={mail_icon} alt="mail_icon" />{" "}
            codewithmr.pk@gmail.com
          </h2>
          <h1>
            <img className="call_icon" src={call_icon} alt="call_icon" /> +92
            316 6459495
          </h1>
        </div>
      </div>
      <h5>COPYRIGHT © CODEWITHMR, 2024. ALL RIGHTS RESERVED.</h5>
    </div>
  );
};

export default Contact;
