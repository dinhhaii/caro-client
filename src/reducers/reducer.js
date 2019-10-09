import * as actionTypes from "../actions/actions";
import React from "react";
import Log from "../components/Log/Log";

const WIDTH = 20;
const HEIGHT = 20;

const initialState = {
  history: [
    {
      squares: Array(WIDTH * HEIGHT).fill(null)
    }
  ],
  logMoves: [<Log key={0} step={0} isSelected={1} />],
  positions: [null],
  currentIndex: 0,
  xIsNext: true,
  isEnded: false,
  winnerSquares: Array(WIDTH * HEIGHT).fill(null)
};

const reducer = (state = initialState, action) => {
  const length = state.history.length;
  const currentIndex = state.currentIndex;

  switch (action.type) {
    case actionTypes.CHOOSE_MOVE:
      if (!state.isEnded) {
        const history = state.history.slice();
        const currentIndex = state.currentIndex;
        const current = history[currentIndex];
        const squares = current.squares.slice();
        const selectedLogClassName = "btn-warning";
        const unselectedLogClassName = "btn-dark";

        if (squares[action.index] == null) {
          action.logs.children[state.currentIndex].classList.remove(
            selectedLogClassName
          );
          action.logs.children[state.currentIndex].classList.add(
            unselectedLogClassName
          );
          squares[action.index] = state.xIsNext ? "X" : "O";

          state = {
            ...state,
            history: history
              .splice(0, currentIndex + 1)
              .concat([{ squares: squares }]),
            logMoves: state.logMoves
              .splice(0, currentIndex + 1)
              .concat(action.renderLog(currentIndex + 1)),
            positions: state.positions
              .splice(0, currentIndex + 1)
              .concat(action.index),
            currentIndex: currentIndex + 1,
            xIsNext: !state.xIsNext
          };

          const line = calculateWinner(squares, action.index);
          if (line) {
            const winnerLine = findLine(squares, action.index, line);
            state = {
              ...state,
              winnerSquares: winnerLine,
              isEnded: true
            };
            break;
          }
        }
      }
      break;
    case actionTypes.PREVIOUS_TURN:
      if (currentIndex > 0) {
        updateState(state.currentIndex - 1, state.currentIndex, action.logs);
        return {
          ...state,
          currentIndex: currentIndex - 1,
          xIsNext: !state.xIsNext,
          isEnded: false,
          winnerSquares: Array(WIDTH * HEIGHT).fill(null)
        };
      }
      break;
    case actionTypes.NEXT_TURN:
      if (length > 1 && currentIndex < length - 1) {
        updateState(state.currentIndex + 1, state.currentIndex, action.logs);
        return {
          ...state,
          currentIndex: currentIndex + 1,
          xIsNext: !state.xIsNext,
          isEnded: false
        };
      }
      break;
    case actionTypes.RESET_GAME:
      if (state.history.length !== 1) {
        return {
          ...state,
          history: state.history.slice(0, 1),
          logMoves: state.logMoves.splice(0, 1),
          positions: state.positions.splice(0, 1),
          currentIndex: 0,
          xIsNext: true,
          isEnded: false,
          winnerSquares: Array(WIDTH * HEIGHT).fill(null)
        };
      }
      break;
    case actionTypes.KEEP_STATE_WINNING:
      if (state.history.length !== 1) {
        return {
          ...state,
          winnerSquares: Array(WIDTH * HEIGHT).fill(null)
        };
      }
      break;
    case actionTypes.JUMP_MOVE:
      updateState(action.index, state.currentIndex, action.logs);
      if (state.history.length !== 1) {
        return {
          ...state,
          currentIndex: action.index,
          xIsNext: !(action.index % 2),
          isEnded: false,
          winnerSquares: Array(WIDTH * HEIGHT).fill(null)
        };
      }
      break;
    default:
      break;
  }

  return state;
};

const updateState = (i, currentIndex, logs) => {
  const selectedLogClassName = "btn-warning";
  const unselectedLogClassName = "btn-dark";

  logs.children[currentIndex].classList.remove(selectedLogClassName);
  logs.children[currentIndex].classList.add(unselectedLogClassName);
  logs.children[i].classList.remove(unselectedLogClassName);
  logs.children[i].classList.add(selectedLogClassName);
};

