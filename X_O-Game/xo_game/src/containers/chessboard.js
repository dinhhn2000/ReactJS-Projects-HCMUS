import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Cell from '../components/Cell/cell';
import './styles.css';
import checkWin from '../components/ChessBoard/checkCondition';
import HistoryBoard from '../components/History/history_selection';
import * as moveActions from '../actions/moveActions';

class ChessBoard extends Component {
  constructor (props) {
    super (props);
    this.state = {
      cells: Array.from (Array (this.props.CHESS_SIZE_ROW), () =>
        new Array (this.props.CHESS_SIZE_COL).fill (null)
      ),
      xIsNext: true,
      moves: props.moves.moveAction,
      currentMove: null,
      winnerMoves: [],
    };
    this.renderChessBoardCoordinate = this.renderChessBoardCoordinate.bind (
      this
    );
  }

  renderChessBoardCoordinate () {
    let updateChessBoard = this.state.cells;
    for (let i = 0; i < updateChessBoard.length; i++) {
      updateChessBoard[i][0] = i.toString ();
    }
    for (let i = 0; i < updateChessBoard[0].length; i++) {
      updateChessBoard[0][i] = i.toString ();
    }
    this.setState ({cells: updateChessBoard});
  }

  componentDidMount () {
    this.renderChessBoardCoordinate ();
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    let updateChessBoard = Array.from (Array (nextProps.CHESS_SIZE_ROW), () =>
      new Array (nextProps.CHESS_SIZE_COL).fill (null)
    );
    for (let i = 0; i < updateChessBoard.length; i++) {
      updateChessBoard[i][0] = i.toString ();
    }
    for (let i = 0; i < updateChessBoard[0].length; i++) {
      updateChessBoard[0][i] = i.toString ();
    }
    if (
      prevState.cells.length !== nextProps.CHESS_SIZE_ROW ||
      prevState.cells[0].length !== nextProps.CHESS_SIZE_COL
    ) {
      return {
        cells: updateChessBoard,
        xIsNext: true,
      };
    }
    return null;
  }

  async handleClick (i, j) {
    this.renderChessBoardCoordinate ();
    const tempCells = this.state.cells.slice ();

    if (tempCells[i][j] === null) {
      tempCells[i][j] = this.state.xIsNext ? 'X' : 'O';
    } else return;

    // Get current player
    let player = this.state.xIsNext ? 'X' : 'O';

    // Check if the chessboard is in history or not
    let moves = this.props.moves.moveAction;
    if (this.state.currentMove !== null)
      if (
        this.state.currentMove.label !== moves.slice ().pop ().label &&
        moves.length > 1
      ) {
        this.props.actions.resetMove (moves.indexOf (this.state.currentMove));
        console.log ('Sliced');
      }

    // Add move to history
    // console.log (moves.length);
    let currentMove = {
      value: {player, i, j},
      label: `Move No.${moves.length} - Player: ${player} - Position: ( ${i} - ${j} )`,
    };
    await this.props.actions.addMove (currentMove);
    moves = this.props.moves.moveAction;

    await this.setState ({
      cells: tempCells,
      xIsNext: 1 - this.state.xIsNext,
      currentMove,
      moves,
    });

    // Check game over
    let resultArray = checkWin (i, j, tempCells, player);
    if (resultArray) {
      await this.setState ({winnerMoves: resultArray});

      // Cannot use await here (don't know why)
      setTimeout (() => {
        this.announceTheWinner ();
      }, 1);
    }
  }

  announceTheWinner () {
    console.log(this.props.moves.moveAction);
    
    let alertStr = this.state.xIsNext ? 'O is the winner' : 'X is the winner';
    alert (`${alertStr}. Play again?`);
    location.reload ();
  }

  async resetChessBoard (moveIndex) {
    // Reset move in redux
    await this.props.actions.resetMove (moveIndex);
    // console.log(this.props.moves.moveAction);
    
    // Reset chessboard
    let updateMoves = this.state.moves.slice (0, moveIndex + 1);
    let updateChessBoard = Array.from (Array (this.props.CHESS_SIZE_ROW), () =>
      new Array (this.props.CHESS_SIZE_COL).fill (null)
    );
    for (let i = 1; i < updateMoves.length; i++) {
      let row = updateMoves[i].value.i;
      let col = updateMoves[i].value.j;
      updateChessBoard[row][col] = updateMoves[i].value.player;
    }

    let currentMove = updateMoves.slice (-1)[0];

    await this.setState ({
      cells: updateChessBoard,
      currentMove,
      xIsNext: currentMove.value.player === 'X' ? false : true,
    });
    this.renderChessBoardCoordinate ();
  }

  render () {
    const status = 'Next player: ';
    const player = this.state.xIsNext ? 'X' : 'O';
    return (
      <div id="body">
        <HistoryBoard
          moves={this.state.moves}
          latestMove={this.state.currentMove}
          resetMoves={moveIndex => this.resetChessBoard (moveIndex)}
        />
        <div className="chessBoard">
          <div
            className="status"
            style={{color: this.state.xIsNext ? '#ed2d2d' : '#0cc938'}}
          >
            {status}{player}
          </div>
          {this.state.cells.map ((row, rowIndex) => (
            <div className="board-row" key={rowIndex}>
              {row.map ((col, colIndex) => (
                <Cell
                  key={rowIndex * this.props.CHESS_SIZE_COL + colIndex}
                  value={this.state.cells[rowIndex][colIndex]}
                  isWon={this.state.winnerMoves.some (
                    move => move.i === rowIndex && move.j === colIndex
                  )}
                  isCoordinate={rowIndex === 0 || colIndex === 0 ? true : false}
                  onClick={() => this.handleClick (rowIndex, colIndex)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    moves: state,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators (moveActions, dispatch),
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (ChessBoard);
