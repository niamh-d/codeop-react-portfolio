import React, { useRef, useState } from "react";

import { useProjects } from "../../contexts/ProjectsContext";

import Card from "../Card";
import Project from "../Project";
import Modal from "../Modal";

const URL = "https://images.unsplash.com/photo-1561037404-61cd46aa615b";

const AddProjectView = () => {
  const { dispatch, addProject } = useProjects();

  const titleRef = useRef("Waiting for your title");
  const sourceRef = useRef(URL);
  const descriptionRef = useRef("Waiting for your description");

  const formDetailsObj = {
    title: titleRef.current,
    source: sourceRef.current,
    description: descriptionRef.current,
  };

  const [detailsObj, setDetailsObj] = useState(formDetailsObj);

  const onInputsChangeHandler = () => {
    const title =
      titleRef.current.value.replaceAll(" ", "") === ""
        ? "Waiting for your title"
        : titleRef.current.value;
    const description =
      descriptionRef.current.value.replaceAll(" ", "") === ""
        ? "Waiting for your description"
        : descriptionRef.current.value;
    const source =
      sourceRef.current.value.replaceAll(" ", "") === ""
        ? URL
        : sourceRef.current.value;

    setDetailsObj({
      title: title,
      source: source,
      description: description,
    });
  };

  const addNewProjectHandler = (e) => {
    e.preventDefault();
    const newId = Date.now().toString();

    addProject({ id: newId, ...detailsObj });

    document.getElementById("modal_add").showModal();
  };

  const onExitAddNewProjectView = () =>
    dispatch({ type: "closeAddProjectView" });

  return (
    <>
      <Modal
        onClickHandler={onExitAddNewProjectView}
        modalId="modal_add"
        heading="Success!"
        messageText="Your project has been added. Press the button to return to gallery."
      />

      <div className="flex flex-col">
        <h1 className="text-2xl mb-10">Add new project</h1>
        <div className="flex items-start gap-16 edit-project-container">
          <form
            className="form flex items-start flex-col gap-5"
            onSubmit={addNewProjectHandler}
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
                placeholder="Type project title here"
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
                placeholder="Your image url or leave blank"
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
                placeholder="Type project description here"
                className="textarea textarea-accent textarea-bordered text-lg w-64 h-40"
              ></textarea>
            </div>

            <div className="mt-5 flex">
              <button
                type="submit"
                className="btn btn-primary mr-3 btn-wide"
                onClick={addNewProjectHandler}
              >
                Add new project
              </button>
              <button
                type="button"
                className="btn btn-ghost ml-10"
                onClick={() => dispatch({ type: "closeAddProjectView" })}
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

export default AddProjectView;

//https://images.unsplash.com/photo-1561037404-61cd46aa615b (dog)
//https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba (cat)
