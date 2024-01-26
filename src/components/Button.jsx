import React from "react";

const Button = ({ type, text, handleClick }) => {
  const classes = `btn ${type}`;
  return (
    <button className={classes} onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
