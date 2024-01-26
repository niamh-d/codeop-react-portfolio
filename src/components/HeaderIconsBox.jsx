import React from "react";
import Tooltip from "@mui/material/Tooltip";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

import { useProjects } from "../contexts/ProjectsContext";

const HeaderIconsBox = () => {
  const { dispatch } = useProjects();

  const onEnableEditor = () => dispatch({ type: "enableEditor" });

  return (
    <div className="flex gap-3">
      <Tooltip title="Add new project">
        <AddCircleIcon onClick={onEnableEditor} />
      </Tooltip>
      <Tooltip title="Enable editor mode">
        <ModeEditOutlineOutlinedIcon onClick={onEnableEditor} />
      </Tooltip>
    </div>
  );
};

export default HeaderIconsBox;
