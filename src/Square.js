import React from 'react';

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    
    return ( 
      <button
        className={ `square ${this.props.value === 'X' ? " red" : " blue"} ${this.props.isCurrentMove ? ' current-move' : ""} ${this.props.isWinningMove ? " winning-move" : ""}`} onClick={() => this.props.onClick()}>
          {this.props.value}
      </button>
    );
  }
}

export default Square;