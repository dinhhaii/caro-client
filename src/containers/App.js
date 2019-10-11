import React, { Component } from "react";
import Board from "../components/Board/Board";
import Log from "../components/Log/Log";
import { connect } from "react-redux";
import "./App.css";
import * as actionTypes from "../actions/actions";

class App extends Component {
  render() {
    const history = this.props.history.slice();
    const current = history[this.props.currentIndex];
    const currentMove = this.props.positions[this.props.currentIndex];

    return (
      <div className="App">
        <div className="container-fluid pt-5 bg-dark">
          <div className="row mb-5 d-flex flex-column">
            <h3>Caro</h3>
            <h4>Vũ Đình Hải - 1612167</h4>
          </div>
          <div className="row">
            <div className="col-3 col-7 pb-5 d-flex justify-content-end">
              <div className="game">
                <div className="game-board">
                  <Board
                    squares={current.squares}
                    currentMove={currentMove}
                    winnerSquares={this.props.winnerSquares}
                    onClick={i => this.props.onChooseAMove(i, this.refs.logs)}
                    xIsNext={this.props.xIsNext}
                    isEnded={this.props.isEnded}
                    resetGame={this.props.resetGame}
                    prevTurn={() => this.props.prevTurn(this.refs.logs)}
                    nextTurn={() => this.props.nextTurn(this.refs.logs)}
                    keepStateWinning={this.props.keepStateWinning}
                  />
                </div>
              </div>
            </div>

            <div className="col-5">
              <div
                className="d-flex justify-content-start flex-column dh-log-container"
                ref="logs"
              >
                {this.props.history.map((value, index) => {
                  return this.renderLog(index);
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderLog = i => {
    return (
      <Log
        key={i.toString()}
        step={i}
        isSelected={this.props.currentIndex !== i}
        onClick={() => this.props.jumpMove(i, this.refs.logs)}
      />
    );
  };
}

const mapStateToProps = state => {
  return {
    history: state.reducer.history,
    logMoves: state.reducer.logMoves,
    positions: state.reducer.positions,
    currentIndex: state.reducer.currentIndex,
    xIsNext: state.reducer.xIsNext,
    isEnded: state.reducer.isEnded,
    winnerSquares: state.reducer.winnerSquares
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChooseAMove: (index, logs) =>
      dispatch({
        type: actionTypes.CHOOSE_MOVE,
        index: index,
        logs: logs
      }),
    prevTurn: logs => dispatch({ type: actionTypes.PREVIOUS_TURN, logs: logs }),
    nextTurn: logs => dispatch({ type: actionTypes.NEXT_TURN, logs: logs }),
    resetGame: () => dispatch({ type: actionTypes.RESET_GAME }),
    keepStateWinning: () => dispatch({ type: actionTypes.KEEP_STATE_WINNING }),
    jumpMove: (index, logs) =>
      dispatch({ type: actionTypes.JUMP_MOVE, index: index, logs: logs })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
