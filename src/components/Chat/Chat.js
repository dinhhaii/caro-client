import React, { Component } from "react";
import { connect } from "react-redux";
import { sendData, receiveData } from "../../actions/chat-actions";
import "./Chat.css";

class Chat extends Component {
  send = data => {
    this.props.socket.emit("chat", data);
    this.props.sendData(data);
  };

  receive = data => {
    this.props.receiveData(data);
  };

  componentDidMount() {
    this.props.socket.on("chat", data => {
      this.props.receiveData(data);
    });
  }

  render() {
    return (
      <div classNameName="App">
        <div className="dh-container-chat bg-dark">
          <div id="frame">
            <div id="sidepanel">
              <div id="profile">
                <div className="wrap">
                  <img
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
                      <img
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
                      <img
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
                      <img
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
                      <img
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
                <button className="btn" id="addcontact">
                  <i className="fa fa-user-plus fa-fw" aria-hidden="true"></i>
                  <span>Add contact</span>
                </button>
                <button className="btn" id="settings">
                  <i className="fa fa-cog fa-fw" aria-hidden="true"></i>
                  <span>Settings</span>
                </button>
              </div>
            </div>
            <div className="content">
              <div className="contact-profile">
                <img
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
                  {this.props.chatHistory.map((value, index) => {
                    return (
                      <li key={index} className={value.target}>
                        <img
                          src="http://emilcarlsson.se/assets/mikeross.png"
                          alt=""
                        />
                        <p>{value.content}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="message-input">
                <div className="wrap">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Write your message..."
                  />
                  <button
                    className="submit btn"
                    onClick={() => this.send("HELLO")}
                  >
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
    chatHistory: state.chat.chatHistory,
    socket: state.sockets.socket
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendData: data => dispatch(sendData(data)),
    receiveData: data => dispatch(receiveData(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
