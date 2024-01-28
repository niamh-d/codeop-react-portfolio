import React from "react";

import { useProjects } from "../../contexts/ProjectsContext";

import Card from "../Card";
import Project from "../Project";
import Error from "../../components/Error";
import WarningModal from "../WarningModal";

function GalleryView() {
  const { projects, isError, errorMessage, favouredProjectId, deleteProject } =
    useProjects();

  const onOpenDeleteModal = () => {
    document.getElementById("modal_delete").showModal();
  };

  const onDeleteProjects = () => {
    deleteProject();
  };

  return (
    <>
      <WarningModal
        onClickHandler={onDeleteProjects}
        modalId="modal_delete"
        textBtnSecondary="Yes, delete!"
      />
      {isError && <Error error={errorMessage} />}
      {!isError && (
        <div className="container-projects h-center">
          {projects.map((project) => (
            <Card
              key={project.id}
              isFavoured={project.id === favouredProjectId}
            >
              <Project
                onDeleteProjects={onOpenDeleteModal}
                data={project}
                isFavoured={project.id === favouredProjectId}
              />
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

export default GalleryView;
