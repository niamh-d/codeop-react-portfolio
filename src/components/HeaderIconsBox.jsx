import React from "react";
import Tooltip from "@mui/material/Tooltip";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import CollectionsIcon from "@mui/icons-material/Collections";

import { useProjects } from "../contexts/ProjectsContext";

const HeaderIconsBox = () => {
  const { dispatch, activeView, isEditorMode, isError, isLoading } =
    useProjects();

  return (
    <div className={`flex gap-3 ${isLoading || isError ? "invisible" : null}`}>
      <Tooltip title="Add new project">
        <AddCircleIcon
          className={`${activeView === "add-project" ? "invisible" : null}`}
          onClick={() => dispatch({ type: "openAddProjectView" })}
        />
      </Tooltip>

      {!isEditorMode && (
        <Tooltip title="Enable editor mode">
          <ModeEditOutlineOutlinedIcon
            onClick={() => dispatch({ type: "enableEditorMode" })}
          />
        </Tooltip>
      )}

      {isEditorMode && (
        <Tooltip title="Return to gallery mode">
          <CollectionsIcon
            onClick={() => dispatch({ type: "disableEditorMode" })}
          />
        </Tooltip>
      )}
    </div>
  );
};

export default HeaderIconsBox;