// const checkEqualToCurrentIndex = i => {
//   return state.currentIndex === i;
// };

const findLine = (squares, index, line) => {
  var tick = squares[index];
  var result = Array(WIDTH * HEIGHT).fill(null);
  result[index] = 1;

  var pos = {
    index_top_left: index - WIDTH - 1,
    index_top: index - WIDTH,
    index_top_right: index - WIDTH + 1,
    index_bottom_left: index + WIDTH - 1,
    index_bottom: index + WIDTH,
    index_bottom_right: index + WIDTH + 1,
    index_left: index - 1,
    index_right: index + 1
  };

  switch (line) {
    case 1:
      for (let i = 1; i <= 4; i++) {
        if (tick === squares[pos.index_top]) {
          result[pos.index_top] = 1;
          pos.index_top -= WIDTH;
        }
        if (tick === squares[pos.index_bottom]) {
          result[pos.index_bottom] = 1;
          pos.index_bottom += WIDTH;
        }
      }
      break;
    case 2:
      for (let i = 1; i <= 4; i++) {
        if (tick === squares[pos.index_left]) {
          result[pos.index_left] = 1;
          pos.index_left -= 1;
        }
        if (tick === squares[pos.index_right]) {
          result[pos.index_right] = 1;
          pos.index_right += 1;
        }
      }
      break;
    case 3:
      for (let i = 1; i <= 4; i++) {
        if (tick === squares[pos.index_top_left]) {
          result[pos.index_top_left] = 1;
          pos.index_top_left -= WIDTH + 1;
        }
        if (tick === squares[pos.index_bottom_right]) {
          result[pos.index_bottom_right] = 1;
          pos.index_bottom_right += WIDTH + 1;
        }
      }
      break;
    case 4:
      for (let i = 1; i <= 4; i++) {
        if (tick === squares[pos.index_top_right]) {
          result[pos.index_top_right] = 1;
          pos.index_top_right -= WIDTH - 1;
        }
        if (tick === squares[pos.index_bottom_left]) {
          result[pos.index_bottom_left] = 1;
          pos.index_bottom_left += WIDTH - 1;
        }
      }
      break;
    default:
      break;
  }

  return result;
};

const calculateWinner = (squares, last_turn) => {
  const countMoves = 4;
  var index = last_turn;
  var tick = squares[index];

  //Count number of turn
  var vertical = 0;
  var horizontal = 0;
  var left_diagonal = 0;
  var right_diagonal = 0;

  var pos = {
    index_top_left: index - WIDTH - 1,
    index_top: index - WIDTH,
    index_top_right: index - WIDTH + 1,
    index_bottom_left: index + WIDTH - 1,
    index_bottom: index + WIDTH,
    index_bottom_right: index + WIDTH + 1,
    index_left: index - 1,
    index_right: index + 1
  };

  for (var i = 1; i <= 5; i++) {
    if (tick === squares[pos.index_top]) {
      pos.index_top -= WIDTH;
      horizontal += 1;
    }
    if (tick === squares[pos.index_bottom]) {
      pos.index_bottom += WIDTH;
      horizontal += 1;
    }

    if (tick === squares[pos.index_top_right]) {
      pos.index_top_right -= WIDTH - 1;
      right_diagonal += 1;
    }
    if (tick === squares[pos.index_bottom_left]) {
      pos.index_bottom_left += WIDTH - 1;
      right_diagonal += 1;
    }

    if (tick === squares[pos.index_top_left]) {
      pos.index_top_left -= WIDTH + 1;
      left_diagonal += 1;
    }
    if (tick === squares[pos.index_bottom_right]) {
      pos.index_bottom_right += WIDTH + 1;
      left_diagonal += 1;
    }

    if (tick === squares[pos.index_left]) {
      pos.index_left -= 1;
      vertical += 1;
    }
    if (tick === squares[pos.index_right]) {
      pos.index_right += 1;
      vertical += 1;
    }

    switch (countMoves) {
      case horizontal:
        return 1;
      case vertical:
        return 2;
      case left_diagonal:
        return 3;
      case right_diagonal:
        return 4;
      default:
        break;
    }
  }
  return null;
};

export default reducer;
