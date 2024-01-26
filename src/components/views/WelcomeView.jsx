import React, { useEffect } from "react";

import Button from "../Button";

import styles from "./WelcomeView.module.css";

import { useProjects } from "../../contexts/ProjectsContext";

const WelcomeView = () => {
  useEffect(function () {
    const randIndex = Math.floor(Math.random() * 5);
    const imagesArr = [
      "couple-sea",
      "woman-camera",
      "kid-playing",
      "dog",
      "man-garden",
    ];

    const selectedImage = imagesArr[randIndex];

    document.documentElement.setAttribute("data-welcome-image", selectedImage);
  }, []);

  const { dispatch } = useProjects();

  const onLogIn = () => {
    dispatch({ type: "logIn" });
  };

  return (
    <div className={styles["welcome-screen"]}>
      <div className={styles["text-container"]}>
        <h1 className="text-5xl mb-11">Welcome to Portfolio Editor!</h1>
        <Button type="btn-primary" text="Log In" handleClick={onLogIn} />
      </div>
    </div>
  );
};

export default WelcomeView;
