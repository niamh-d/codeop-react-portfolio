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

  return (
    <div className={styles["welcome-screen"]}>
      <div className={styles["text-container"]}>
        <h1 className="text-5xl mb-5">Welcome to Porfolitor&trade;</h1>
        <p className="text-2xl mb-16">
          Your personal portfolio management solution
        </p>
        <Button
          type="btn-primary btn-lg text-xl"
          text="Log In"
          handleClick={() => dispatch({ type: "login" })}
        />
      </div>
    </div>
  );
};

export default WelcomeView;
