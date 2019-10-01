import React from "react";
import { Modal } from "react-bootstrap";
import Square from "./Square";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.WIDTH = 20;
    this.HEIGHT = 20;
    this.state = {
      value: null
    };

    this.createBoardRow = this.createBoardRow.bind(this);
  }

  renderSquare(i) {
    return (
      <Square
        key={i.toString()}
        isCurrentMove={this.props.currentMove === i}
        isWinningMove={this.props.winnerSquares[i]}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  createBoardRow = () => {
    var rows = [];
    var childrens = [];
    var count = 0;
    for (var i = 0; i < this.WIDTH * this.HEIGHT; i++) {
      childrens.push(this.renderSquare(i));
      if ((i + 1) % this.WIDTH === 0) {
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

  render() {
    let status;
    const currentPlayer = parseInt(this.props.xIsNext ? 1 : 2);
    const currentTick = this.props.xIsNext ? "X" : "O";

    const anotherPlayer = parseInt(!this.props.xIsNext ? 1 : 2);
    const anotherTick = !this.props.xIsNext ? "X" : "O";

    const isEndedGame = !this.props.winnerSquares.every(
      element => element === null
    );

    if (!this.props.isEnded) {
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
            <button className="btn btn-primary" onClick={this.props.resetGame}>
              Play Again?
            </button>
            <button
              className="btn btn-danger"
              onClick={this.props.keepStateWinning}
            >
              Close
            </button>
          </Modal.Footer>
        </Modal>

        <div className="d-flex justify-content-around pb-5">
          <button className="btn btn-info dh-btn" onClick={this.props.prevTurn}>
            Previous
          </button>

          <button className="btn btn-info dh-btn" onClick={this.props.nextTurn}>
            Next
          </button>

          <button
            className="btn btn-danger dh-btn"
            onClick={this.props.resetGame}
          >
            Reset
          </button>
          <div>
            <h5>Player 1 - X</h5>
            <h5>Player 2 - O</h5>
          </div>
        </div>
        <h3 className="pb-4">{status}</h3>

        {this.createBoardRow()}
      </div>
    );
  }
}

export default Board;
