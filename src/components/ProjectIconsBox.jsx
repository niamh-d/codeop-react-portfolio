import React from "react";

import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Tooltip from "@mui/material/Tooltip";

import { useProjects } from "../contexts/ProjectsContext";

const ProjectIconsBox = ({ onDeleteHandler, onEditHandler }) => {
  const { isEditorMode } = useProjects();

  return (
    <div className="icons-box">
      {!isEditorMode && (
        <Tooltip title="Select as Favourite">
          <FavoriteBorderOutlinedIcon />
        </Tooltip>
      )}
      {isEditorMode && (
        <>
          <Tooltip title="Edit details">
            <EditOutlinedIcon onClick={onEditHandler} />
          </Tooltip>
          <Tooltip title="Delete">
            <DeleteOutlinedIcon onClick={onDeleteHandler} />
          </Tooltip>
        </>
      )}
    </div>
  );
};

export default ProjectIconsBox;
