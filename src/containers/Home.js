import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import Menu from "../components/Menu/Menu";
// import * as actionTypes from "../actions/actionType";

class Home extends Component {
  render() {
    return (
      <div className="dh-fill">
        {/* <header
          className="masthead"
          style={{
            backgroundImage:
              "url('https://cdn.pixabay.com/photo/2019/10/29/15/57/vancouver-4587302_960_720.jpg')"
          }}
        >
          <div className="overlay"></div>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                <div className="site-heading">
                  <h1>Clean Blog</h1>
                  <span className="subheading">
                    A Blog Theme by Start Bootstrap
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header> */}
        <div className="d-flex justify-content-around pt-5 pb-5 bg-dark">
          <Link to="/singleplayer" className="btn btn-primary">
            Single
          </Link>
          <Link to="/multiplayer" className="btn btn-danger">
            Multiplayer
          </Link>
          <Link to="/online" className="btn btn-info">
            Play Online
          </Link>
          <Link to="/" className="btn btn-warning">
            Setting
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
