export const CREATE_CHESS_BOARD = "CREATE_CHESS_BOARD"
export const SAVE_MOVE = "SAVE_MOVE"
export const UNDO_MOVE = "UNDO_MOVE"
export const REDO_MOVE = "REDO_MOVE"
export const SET_CURRENT_MOVE = "SET_CURRENT_MOVE"
export const WINNER_MOVE = "WINNER_MOVE"
export const RESTART_GAME = "RESTART_GAME"

export function createChessBoard(chessBoardSize) {
    return {
        type: CREATE_CHESS_BOARD,
        chessBoardSize
    }
}

export function saveMove(newMove) {
    return {
        type: SAVE_MOVE,
        newMove
    }
}

export function undoMove() {
    return {
        type: UNDO_MOVE
    }
}

export function redoMove() {
    return {
        type: REDO_MOVE
    }
}

export function setCurrentMove(moveIndex) {
    return {
        type: SET_CURRENT_MOVE,
        moveIndex
    }
}

export function winnerMove(moves) {
    return {
        type: WINNER_MOVE,
        moves
    }
}

export function restartGame() {
    return {
        type: RESTART_GAME,
    }
}