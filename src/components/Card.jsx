import React from "react";

const Card = ({ children, isFavoured=false }) => {
  return (
    <>
      <div className={`card ${isFavoured ? "bg-base-200" : null}`}>
        {children}
      </div>
    </>
  );
};

export default Card;
