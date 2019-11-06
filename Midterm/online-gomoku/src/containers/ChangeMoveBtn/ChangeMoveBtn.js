import React, { Component } from 'react'
import './ChangeMoveBtn.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedoAlt, faUndoAlt } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { undoMove, redoMove } from '../../actions/game.actions'
import { getCurrentMoveIndex, getMoves } from '../../reducers/game.reducers'

const userId = sessionStorage.getItem('userId')
const roomId = sessionStorage.getItem('roomId');

class ChangeMoveBtn extends Component {

    componentDidMount() {
        this.props.socketIO.on('undoRequest', (playerId) => {
            if (userId !== playerId) {
                if (window.confirm('Your rival want to undo? Do you accept?')) {
                    this.props.socketIO.emit('undoAccepted', { roomId, userId });
                } else {
                    this.props.socketIO.emit('undoRefused', { roomId, userId });
                }
            }
        })
        this.props.socketIO.on('redoRequest', (playerId) => {
            if (userId !== playerId) {
                if (window.confirm('Your rival want to redo? Do you accept?')) {
                    this.props.socketIO.emit('redoAccepted', { roomId, userId });
                } else {
                    this.props.socketIO.emit('redoRefused', { roomId, userId });
                }
            }
        })
        this.props.socketIO.on('undoAccepted', () => {
            this.props.undoMove();
        })
        this.props.socketIO.on('redoAccepted', () => {
            this.props.redoMove();
        })
        this.props.socketIO.on('undoRefused', playerId => {
            if (playerId !== userId)
                alert('Your rival do not accept your request!');
        })
        this.props.socketIO.on('redoRefused', playerId => {
            if (playerId !== userId)
                alert('Your rival do not accept your request!');
        })
    }

    undo() {
        let data = {
            roomId,
            userId
        }
        this.props.socketIO.emit('undoRequest', data);
    }
    redo() {
        let data = {
            roomId,
            userId
        }
        this.props.socketIO.emit('redoRequest', data);
    }
    checkUndo() {
        if (this.props.currentMoveIndex > 0)
            return true;
        else
            return false;
    }
    checkRedo() {
        if (this.props.currentMoveIndex < this.props.moves.length)
            return true;
        else
            return false;
    }
    render() {
        return (
            <div className="ChangeMoveBtn">
                <button className="UndoBtn" disabled={!this.checkUndo()} onClick={() => this.undo()}>
                    <FontAwesomeIcon icon={faUndoAlt} />
                </button>
                <button className="RedoBtn" disabled={!this.checkRedo()} onClick={() => this.redo()}>
                    <FontAwesomeIcon icon={faRedoAlt} />
                </button>
            </div>
        )
    }
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
