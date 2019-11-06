import * as actionTypes from "../actions/actionType";
import { HEIGHT, WIDTH } from "../utils/constants";
import { updateState, calculateWinner, findLine } from "./shared/caro-game";

const initialState = {
  history: [
    {
      squares: Array(WIDTH * HEIGHT).fill(null)
    }
  ],
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
    case actionTypes.COMPUTER_CHOOSE_MOVE:
      if (!state.isEnded) {
        const history = state.history.slice();
        const currentIndex = state.currentIndex;
        const current = history[currentIndex];
        const squares = current.squares.slice();
        const selectedLogClassName = "btn-warning";
        const unselectedLogClassName = "btn-dark";

        if (squares[action.index] == null) {
          const logs = action.logs.children[currentIndex - 2];
          if (logs) {
            logs.classList.remove(selectedLogClassName);
            logs.classList.add(unselectedLogClassName);
          }
          squares[action.index] = state.xIsNext ? "X" : "O";

          state = {
            ...state,
            history: history
              .splice(0, currentIndex + 1)
              .concat([{ squares: squares }]),
            positions: state.positions
              .splice(0, currentIndex + 1)
              .concat(action.index),
            currentIndex: currentIndex + 1,
            xIsNext: !state.xIsNext
          };

          const line = calculateWinner(squares, action.index);
          if (line) {
            const winnerLine = findLine(squares, action.index, line);
            return {
              ...state,
              winnerSquares: winnerLine,
              isEnded: true
            };
          }
        }
      }
      break;
    case actionTypes.CHOOSE_MOVE:
      if (!state.isEnded) {
        const history = state.history.slice();
        const currentIndex = state.currentIndex;
        const current = history[currentIndex];
        const squares = current.squares.slice();
        const selectedLogClassName = "btn-warning";
        const unselectedLogClassName = "btn-dark";

        if (squares[action.index] == null) {
          const logs = action.logs;
          if (logs) {
            logs.children[currentIndex].classList.remove(selectedLogClassName);
            logs.children[currentIndex].classList.add(unselectedLogClassName);
          }
          squares[action.index] = state.xIsNext ? "X" : "O";

          state = {
            ...state,
            history: history
              .splice(0, currentIndex + 1)
              .concat([{ squares: squares }]),
            positions: state.positions
              .splice(0, currentIndex + 1)
              .concat(action.index),
            currentIndex: currentIndex + 1,
            xIsNext: !state.xIsNext
          };

          const line = calculateWinner(squares, action.index);
          if (line) {
            const winnerLine = findLine(squares, action.index, line);
            return {
              ...state,
              winnerSquares: winnerLine,
              isEnded: true
            };
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

export default reducer;
