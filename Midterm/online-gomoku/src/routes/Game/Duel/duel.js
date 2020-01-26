import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import socketIOClient from 'socket.io-client';
import LoadingScreen from 'react-loading-screen';

import './Duel.css';
import Player from '../../../components/Player/Player'
import ChessBoard from '../../../containers/ChessBoard/ChessBoard';
import { saveMove, winnerMove, restartGame, createChessBoard } from '../../../actions/game.actions'
import {
    getFetchUserAvatar,
    getFetchUserName,
    getFetchOtherUserName,
    getFetchOtherUserAvatar
} from "../../../reducers/profile.reducer";
import {
    getChessBoard,
    getXIsNext,
} from '../../../reducers/game.reducers'
import { fetchUserAction, fetchOtherUserAction } from '../../asynchronous.action';
import CheckWinner from '../../../containers/ChessBoard/CheckWinner'

//reads in configuration from a .env file
// Start connect with socket
require('dotenv').config();
const socketUrl = process.env.REACT_APP_SOCKET_URL;
const userId = sessionStorage.getItem('userId');
const socket = socketIOClient(socketUrl);
const CHESS_SIZE = 20;

class Duel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFinding: true,
            isFirst: true,
        }
    }

    componentDidMount() {
        // Authenticate current user with token
        let token = sessionStorage.getItem("token");
        this.props.getUserProfile(token);


        socket.emit('registerPlayer', userId);

        // Register new player complete
        socket.on('registerComplete', data => {
            // console.log("Connect success to socket");
            // Find rival to play
            socket.emit('findRival', userId);
            this.setState({
                isFinding: true
            })
        })

        // Listen when server found rival & get rival's info
        socket.on('foundRoom', data => {
            let roomId = data.id;
            // console.log(roomId);
            let playerId = roomId.split('_');
            if (userId === playerId[0]) {
                this.props.getRivalProfile({
                    userId: playerId[1],
                    token
                })
            } else {
                this.props.getRivalProfile({
                    userId: playerId[0],
                    token
                })
            }
            sessionStorage.setItem('roomId', roomId);
            socket.emit('joinRoom', roomId);
            this.setState({ isFirst: data.isFirst });
            // Restart game if old player reload
            this.props.restartGame();
            this.props.createChessBoard(CHESS_SIZE);
        })

        // Listen when server create room for player
        socket.on('Welcome', () => {
            // console.log('Enter the room');
            this.setState({
                isFinding: false
            })
        })

        // Listen when rival play a new move
        socket.on('sNewMove', (data) => {
            if (data.id === userId)
                return;
            else {
                // Add player's move
                const newMove = {
                    Player: this.props.xIsNext ? 'X' : 'O',
                    row: data.row,
                    col: data.col
                }
                this.props.saveMove(newMove);

                // Check game over
                let checkPlayerWin = CheckWinner(data.row, data.col, this.props.chessBoard, this.props.xIsNext ? 'O' : 'X');
                if (checkPlayerWin) {
                    this.announceWinner(checkPlayerWin);
                }
            }
        })

        // Listen when the room is destroy
        socket.on('cancel', () => {
            alert('The match has been cancel! You will be redirect to homepage');
            window.location.replace('/');
        })
    }

    announceWinner(winnerMove) {
        // console.log('rival win');

        this.props.winnerMove(winnerMove);
        return setTimeout(() => {
            let alertStr = this.props.xIsNext ? 'O is the winner' : 'X is the winner';
            alert(`${alertStr}. Play with rival again?`);
            this.props.restartGame();
            this.props.createChessBoard(CHESS_SIZE);
        }, 1);
    }

    render() {
        const { name, avatar, rivalName, rivalAvatar } = this.props;
        const { isFinding, isFirst } = this.state;
        if (isFinding)
            return (
                <LoadingScreen
                    loading={true}
                    bgColor='#f7ca6f'
                    spinnerColor='#fc711b'
                    textColor='#676767'
                    logoSrc='/logo.png'
                    text='Find rival...'
                >

                </LoadingScreen>
            )
        else
            if (!isFirst)
                return (
                    <div className="DuelPlay">
                        <audio src="./bg_music.mp3" autoPlay loop />
                        <Player color='#e84b3a' socketIO={socket} mainPlayer={true} mode="duel" name={name} avatar={avatar} />
                        <ChessBoard socketIO={socket} isFirst={isFirst} mode="duel"></ChessBoard>
                        <Player color='#56a560' mainPlayer={false} name={rivalName} avatar={rivalAvatar} />
                    </div>
                );
            else
                return (
                    <div className="DuelPlay">
                        <audio src="./bg_music.mp3" autoPlay loop />
                        <Player color='#e84b3a' socketIO={socket} mainPlayer={true} mode="duel" name={rivalName} avatar={rivalAvatar} />
                        <ChessBoard socketIO={socket} isFirst={isFirst} mode="duel"></ChessBoard>
                        <Player color='#56a560' mainPlayer={false} name={name} avatar={avatar} />
                    </div>
                );
    }
}

const mapStateToProps = state => ({
    name: getFetchUserName(state),
    avatar: getFetchUserAvatar(state),
    rivalName: getFetchOtherUserName(state),
    rivalAvatar: getFetchOtherUserAvatar(state),
    xIsNext: getXIsNext(state),
    chessBoard: getChessBoard(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    getUserProfile: fetchUserAction,
    getRivalProfile: fetchOtherUserAction,
    saveMove,
    winnerMove,
    createChessBoard,
    restartGame
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Duel);