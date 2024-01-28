/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer, useEffect } from "react";

const ProjectsContext = createContext();

const BASE_URL = "http://localhost:9000";

const initialState = {
  projects: [],
  activeView: "welcome", // "welcome", "gallery", "edit-project", "add-project"
  isDark: false,
  isEditorMode: false,
  projectBeingEditedId: "",
  isError: false,
  favouredProjectId: null,
  projectToDeleteId: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        activeView: "gallery",
        isEditorMode: false,
      };
    case "logOut":
      return {
        ...state,
        isEditorMode: false,
        activeView: "welcome",
      };
    case "enableEditorMode":
      return {
        ...state,
        isEditorMode: true,
      };
    case "disableEditorMode":
      return {
        ...state,
        isEditorMode: false,
        activeView: "gallery",
      };
    case "openAddProjectView":
      return {
        ...state,
        activeView: "add-project",
        isEditorMode: true,
      };
    case "addNewProject":
      return {
        ...state,
        isEditorMode: false,
        projects: [action.payload, ...state.projects],
      };
    case "closeAddProjectView":
      return {
        ...state,
        activeView: "gallery",
        isEditorMode: true,
      };
    case "toggleDark":
      const mode = !state.isDark;
      return {
        ...state,
        isDark: mode,
      };
    case "setDeleteId":
      return {
        ...state,
        projectToDeleteId: action.payload,
      };
    case "deleteProject":
      const favouriteId =
        state.favouredProjectId === state.projectToDeleteId
          ? null
          : state.favouredProjectId;

      return {
        ...state,
        projects: state.projects.filter(
          (project) => project.id !== state.projectToDeleteId
        ),
        favouredProjectId: favouriteId,
        projectToDeleteId: null,
      };
    case "favourProject":
      const favouredId =
        state.favouredProjectId === action.payload ? null : action.payload;
      return {
        ...state,
        favouredProjectId: favouredId,
      };
    case "openEditProjectView":
      return {
        ...state,
        activeView: "edit-project",
        projectBeingEditedId: action.payload,
      };
    case "editProject":
      const projIndex = state.projects.indexOf(
        state.projects.find(
          (project) => project.id === state.projectBeingEditedId
        )
      );

      return {
        ...state,
        projects: [
          ...state.projects.filter((_, i) => i < projIndex),
          action.payload,
          ...state.projects.filter((_, i) => i > projIndex),
        ],
      };
    case "closeEditProjectView":
      return {
        ...state,
        activeView: "gallery",
        isEditorMode: true,
        projectBeingEditedId: null,
      };
    case "projectsReceived":
      return {
        ...state,
        projects: action.payload,
        isError: false,
      };
    case "rejected":
      return {
        ...state,
        isError: true,
        errorMessage: action.payload,
      };
    default:
      throw new Error("Unknown action type");
  }
}

function ProjectsProvider({ children }) {
  const [
    {
      projects,
      activeView,
      isDark,
      isEditorMode,
      projectBeingEditedId,
      errorMessage,
      isError,
      favouredProjectId,
      projectToDeleteId,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    async function fetchProjects() {
      try {
        const res = await fetch(`${BASE_URL}/projects`);
        const data = await res.json();
        dispatch({ type: "projectsReceived", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading projects 😢",
        });
      }
    }
    fetchProjects();
  }, []);

  async function addProject(newProject) {
    try {
      const res = await fetch(`${BASE_URL}/projects/`, {
        method: "POST",
        body: JSON.stringify(newProject),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "addNewProject", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating the project...",
      });
    }
  }

  async function editProject(project) {
    try {
      const res = await fetch(`${BASE_URL}/projects/${project.id}`, {
        method: "PUT",
        body: JSON.stringify(project),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "editProject", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error editing the project...",
      });
    }
  }

  async function deleteProject() {
    try {
      await fetch(`${BASE_URL}/projects/${projectToDeleteId}`, {
        method: "DELETE",
        body: null,
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch({ type: "deleteProject" });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the project...",
      });
    }
  }

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        dispatch,
        activeView,
        isDark,
        isEditorMode,
        projectBeingEditedId,
        errorMessage,
        isError,
        addProject,
        editProject,
        deleteProject,
        favouredProjectId,
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
