import React from "react";
import "../../Component/Projects/Projects.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { projects_box } from "../Utils/Mock/MockData";

const Projects = () => {
  return (
    <>
      <div id="projects" className="container-fluid bg-black main_projects">
        <h1>PROJECTS</h1>
        <div className="projects_wraper">
          {projects_box.map((item, index) => (
            <div key={index} className="project_1">
              <img src={item.Image} alt={item.id} />
              <a
                className="btn-2"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="btn-border"></span>
                <span className="btn-ripple">
                  <span></span>
                </span>
                <span className="btn-title">
                  <span data-text="View Work">View Work</span>
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Projects;
