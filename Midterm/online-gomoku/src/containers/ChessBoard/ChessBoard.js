import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createChessBoard, saveMove, winnerMove, restartGame } from '../../actions/game.actions'
import {
    getChessBoard,
    getMoves,
    getCurrentMoveIndex,
    getXIsNext,
    getWinnerMoves
} from '../../reducers/game.reducers'
import './ChessBoard.css'
import Cell from '../../components/ChessBoardCell/Cell';
import CheckWinner from './CheckWinner'

const ai = require('gomokuai');
const CHESS_SIZE = 20;
const userId = sessionStorage.getItem('userId');

class ChessBoard extends Component {
    constructor(props) {
        super(props);
        props.createChessBoard(CHESS_SIZE);
        this.state = {
            xIsNext: this.props.xIsNext,
            isWaiting: true,
        }
        
    }

    componentDidMount() {
        this.props.createChessBoard(CHESS_SIZE);
    }

    addNewMove(row, col) {
        // Add player's move
        const newMove = {
            Player: this.props.xIsNext ? 'X' : 'O',
            row,
            col
        }
        this.props.saveMove(newMove);

        // Check game over
        let checkPlayerWin = CheckWinner(row, col, this.props.chessBoard, this.props.xIsNext ? 'X' : 'O');
        if (checkPlayerWin) {
            this.announceWinner(checkPlayerWin);
        }

        if (this.props.mode !== 'duel') {
            // Add bot's move
            // Convert chessboard into array
            let bot = [];
            for (let i = 0; i < CHESS_SIZE; i++)
                for (let j = 0; j < CHESS_SIZE; j++) {
                    if (this.props.chessBoard[j][i] === 'X')
                        bot.push(1);
                    if (this.props.chessBoard[j][i] === 'O')
                        bot.push(2);
                    if (this.props.chessBoard[j][i] === null)
                        bot.push(0);
                }
            const nextMove = ai.bestMove(bot, CHESS_SIZE);
            const botMove = {
                Player: !this.props.xIsNext ? 'X' : 'O',
                row: nextMove.x,
                col: nextMove.y
            }
            this.props.saveMove(botMove);

            // Check game over
            let checkBotWin = CheckWinner(nextMove.x, nextMove.y, this.props.chessBoard, !this.props.xIsNext ? 'X' : 'O');
            if (checkBotWin) {
                this.announceWinner(checkBotWin);
            }
        } else {
            let data = {
                id: userId,
                row,
                col,
                roomId: sessionStorage.getItem('roomId')
            }
            this.props.socketIO.emit('cNewMove', data);
            this.setState({
                isDiabled: !this.state.isDiabled
            })
        }
    }

    checkWinner(moves, i, j) {
        for (let k = 0; k < moves.length; k++)
            if (moves[k].i === i && moves[k].j === j)
                return true;
        return false
    }

    announceWinner(winnerMove) {
        this.props.winnerMove(winnerMove);
        return setTimeout(() => {
            let alertStr = this.props.xIsNext ? 'O is the winner' : 'X is the winner';
            alert(`${alertStr}. Play with rival again?`);
            // if (this.props.mode !== 'duel') {
                this.props.restartGame();
                this.props.createChessBoard(CHESS_SIZE);
            // }
            // else {

            // }
        }, 1);
    }

    render() {
        const { chessBoard, winnerMoves } = this.props;

        return (
            <div className="chessBoard">
                {chessBoard !== null && chessBoard.map((row, rowIndex) => (
                    <div className="chessBoardRow" key={rowIndex}>
                        {row.map((col, colIndex) => (
                            <Cell
                                isDiabled={this.props.isFirst === this.props.xIsNext}
                                winnerMove={this.checkWinner(winnerMoves, rowIndex, colIndex)}
                                key={rowIndex * CHESS_SIZE + colIndex}
                                value={chessBoard[rowIndex][colIndex]}
                                onClick={() => this.addNewMove(rowIndex, colIndex)}
                            />
                        ))}
                    </div>
                ))}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    moves: getMoves(state),
    chessBoard: getChessBoard(state),
    currentMoveIndex: getCurrentMoveIndex(state),
    xIsNext: getXIsNext(state),
    winnerMoves: getWinnerMoves(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    createChessBoard,
    saveMove,
    winnerMove,
    restartGame
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChessBoard);
