import React from "react";

import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import Tooltip from "@mui/material/Tooltip";
import { pink } from "@mui/material/colors";

import { useProjects } from "../contexts/ProjectsContext";

const FavouredProject = () => {
  const { projects, favouredProjectId, dispatch } = useProjects();

  const [project] = projects.filter((proj) => proj.id === favouredProjectId);

  const onFavourHandler = () =>
    dispatch({ type: "favourProject", payload: project.id });

  return (
    <div className="favourite-box h-center mb-12">
      <div>
        <div className="title-box">
          <Tooltip title="Unfavour">
            <HeartBrokenIcon
              sx={{ color: pink[500] }}
              onClick={onFavourHandler}
            />
          </Tooltip>
          <h2>{project.title}</h2>
        </div>
        <img className="pd-5" src={project.source} />
      </div>
      <div className="favourite-text-box">
        <p className="mt-3 first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left text-justify">
          {project.description}
        </p>
      </div>
    </div>
  );
};

export default FavouredProject;
