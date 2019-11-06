import React, { Component } from 'react'
import Select from 'react-select'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './MoveHistory.css'
import { setCurrentMove } from '../../actions/game.actions'
import { getCurrentMoveIndex, getMoves } from '../../reducers/game.reducers'

class MoveHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectMove: null
        }
    }

    handleChange = selectMove => {
        this.props.setCurrentMove(selectMove.value);
        this.setState(
            { selectMove },
        );
    };

    render() {
        const moveList = this.props.moves.slice();
        const { selectMove } = this.state;
        if (moveList !== null || moveList !== undefined)
            for (let i = 0; i < moveList.length; i++) {
                moveList[i] = {
                    value: i,
                    label: `No.${i + 1} (${this.props.moves[i].row} - ${this.props.moves[i].col})`,
                    isDisabled: i % 2 !== 0 ? true : false
                }
            }

        return (
            <div className='history'>
                <Select
                    value={selectMove}
                    onChange={this.handleChange}
                    options={moveList} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentMoveIndex: getCurrentMoveIndex(state),
    moves: getMoves(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    setCurrentMove
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MoveHistory);