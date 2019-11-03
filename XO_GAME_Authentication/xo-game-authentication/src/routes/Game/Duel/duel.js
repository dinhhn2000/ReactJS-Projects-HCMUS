import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingScreen from 'react-loading-screen';

import ChessBoard from '../../../containers/ChessBoard/ChessBoard'
import './Home.css';
import { authAction } from '../../asynchronous.action';
import { getAuthError, getAuthPending } from "../../../reducers/auth.reducer";

class Duel_Play extends Component {
    constructor(props) {
        super(props);
        this.state = {
            col: 10,
            row: 10,
        };

        // Authenticate current user with token
        let token = sessionStorage.getItem("token");
        props.authenticate(token);
    }

    changeChessSizeCol(e) {
        this.setState({
            col: parseInt(e.target.value, 10),
        });
    }

    changeChessSizeRow(e) {
        this.setState({
            row: parseInt(e.target.value, 10),
        });
    }

    render() {
        const { pending, error } = this.props;
        if (error)
            return (
                <div className="Landing-page">
                    <button className="customBtn" onClick={() => window.location.replace('/login')}>
                        login
                        <span></span><span></span><span></span><span></span>
                    </button>
                </div>
            );
        else
            if (pending)
                return (
                    <LoadingScreen
                        loading={true}
                        bgColor='#f7ca6f'
                        spinnerColor='#fc711b'
                        textColor='#676767'
                        logoSrc='/logo.png'
                        text='Authenticating...'
                    >

                    </LoadingScreen>
                )
            else
                return (
                    <div className="Game">
                        <label className="mapSizeLabel">ROWS</label>
                        <input
                            className="Input"
                            type="number"
                            value={this.state.row}
                            onChange={e => this.changeChessSizeRow(e)}
                            min="10"
                            max="30"
                        />
                        <label className="mapSizeLabel">COLUMNS</label>
                        <input
                            className="Input"
                            type="number"
                            value={this.state.col}
                            onChange={e => this.changeChessSizeCol(e)}
                            min="10"
                            max="25"
                        />
                        <p>(Max is 25 & Min is 10)</p>
                        <p style={{ color: 'red' }}>
                            (Below or above the limit may crash the app)
          </p>
                        <button id="restartBtn" onClick={() => window.location.reload()}>
                            RESTART GAME
          </button>
                        <ChessBoard
                            className="chessBoard"
                            CHESS_SIZE_ROW={this.state.row + 1}
                            CHESS_SIZE_COL={this.state.col + 1}
                        />
                    </div>
                )
    }
}

const mapStateToProps = state => ({
    error: getAuthError(state),
    pending: getAuthPending(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    authenticate: authAction
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Duel_Play);