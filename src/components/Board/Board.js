import React from "react";
import { Modal } from "react-bootstrap";
import Square from "../Square/Square";
import "./Board.css";
import { WIDTH, HEIGHT } from "../../utils/constants";

const Board = props => {
  const renderSquare = i => {
    return (
      <Square
        key={i.toString()}
        isCurrentMove={props.currentMove === i}
        isWinningMove={props.winnerSquares[i]}
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
      />
    );
  };

  const createBoardRow = () => {
    var rows = [];
    var childrens = [];
    var count = 0;
    for (var i = 0; i < WIDTH * HEIGHT; i++) {
      childrens.push(renderSquare(i));
      if ((i + 1) % WIDTH === 0) {
        rows.push(
          React.createElement(
            "div",
            { className: "board-row", key: `${count.toString()}` },
            childrens
          )
        );
        count++;
        childrens = [];
      }
    }
    return rows;
  };

  let status;
  const currentPlayer = parseInt(props.xIsNext ? 1 : 2);
  const currentTick = props.xIsNext ? "X" : "O";

  const anotherPlayer = parseInt(!props.xIsNext ? 1 : 2);
  const anotherTick = !props.xIsNext ? "X" : "O";

  const isEndedGame = !props.winnerSquares.every(element => element === null);

  if (!props.isEnded) {
    status = `Player ${currentPlayer}: ${currentTick}`;
  }

  return (
    <div>
      <Modal show={isEndedGame}>
        <Modal.Header closeButton>
          <Modal.Title>Congratulation!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Player {anotherPlayer} ({anotherTick}) is the Winner
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={props.resetGame}>
            Play Again?
          </button>
          <button className="btn btn-danger" onClick={props.keepStateWinning}>
            Close
          </button>
        </Modal.Footer>
      </Modal>

      <div className="d-flex justify-content-around pb-5">
        <button className="btn btn-info dh-btn" onClick={props.prevTurn}>
          Previous
        </button>

        <button className="btn btn-info dh-btn" onClick={props.nextTurn}>
          Next
        </button>

        <button className="btn btn-danger dh-btn" onClick={props.resetGame}>
          Reset
        </button>
        <div>
          <h5 className="dh-font">Player 1 - X</h5>
          <h5 className="dh-font">Player 2 - O</h5>
        </div>
      </div>
      <h3 className="pb-4 dh-font">{status}</h3>

      {createBoardRow()}
    </div>
  );
};

export default Board;
