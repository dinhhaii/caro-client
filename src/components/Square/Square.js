import React from "react";
import "./Square.css";

const Square = props => {
  return (
    <button
      className={`square ${props.value === "X" ? " red" : " blue"} ${
        props.isCurrentMove ? " current-move" : ""
      } ${props.isWinningMove ? " winning-move" : ""}`}
      onClick={() => props.onClick()}
    >
      {props.value}
    </button>
  );
};

export default Square;
