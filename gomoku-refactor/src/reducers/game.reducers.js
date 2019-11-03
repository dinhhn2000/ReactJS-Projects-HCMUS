import {
    SAVE_MOVE,
    REDO_MOVE,
    UNDO_MOVE,
    CREATE_CHESS_BOARD
} from '../actions/game.actions'

const initialState = {
    chessBoard: null,
    moves: [],
    currentMoveIndex: 0,
    xIsNext: true
}

export default function gameReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_CHESS_BOARD:
            return {
                ...state,
                chessBoard: Array.from(Array(action.chessBoardSize), () =>
                    new Array(action.chessBoardSize).fill(null))
            }
        case SAVE_MOVE:
            if (state.currentMoveIndex !== state.moves.length) {
                let currentChessBoard = state.chessBoard;
                let moves = state.moves;
                let currentMove = state.currentMoveIndex;
                for (let i = currentMove; i < moves.length; i++) {
                    currentChessBoard[moves[i].row][moves[i].col] = null;
                }
                moves.length = currentMove;
            }

            const newChessBoard = state.chessBoard;
            newChessBoard[action.newMove.row][action.newMove.col] = action.newMove.Player;
            return {
                ...state,
                moves: [...state.moves, action.newMove],
                currentMoveIndex: state.currentMoveIndex + 1,
                chessBoard: newChessBoard,
                xIsNext: !state.xIsNext
            }
        case REDO_MOVE:
            return {
                ...state,
                currentMoveIndex: state.currentMoveIndex + 1,
                xIsNext: !state.xIsNext
            }
        case UNDO_MOVE:
            return {
                ...state,
                currentMoveIndex: state.currentMoveIndex - 1,
                xIsNext: !state.xIsNext
            }
        default:
            return state;
    }
}

export const getChessBoard = state => {
    if (state.gameReducer.chessBoard === null)
        return state.gameReducer.chessBoard;
    let currentChessBoard = state.gameReducer.chessBoard;
    let moves = state.gameReducer.moves;
    let currentMove = state.gameReducer.currentMoveIndex;
    for (let i = 0; i < moves.length; i++) {
        if (i < currentMove)
            currentChessBoard[moves[i].row][moves[i].col] = moves[i].Player;
        else
            currentChessBoard[moves[i].row][moves[i].col] = null;
    }
    return currentChessBoard;
};
export const getCurrentMoveIndex = state => state.gameReducer.currentMoveIndex;
export const getMoves = state => state.gameReducer.moves;
export const getXIsNext = state => state.gameReducer.xIsNext;