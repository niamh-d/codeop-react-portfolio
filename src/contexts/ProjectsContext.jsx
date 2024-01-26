/* eslint-disable react/prop-types */
import { FastRewind } from "@mui/icons-material";
import { createContext, useContext, useReducer } from "react";

const ProjectsContext = createContext();

const initialState = {
  projects: [],
  isLoggedIn: false,
  isDark: false,
  isEditorMode: false,
  isEditProjectView: false,
  projectBeingEditedId: "",
};

function ProjectsProvider({ children }) {
  function reducer(state, action) {
    switch (action.type) {
      case "logIn":
        return {
          ...state,
          isLoggedIn: true,
        };
      case "logOut":
        return {
          ...state,
          isLoggedIn: false,
          isEditorMode: false,
          isEditProjectView: false,
        };
      case "enableEditor":
        return {
          ...state,
          isEditorMode: true,
        };
      case "toggleDark":
        const mode = !state.isDark;
        return {
          ...state,
          isDark: mode,
        };
      case "deleteProject":
        return {
          ...state,
          projects: state.projects.filter(
            (project) => project.id !== action.payload
          ),
        };
      case "editProject":
        return {
          ...state,
          isEditProjectView: true,
          projectBeingEditedId: action.payload,
        };
      case "dataReceived":
        return {
          ...state,
          projects: action.payload,
        };
      case "dataFailed":
        throw new Error(action.payload);
      default:
        throw new Error("Action unknown");
    }
  }

  const [
    {
      projects,
      status,
      isLoggedIn,
      isDark,
      isEditorMode,
      isEditProjectView,
      projectBeingEditedId,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        dispatch,
        status,
        isLoggedIn,
        isDark,
        isEditorMode,
        isEditProjectView,
        projectBeingEditedId,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

function useProjects() {
  const context = useContext(ProjectsContext);

  if (context === undefined)
    throw new Error("ProjectsContext used outside of ProjectProvider");
  return context;
}

export { ProjectsProvider, useProjects };
