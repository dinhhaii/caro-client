import React from "react";

class Log extends React.Component {
  render() {
    const step = this.props.step;
    const desc = step ? "Go to move #" + step : "Go to game start";
    return (
      <button
        className="btn dh-btn-log btn-warning"
        onClick={this.props.onClick}
      >
        {`${step}. ${desc}`}
      </button>
    );
  }
}

export default Log;
