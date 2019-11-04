import { HEIGHT, WIDTH } from "../../utils/constants";

export const calculateWinner = (squares, last_turn) => {
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

  for (var i = 1; i <= 4; i++) {
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

export const findLine = (squares, index, line) => {
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

export const updateState = (i, currentIndex, logs) => {
  const selectedLogClassName = "btn-warning";
  const unselectedLogClassName = "btn-dark";

  logs.children[currentIndex].classList.remove(selectedLogClassName);
  logs.children[currentIndex].classList.add(unselectedLogClassName);
  logs.children[i].classList.remove(unselectedLogClassName);
  logs.children[i].classList.add(selectedLogClassName);
};

export const calculateMoveOfUser = (squares, last_turn) => {
  var countMoves = 4;
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

  for (var i = 1; i <= 4; i++) {
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
  }
  while (countMoves !== -1) {
    switch (countMoves) {
      case horizontal:
        return { line: 1, countMoves: countMoves };
      case vertical:
        return { line: 2, countMoves: countMoves };
      case left_diagonal:
        return { line: 3, countMoves: countMoves };
      case right_diagonal:
        return { line: 4, countMoves: countMoves };
      default:
        break;
    }
    countMoves--;
  }
  return null;
};

export const findComputerMove = (squares, index, lineInfo) => {
  var tick = squares[index];

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
  if (lineInfo) {
    const { line, countMoves } = lineInfo;
    switch (line) {
      case 1:
        for (let i = 1; i <= countMoves; i++) {
          if (tick === squares[pos.index_top]) {
            pos.index_top -= WIDTH;
          }
          if (tick === squares[pos.index_bottom]) {
            pos.index_bottom += WIDTH;
          }
        }
        //RANDOM CHECK
        if (Math.floor(Math.random() * 2)) {
          if (pos.index_top > 0 && !squares[pos.index_top]) {
            return pos.index_top;
          }
          return pos.index_bottom;
        }
        if (pos.index_bottom < WIDTH * HEIGHT && !squares[pos.index_bottpm]) {
          return pos.index_bottom;
        }
        return pos.index_top;
      case 2:
        for (let i = 1; i <= countMoves; i++) {
          if (tick === squares[pos.index_left]) {
            pos.index_left -= 1;
          }
          if (tick === squares[pos.index_right]) {
            pos.index_right += 1;
          }
        }
        //RANDOM CHECK
        if (Math.floor(Math.random() * 2)) {
          if (
            pos.index_left % WIDTH !== WIDTH - 1 &&
            pos.index_left !== -1 &&
            !squares[pos.index_left]
          ) {
            return pos.index_left;
          }
          return pos.index_right;
        }
        if (
          pos.index_right % WIDTH !== 0 &&
          pos.index_right !== WIDTH * HEIGHT &&
          !squares[pos.index_right]
        ) {
          return pos.index_right;
        }
        return pos.index_left;
      case 3:
        for (let i = 1; i <= countMoves; i++) {
          if (tick === squares[pos.index_top_left]) {
            pos.index_top_left -= WIDTH + 1;
          }
          if (tick === squares[pos.index_bottom_right]) {
            pos.index_bottom_right += WIDTH + 1;
          }
        }
        //RANDOM CHECK
        if (Math.floor(Math.random() * 2)) {
          if (pos.index_top_left >= 0 && !squares[pos.index_top_left]) {
            return pos.index_top_left;
          }
          return pos.index_bottom_right;
        }
        if (
          pos.index_bottom_right <= WIDTH * HEIGHT - 1 &&
          !squares[pos.index_bottom_right]
        ) {
          return pos.index_bottom_right;
        }
        return pos.index_top_left;
      case 4:
        for (let i = 1; i <= countMoves; i++) {
          if (tick === squares[pos.index_top_right]) {
            pos.index_top_right -= WIDTH - 1;
          }
          if (tick === squares[pos.index_bottom_left]) {
            pos.index_bottom_left += WIDTH - 1;
          }
        }
        //RANDOM CHECK
        if (Math.floor(Math.random() * 2)) {
          if (
            pos.index_top_right !== WIDTH - 1 &&
            !squares[pos.index_top_right]
          ) {
            return pos.index_top_right;
          }
          return pos.index_bottom_left;
        }
        if (
          pos.index_bottom_left !== WIDTH * HEIGHT - WIDTH &&
          !squares[pos.index_bottom_left]
        ) {
          return pos.index_bottom_left;
        }
        return pos.index_top_right;
      default:
        break;
    }
  }
  var temp = Math.floor(Math.random() * WIDTH * HEIGHT);
  while (temp === index || squares[temp]) {
    temp = Math.floor(Math.random() * WIDTH * HEIGHT);
  }
  return temp;
};
