import React, { Component } from "react";
// import Board from "../Board/Board";
// import Log from "../Log/Log";
import { connect } from "react-redux";
import * as actionTypes from "../../actions/actionType";
import "./Chat.css";
import socketIOClient from "socket.io-client";

class OnlineModeGame extends Component {
  componentWillMount() {
    this.props.resetGame();
  }

  render() {
    return (
      <div classNameName="App">
        <div className="dh-container-chat bg-dark">
          <div id="frame">
            <div id="sidepanel">
              <div id="profile">
                <div className="wrap">
                  <image
                    id="profile-img"
                    src="http://emilcarlsson.se/assets/mikeross.png"
                    className="online"
                    alt=""
                  />
                  <p>Mike Ross</p>
                  <i
                    className="fa fa-chevron-down expand-button"
                    aria-hidden="true"
                  ></i>
                  <div id="status-options">
                    <ul>
                      <li id="status-online" className="active">
                        <span className="status-circle"></span> <p>Online</p>
                      </li>
                      <li id="status-away">
                        <span className="status-circle"></span> <p>Away</p>
                      </li>
                      <li id="status-busy">
                        <span className="status-circle"></span> <p>Busy</p>
                      </li>
                      <li id="status-offline">
                        <span className="status-circle"></span> <p>Offline</p>
                      </li>
                    </ul>
                  </div>
                  <div id="expanded">
                    <label for="twitter">
                      <i
                        className="fa fa-facebook fa-fw"
                        aria-hidden="true"
                      ></i>
                    </label>
                    <input name="twitter" type="text" value="mikeross" />
                    <label for="twitter">
                      <i className="fa fa-twitter fa-fw" aria-hidden="true"></i>
                    </label>
                    <input name="twitter" type="text" value="ross81" />
                    <label for="twitter">
                      <i
                        className="fa fa-instagram fa-fw"
                        aria-hidden="true"
                      ></i>
                    </label>
                    <input name="twitter" type="text" value="mike.ross" />
                  </div>
                </div>
              </div>
              <div id="search">
                <label for="">
                  <i className="fa fa-search" aria-hidden="true"></i>
                </label>
                <input type="text" placeholder="Search contacts..." />
              </div>
              <div id="contacts">
                <ul>
                  <li className="contact">
                    <div className="wrap">
                      <span className="contact-status online"></span>
                      <image
                        src="http://emilcarlsson.se/assets/louislitt.png"
                        alt=""
                      />
                      <div className="meta">
                        <p className="name">Louis Litt</p>
                        <p className="preview">You just got LITT up, Mike.</p>
                      </div>
                    </div>
                  </li>
                  <li className="contact active">
                    <div className="wrap">
                      <span className="contact-status busy"></span>
                      <image
                        src="http://emilcarlsson.se/assets/harveyspecter.png"
                        alt=""
                      />
                      <div className="meta">
                        <p className="name">Harvey Specter</p>
                        <p className="preview">
                          Wrong. You take the gun, or you pull out a bigger one.
                          Or, you call their bluff. Or, you do any one of a
                          hundred and forty six other things.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="contact">
                    <div className="wrap">
                      <span className="contact-status away"></span>
                      <image
                        src="http://emilcarlsson.se/assets/rachelzane.png"
                        alt=""
                      />
                      <div className="meta">
                        <p className="name">Rachel Zane</p>
                        <p className="preview">
                          I was thinking that we could have chicken tonight,
                          sounds good?
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="contact">
                    <div className="wrap">
                      <span className="contact-status"></span>
                      <image
                        src="http://emilcarlsson.se/assets/haroldgunderson.png"
                        alt=""
                      />
                      <div className="meta">
                        <p className="name">Harold Gunderson</p>
                        <p className="preview">Thanks Mike! :)</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div id="bottom-bar">
                <button id="addcontact">
                  <i className="fa fa-user-plus fa-fw" aria-hidden="true"></i>{" "}
                  <span>Add contact</span>
                </button>
                <button id="settings">
                  <i className="fa fa-cog fa-fw" aria-hidden="true"></i>{" "}
                  <span>Settings</span>
                </button>
              </div>
            </div>
            <div className="content">
              <div className="contact-profile">
                <image
                  src="http://emilcarlsson.se/assets/harveyspecter.png"
                  alt=""
                />
                <p>Harvey Specter</p>
                <div className="social-media">
                  <i className="fa fa-facebook" aria-hidden="true"></i>
                  <i className="fa fa-twitter" aria-hidden="true"></i>
                  <i className="fa fa-instagram" aria-hidden="true"></i>
                </div>
              </div>
              <div className="messages">
                <ul>
                  <li className="sent">
                    <image
                      src="http://emilcarlsson.se/assets/mikeross.png"
                      alt=""
                    />
                    <p>
                      What are you talking about? You do what they say or they
                      shoot you.
                    </p>
                  </li>
                  <li className="replies">
                    <image
                      src="http://emilcarlsson.se/assets/harveyspecter.png"
                      alt=""
                    />
                    <p>
                      Wrong. You take the gun, or you pull out a bigger one. Or,
                      you call their bluff. Or, you do any one of a hundred and
                      forty six other things.
                    </p>
                  </li>
                </ul>
              </div>
              <div className="message-input">
                <div className="wrap">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Write your message..."
                  />
                  <button className="submit btn">
                    <i className="fa fa-paper-plane" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    history: state.games.history,
    logMoves: state.games.logMoves,
    positions: state.games.positions,
    currentIndex: state.games.currentIndex,
    xIsNext: state.games.xIsNext,
    isEnded: state.games.isEnded,
    winnerSquares: state.games.winnerSquares
  };
};

const mapDispatchToProps = dispatch => {
  return {
    chooseMove: (index, logs) =>
      dispatch({
        type: actionTypes.CHOOSE_MOVE,
        index: index,
        logs: logs
      }),
    computerChooseMove: (index, logs) =>
      dispatch({
        type: actionTypes.COMPUTER_CHOOSE_MOVE,
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
)(OnlineModeGame);
