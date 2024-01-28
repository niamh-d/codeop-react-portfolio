import React from "react";

import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import Tooltip from "@mui/material/Tooltip";
import { pink } from "@mui/material/colors";

import { useProjects } from "../contexts/ProjectsContext";

const ProjectIconsBox = ({
  onDeleteHandler,
  onEditHandler,
  onFavourHandler,
  isFavoured,
}) => {
  const { isEditorMode } = useProjects();

  return (
    <div className="flex flex-end">
      <div className="icons-box">
        {!isEditorMode && (
          <>
            {isFavoured && (
              <Tooltip title="Unfavour">
                <HeartBrokenIcon
                  onClick={onFavourHandler}
                  sx={{ color: pink[500] }}
                />
              </Tooltip>
            )}
            {!isFavoured && (
              <Tooltip title="Select as Favourite">
                <FavoriteBorderOutlinedIcon onClick={onFavourHandler} />
              </Tooltip>
            )}
          </>
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
    </div>
  );
};

export default ProjectIconsBox;
