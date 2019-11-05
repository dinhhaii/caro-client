import React, { Component } from "react";
import Board from "../Board/Board";
import Log from "../Log/Log";
import Chat from "../Chat/Chat";
import Spinner from "react-spinner-material";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actionTypes from "../../actions/actionType";
// import * as constant from "../../utils/constants";
import { findPartner } from "../../actions/socket-actions";

class OnlineModeGame extends Component {
  findPlayer = () => {
    const socket = this.props.socket;
    const user = this.props.user;
    const data = { ...user, socketId: socket.id };
    this.props.findPartner(socket, data);
  };

  render() {
    const history = this.props.history.slice();
    const current = history[this.props.currentIndex];
    const currentMove = this.props.positions[this.props.currentIndex];

    if (!this.props.user.isLogin) {
      return <Redirect to="/login"></Redirect>;
    }

    return (
      <div className="App bg-dark">
        <div className="d-flex justify-content-around align-items-center">
          <button
            className="btn btn-light m-5 dh-btn-findplayer"
            onClick={this.findPlayer}
            disabled={this.props.isLoading}
          >
            FIND PLAYER
          </button>
          <Spinner
            spinnerColor={"#ff3333"}
            spinnerWidth={3}
            visible={this.props.isLoading}
          ></Spinner>
          <button
            className="btn btn-danger m-5 dh-btn-findplayer"
            onClick={() => this.props.addPartner(null)}
            disabled={!this.props.isLoading}
          >
            STOP
          </button>
        </div>

        {this.props.partner ? (
          <div>
            <div className="container-fluid pt-5 bg-dark">
              <div className="row">
                <div className="col-3 col-7 pb-5 d-flex justify-content-end">
                  <div className="game">
                    <div className="game-board">
                      <Board
                        squares={current.squares}
                        currentMove={currentMove}
                        winnerSquares={this.props.winnerSquares}
                        onClick={i =>
                          this.props.onChooseAMove(i, this.refs.logs)
                        }
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
            <Chat></Chat>{" "}
          </div>
        ) : null}
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
    history: state.games.history,
    logMoves: state.games.logMoves,
    positions: state.games.positions,
    currentIndex: state.games.currentIndex,
    xIsNext: state.games.xIsNext,
    isEnded: state.games.isEnded,
    winnerSquares: state.games.winnerSquares,
    socket: state.sockets.socket,
    partner: state.sockets.partner,
    isLoading: state.sockets.isLoading,
    user: state.users
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
      dispatch({ type: actionTypes.JUMP_MOVE, index: index, logs: logs }),
    findPartner: (socket, data) => dispatch(findPartner(socket, data)),
    addPartner: partner =>
      dispatch({ type: actionTypes.ADD_PARTNER, partner: partner })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OnlineModeGame);
