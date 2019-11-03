import React from 'react'
import './ChangeMoveBtn.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedoAlt, faUndoAlt } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { undoMove, redoMove } from '../../actions/game.actions'
import { getCurrentMoveIndex, getMoves } from '../../reducers/game.reducers'

function ChangeMoveBtn(props) {
    function undo() {
        props.undoMove();
    }
    function redo() {
        props.redoMove();
    }
    function checkUndo() {
        if (props.currentMoveIndex > 0)
            return true;
        else
            return false;
    }
    function checkRedo() {
        if (props.currentMoveIndex < props.moves.length)
            return true;
        else
            return false;
    }
    return (
        <div className="ChangeMoveBtn">
            <button className="UndoBtn" disabled={!checkUndo()} onClick={() => undo()}>
                <FontAwesomeIcon icon={faUndoAlt} />
            </button>
            <button className="RedoBtn" disabled={!checkRedo()} onClick={() => redo()}>
                <FontAwesomeIcon icon={faRedoAlt} />
            </button>
        </div>
    )
}

const mapStateToProps = state => ({
    currentMoveIndex: getCurrentMoveIndex(state),
    moves: getMoves(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    undoMove, redoMove
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangeMoveBtn);
