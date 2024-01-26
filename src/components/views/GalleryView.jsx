import React from "react";

import { useProjects } from "../../contexts/ProjectsContext";

import Card from "../Card";
import Project from "../Project";

function GalleryView() {
  const { projects } = useProjects();

  return (
    <div className="container-projects h-center">
      {projects.map((project) => (
        <Card className="project" key={project.id}>
          <Project data={project} />
        </Card>
      ))}
    </div>
  );
}

export default GalleryView;
