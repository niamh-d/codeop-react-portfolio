import React from "react";

import { useProjects } from "../../contexts/ProjectsContext";
import styles from "./EditProjectView.module.css";

const EditProjectView = () => {
  const { projectBeingEditedId: id, projects } = useProjects();

  const [project] = projects.filter((project) => project.id === id);

  return (
    <div className="container-editor">
      <div>
        <h2>Edit details of Project "{project.title}"</h2>
        <form>
          <div className={styles["input-box"]}>
            <p>
              <label for="title">Title:</label>
              <input id="title"></input>
            </p>
            <p>
              <label for="source">Image url:</label>
              <input id="source"></input>
            </p>
            <p>
              <label for="description">Description:</label>
              <textarea id="description"></textarea>
            </p>
          </div>
        </form>
      </div>
      <img src={project.source} />
    </div>
  );
};

export default EditProjectView;
