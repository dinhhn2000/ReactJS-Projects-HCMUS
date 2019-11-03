export const CREATE_CHESS_BOARD = "CREATE_CHESS_BOARD"
export const SAVE_MOVE = "SAVE_MOVE"
export const UNDO_MOVE = "UNDO_MOVE"
export const REDO_MOVE = "REDO_MOVE"

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