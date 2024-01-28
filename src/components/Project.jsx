import React from "react";

import ProjectIconsBox from "./ProjectIconsBox";

import { useProjects } from "../contexts/ProjectsContext";

const Project = ({
  onDeleteProjects,
  data,
  isFavoured = false,
  showIcons = true,
}) => {
  const { dispatch } = useProjects();
  const { title, description, source, id } = data;

  const onEditProject = () =>
    dispatch({ type: "openEditProjectView", payload: id });
  const onFavourProject = () =>
    dispatch({ type: "favourProject", payload: id });

  const onDeleteProjectsHandler = () => {
    dispatch({ type: "setDeleteId", payload: id });
    onDeleteProjects();
  };

  return (
    <div className="project">
      {showIcons && (
        <ProjectIconsBox
          onDeleteHandler={onDeleteProjectsHandler}
          onEditHandler={onEditProject}
          onFavourHandler={onFavourProject}
          isFavoured={isFavoured}
        />
      )}
      <div>
        <h3 className="text-lg font-bold mt-5 mb-3">{title}</h3>
        <img className="pd-5" src={source} />
        <p className="mt-3">{description}</p>
      </div>
    </div>
  );
};

export default Project;
