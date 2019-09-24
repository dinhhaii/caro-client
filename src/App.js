import React from 'react';
import Board from './Board';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.WIDTH = 20;
    this.HEIGHT = 20;
    this.state = {
      history: [{
        squares: Array(this.WIDTH * this.HEIGHT).fill(null)
      }],
      currentIndex: 0,
      xIsNext: true,
      isEnded: false,
      winnerSquares: Array(this.WIDTH * this.HEIGHT).fill(null)
    };
  }

  handleClick(i) {
    if (!this.state.isEnded) {
      const history = this.state.history;
      const currentIndex = this.state.currentIndex;
      const current = history[currentIndex];
      const squares = current.squares.slice();

      if (squares[i] == null) {
        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
          history: history.splice(0,currentIndex + 1).concat([{
            squares: squares
          }]),
          currentIndex: currentIndex + 1,
          xIsNext: !this.state.xIsNext,
        });

        const line = this.calculateWinner(squares, i);
        if (line) {
          const winnerLine = this.findLine(squares, i, line);
          this.setState({
            winnerSquares: winnerLine,
            isEnded: true
          })
          return;
        }
      }
    }
  }

  findLine = (squares, index, line) => {
    var tick = squares[index];
    var result = Array(this.WIDTH * this.HEIGHT).fill(null);
    result[index] = 1;

    var pos = {
      index_top_left: index - this.WIDTH - 1,
      index_top: index - this.WIDTH,
      index_top_right: index - this.WIDTH + 1,
      index_bottom_left: index + this.WIDTH - 1,
      index_bottom: index + this.WIDTH,
      index_bottom_right: index + this.WIDTH + 1,
      index_left: index - 1,
      index_right: index + 1,
    }
    
    switch (line) {
      case 1:
        for (let i = 1; i <= 4; i++) {
          if (tick === squares[pos.index_top]) { result[pos.index_top] = 1; pos.index_top -= this.WIDTH; }
          if (tick === squares[pos.index_bottom]) { result[pos.index_bottom] = 1; pos.index_bottom += this.WIDTH; }
        }
        break;
      case 2:
        for (let i = 1; i <= 4; i++) {
          if (tick === squares[pos.index_left]) { result[pos.index_left] = 1; pos.index_left -= 1; }
          if (tick === squares[pos.index_right]) { result[pos.index_right] = 1; pos.index_right += 1; }
        }
        break;
      case 3:
        for (let i = 1; i <= 4; i++) {
          if (tick === squares[pos.index_top_left]) { result[pos.index_top_left] = 1; pos.index_top_left -= this.WIDTH + 1; }
          if (tick === squares[pos.index_bottom_right]) { result[pos.index_bottom_right] = 1; pos.index_bottom_right += this.WIDTH + 1; }
        }
        break;
      case 4:
        for (let i = 1; i <= 4; i++) {
          if (tick === squares[pos.index_top_right]) { result[pos.index_top_right] = 1; pos.index_top_right -= this.WIDTH - 1; }
          if (tick === squares[pos.index_bottom_left]) { result[pos.index_bottom_left] = 1; pos.index_bottom_left += this.WIDTH - 1; }
        }
        break;
      default: break;
    }

    return result;
  }

  prevTurn = () => {
    const currentIndex = this.state.currentIndex;

    if(currentIndex > 0) {
      this.setState({
        currentIndex: currentIndex - 1,
        xIsNext: !this.state.xIsNext,
        isEnded: false,
        winnerSquares: Array(this.WIDTH * this.HEIGHT).fill(null)
      })
    }    
  }

  nextTurn = () => {
    const length = this.state.history.length;
    const currentIndex = this.state.currentIndex;

    if(length > 1 && currentIndex < length - 1) {
      this.setState({
        currentIndex: currentIndex + 1,
        xIsNext: !this.state.xIsNext,
        isEnded: false
      })
    }    
  }

  resetGame = () => {
    if (this.state.history.length !== 1) {
      this.setState({
        history: this.state.history.slice(0, 1),
        currentIndex: 0,
        xIsNext: true,
        isEnded: false,
        winnerSquares: Array(this.WIDTH * this.HEIGHT).fill(null)
      });
    }
  }

  keepStateWinning = () => {
    if (this.state.history.length !== 1) {
      this.setState({
        winnerSquares: Array(this.WIDTH * this.HEIGHT).fill(null)
      });
    }
  }

  calculateWinner = (squares, last_turn) => {
    const countMoves = 4;
    var index = last_turn;
    var tick = squares[index];

    //Count number of turn
    var vertical = 0;
    var horizontal = 0;
    var left_diagonal = 0;
    var right_diagonal = 0;

    var pos = {
      index_top_left: index - this.WIDTH - 1,
      index_top: index - this.WIDTH,
      index_top_right: index - this.WIDTH + 1,
      index_bottom_left: index + this.WIDTH - 1,
      index_bottom: index + this.WIDTH,
      index_bottom_right: index + this.WIDTH + 1,
      index_left: index - 1,
      index_right: index + 1,
    }

    for (var i = 1; i <= 5; i++) {
      if (tick === squares[pos.index_top]) { pos.index_top -= this.WIDTH; horizontal += 1; }
      if (tick === squares[pos.index_bottom]) { pos.index_bottom += this.WIDTH; horizontal += 1; }

      if (tick === squares[pos.index_top_right]) { pos.index_top_right -= this.WIDTH - 1; right_diagonal += 1; }
      if (tick === squares[pos.index_bottom_left]) { pos.index_bottom_left += this.WIDTH - 1; right_diagonal += 1; }

      if (tick === squares[pos.index_top_left]) { pos.index_top_left -= this.WIDTH + 1; left_diagonal += 1; }
      if (tick === squares[pos.index_bottom_right]) { pos.index_bottom_right += this.WIDTH + 1; left_diagonal += 1; }

      if (tick === squares[pos.index_left]) { pos.index_left -= 1; vertical += 1; }
      if (tick === squares[pos.index_right]) { pos.index_right += 1; vertical += 1; }

      switch(countMoves) {
        case horizontal: return 1;
        case vertical: return 2;
        case left_diagonal: return 3;
        case right_diagonal: return 4;
        default: break;
      }
    }
    return null;
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.currentIndex];

    return (
      <div className="App">
        <div className="container-fluid pt-5 bg-dark">
          <div className="row mb-5 d-flex flex-column">
            <h3>BTCN03 - Caro</h3>
            <h4>Vũ Đình Hải - 1612167</h4>
          </div>

          <div className="row pb-5 d-flex justify-content-center">
            <div className="game">
              <div className="game-board">
                <Board
                  squares={current.squares}
                  winnerSquares={this.state.winnerSquares}
                  onClick={(i) => this.handleClick(i)}
                  xIsNext={this.state.xIsNext}
                  isEnded={this.state.isEnded}
                  resetGame={this.resetGame}
                  prevTurn={this.prevTurn}
                  nextTurn={this.nextTurn}
                  keepStateWinning={this.keepStateWinning}/>
              </div>
            </div>
          </div>

        </div>
      </div>

    );
  }
}

export default App;
