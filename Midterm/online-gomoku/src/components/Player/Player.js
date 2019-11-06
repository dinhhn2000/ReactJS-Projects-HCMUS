import React, { Component } from 'react'
import './Player.css'
import { Image, Container } from 'react-bootstrap';
import ChangeMoveBtn from '../../containers/ChangeMoveBtn/ChangeMoveBtn';
import MoveHistory from '../../containers/MoveHistory/MoveHistory';

export default class Player extends Component {
    render() {
        return (
            <Container className={this.props.mainPlayer ? 'Player' : 'Rival'}
                style={{ backgroundColor: this.props.color }}>
                <div>
                    <Image src={this.props.avatar === null ? '/bot.png' : this.props.avatar}
                        className="playerAvatar"
                        alt="avatar"
                        thumbnail
                    />
                    <p className="playerName"> {this.props.name}</p>
                </div>
                {this.props.mainPlayer === true && this.props.mode === 'duel' && <ChangeMoveBtn socketIO={this.props.socketIO} />}
                {this.props.mainPlayer === false && this.props.mode === 'single' && <MoveHistory />}
            </Container>
        )
    }
}
