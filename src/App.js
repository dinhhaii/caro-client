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
      xIsNext: true,
      isEnded: false
    };
  }

  handleClick(i) {
    if (!this.state.isEnded) {
      const history = this.state.history;
      const current = history[history.length - 1];
      const squares = current.squares.slice();

      if (squares[i] == null) {
        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
          history: history.concat([{
            squares: squares
          }]),
          xIsNext: !this.state.xIsNext,
        });

        if (this.calculateWinner(squares, i)) {
          this.setState({
            isEnded: true
          })
          return;
        }
      }
    }
  }

  prevTurn = () => {
    if(this.state.history.length !== 1) {
      this.setState({
        history: this.state.history.splice(0,this.state.history.length - 1),
        xIsNext: !this.state.xIsNext,
        isEnded: false
      })
    }    
  }

  resetGame = () => {
    this.setState({
      history: this.state.history.slice(0,1),
      xIsNext: true,
      isEnded: false
    });
  }

  calculateWinner = (squares, last_turn) => {
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

      if (horizontal === 4 || vertical === 4 || left_diagonal === 4 || right_diagonal === 4) {
        return tick;
      }
    }
    return null;
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];

    return (
      <div className="App">
        <div className="container-fluid pt-5 bg-dark">
          <div className="row mb-5 d-flex flex-column">
            <h3>BTCN02 - Caro</h3>
            <h4>Vũ Đình Hải - 1612167</h4>
          </div>

          <div className="row pb-5 d-flex justify-content-center">
            <div className="game">
              <div className="game-board">
                <Board
                  squares={current.squares}
                  onClick={(i) => this.handleClick(i)}
                  xIsNext={this.state.xIsNext}
                  isEnded={this.state.isEnded}
                  resetGame={this.resetGame}
                  prevTurn={this.prevTurn}/>
              </div>
            </div>
          </div>

        </div>
      </div>

    );
  }
}

export default App;
