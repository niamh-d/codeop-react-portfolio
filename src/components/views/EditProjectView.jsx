import React, { useRef, useState } from "react";

import { useProjects } from "../../contexts/ProjectsContext";

import Card from "../Card";
import Project from "../Project";
import Modal from "../Modal";

const EditProjectView = () => {
  const { dispatch, editProject, projectBeingEditedId, projects } =
    useProjects();

  const [project] = projects.filter((proj) => proj.id === projectBeingEditedId);

  const { title, source, description } = project;

  const titleRef = useRef(title);
  const sourceRef = useRef(source);
  const descriptionRef = useRef(description);

  const formDetailsObj = {
    title,
    source,
    description,
  };

  const [detailsObj, setDetailsObj] = useState(formDetailsObj);

  const onInputsChangeHandler = () => {
    setDetailsObj({
      title: titleRef.current.value,
      source: sourceRef.current.value,
      description: descriptionRef.current.value,
    });
  };

  const onReset = () => {
    titleRef.current.value = title;
    descriptionRef.current.value = description;
    sourceRef.current.value = source;
    setDetailsObj({ title, source, description });
  };

  const editProjectHandler = (e) => {
    e.preventDefault();

    editProject({ id: projectBeingEditedId, ...detailsObj });

    document.getElementById("modal_edit").showModal();
  };

  const onExitEditProjectView = () =>
    dispatch({ type: "closeEditProjectView" });

  return (
    <>
      <Modal
        onClickHandler={onExitEditProjectView}
        modalId="modal_edit"
        heading="Success!"
        messageText="Your project has been edited. Press the button to return to gallery."
      />
      <div className="flex flex-col">
        <h1 className="text-2xl mb-5">Edit project "{project.title}"</h1>
        <button onClick={onReset} className="btn btn-ghost mb-10">
          Reset to original project details
        </button>

        <div className="flex items-start gap-16 edit-project-container">
          <form
            className="form flex items-start flex-col gap-5"
            onSubmit={editProjectHandler}
            onChange={onInputsChangeHandler}
          >
            <div className="flex flex-col gap-2 items-start">
              <label className="font-bold mb-2" htmlFor="title">
                Project Title:
              </label>
              <input
                required
                id="title"
                type="text"
                ref={titleRef}
                defaultValue={titleRef.current}
                className="input input-accent input-bordered w-full max-w-s"
              />
            </div>
            <div className="flex flex-col gap-2 items-start">
              <label className="font-bold mb-2" htmlFor="source">
                Image URL:
              </label>
              <input
                required
                type="text"
                id="source"
                ref={sourceRef}
                defaultValue={sourceRef.current}
                className="input input-accent input-bordered w-full max-w-s"
              />
            </div>
            <div className="flex flex-col gap-2 items-start">
              <label className="font-bold mb-2" htmlFor="description">
                Project Description:
              </label>
              <textarea
                ref={descriptionRef}
                required
                id="description"
                defaultValue={descriptionRef.current}
                className="textarea textarea-accent textarea-bordered text-lg w-64 h-40"
              ></textarea>
            </div>

            <div className="mt-5 flex">
              <button
                type="submit"
                className="btn btn-primary mr-3 btn-wide"
                onClick={editProjectHandler}
              >
                Edit project details
              </button>
              <button
                type="button"
                className="btn btn-ghost ml-10"
                onClick={onExitEditProjectView}
              >
                Cancel
              </button>
            </div>
          </form>
          <Card>
            <Project data={detailsObj} showIcons={false} />
          </Card>
        </div>
      </div>
    </>
  );
};

export default EditProjectView;

//https://images.unsplash.com/photo-1561037404-61cd46aa615b
