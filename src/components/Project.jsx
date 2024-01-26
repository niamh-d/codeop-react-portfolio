import React from "react";

import ProjectIconsBox from "./ProjectIconsBox";

import { useProjects } from "../contexts/ProjectsContext";

const Project = ({ data }) => {
  const { dispatch } = useProjects();
  const { title, description, source, id } = data;

  const onDeleteProject = () => {
    dispatch({ type: "deleteProject", payload: id });
  };

  const onEditProject = () => {
    dispatch({ type: "editProject", payload: id });
  };

  return (
    <>
      <ProjectIconsBox
        onDeleteHandler={onDeleteProject}
        onEditHandler={onEditProject}
      />
      <div>
        <h3 className="text-lg font-bold mt-2 mb-3">{title}</h3>
        <img className="pd-5" src={source} />
        <p className="mt-3">{description}</p>
      </div>
    </>
  );
};

export default Project;
