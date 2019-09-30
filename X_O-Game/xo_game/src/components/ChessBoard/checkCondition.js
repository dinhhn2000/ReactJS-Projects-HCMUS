export default function checkWin (i, j, ChessBoard, player) {
  let rival = player === 'X' ? 'O' : 'X';
  let countWin = 1;
  let stopCountWin = false;
  let countBlock = 0;
  let rowIndex = 0;
  let colIndex = 0;
  let resultArray = [{i, j}];

  // -------------------------Check horizontal
  // Left
  rowIndex = i;
  colIndex = j - 1;
  while (colIndex >= 0) {
    if (ChessBoard[rowIndex][colIndex] === rival) {
      countBlock++;
      break;
    }
    if (ChessBoard[rowIndex][colIndex] === player && stopCountWin === false) {
      countWin++;
      resultArray.push ({i: rowIndex, j: colIndex});
    } else stopCountWin = true;
    colIndex--;
  }
  // Right
  stopCountWin = false;
  colIndex = j + 1;
  while (colIndex < ChessBoard[0].length) {
    if (ChessBoard[rowIndex][colIndex] === rival) {
      countBlock++;
      break;
    }
    if (ChessBoard[rowIndex][colIndex] === player && stopCountWin === false) {
      countWin++;
      resultArray.push ({i: rowIndex, j: colIndex});
    } else stopCountWin = true;
    colIndex++;
  }
  // Check codition
  if (countWin > 4 && countBlock < 2) return resultArray;

  // -------------------------Check vertical
  resultArray = [{i, j}];
  countBlock = 0;
  stopCountWin = false;
  countWin = 1;
  // Up
  rowIndex = i - 1;
  colIndex = j;
  while (rowIndex >= 0) {
    if (ChessBoard[rowIndex][colIndex] === rival) {
      countBlock++;
      break;
    }
    if (ChessBoard[rowIndex][colIndex] === player && stopCountWin === false) {
      countWin++;
      resultArray.push ({i: rowIndex, j: colIndex});
    } else stopCountWin = true;
    rowIndex--;
  }
  // Down
  stopCountWin = false;
  rowIndex = i + 1;
  while (rowIndex < ChessBoard.length) {
    if (ChessBoard[rowIndex][colIndex] === rival) {
      countBlock++;
      break;
    }
    if (ChessBoard[rowIndex][colIndex] === player && stopCountWin === false) {
      countWin++;
      resultArray.push ({i: rowIndex, j: colIndex});
    } else stopCountWin = true;
    rowIndex++;
  }
  // Check codition
  if (countWin > 4 && countBlock < 2) return resultArray;

  // -------------------------Check left bias
  resultArray = [{i, j}];
  countBlock = 0;
  stopCountWin = false;
  countWin = 1;
  // Up-Left
  rowIndex = i - 1;
  colIndex = j - 1;
  while (rowIndex >= 0 && colIndex >= 0) {
    if (ChessBoard[rowIndex][colIndex] === rival) {
      countBlock++;
      break;
    }
    if (ChessBoard[rowIndex][colIndex] === player && stopCountWin === false) {
      countWin++;
      resultArray.push ({i: rowIndex, j: colIndex});
    } else stopCountWin = true;
    rowIndex--;
    colIndex--;
  }
  // Down-Right
  stopCountWin = false;
  rowIndex = i + 1;
  colIndex = j + 1;
  while (rowIndex < ChessBoard.length && colIndex < ChessBoard[0].length) {
    if (ChessBoard[rowIndex][colIndex] === rival) {
      countBlock++;
      break;
    }
    if (ChessBoard[rowIndex][colIndex] === player && stopCountWin === false) {
      countWin++;
      resultArray.push ({i: rowIndex, j: colIndex});
    } else stopCountWin = true;
    rowIndex++;
    colIndex++;
  }
  // Check codition
  if (countWin > 4 && countBlock < 2) return resultArray;

  // -------------------------Check right bias
  resultArray = [{i, j}];
  countBlock = 0;
  stopCountWin = false;
  countWin = 1;
  // Up-Right
  rowIndex = i - 1;
  colIndex = j + 1;
  while (rowIndex >= 0 && colIndex < ChessBoard[0].length) {
    if (ChessBoard[rowIndex][colIndex] === rival) {
      countBlock++;
      break;
    }
    if (ChessBoard[rowIndex][colIndex] === player && stopCountWin === false) {
      countWin++;
      resultArray.push ({i: rowIndex, j: colIndex});
    } else stopCountWin = true;
    rowIndex--;
    colIndex++;
  }
  // Down-Left
  stopCountWin = false;
  rowIndex = i + 1;
  colIndex = j - 1;
  while (rowIndex < ChessBoard.length && colIndex >= 0) {
    if (ChessBoard[rowIndex][colIndex] === rival) {
      countBlock++;
      break;
    }
    if (ChessBoard[rowIndex][colIndex] === player && stopCountWin === false) {
      countWin++;
      resultArray.push ({i: rowIndex, j: colIndex});
    } else stopCountWin = true;
    rowIndex++;
    colIndex--;
  }
  // Check codition
  if (countWin > 4 && countBlock < 2) return resultArray;

  return false;
}
