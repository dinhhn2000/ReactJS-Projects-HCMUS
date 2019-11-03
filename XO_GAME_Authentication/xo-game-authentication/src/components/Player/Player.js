import React, { Component } from 'react'
import './Player.css'
import { Image, Container } from 'react-bootstrap';
import ChangeMoveBtn from '../../containers/ChangeMoveBtn/ChangeMoveBtn';

export default class Player extends Component {
    render() {
        return (
            <Container className="Player" style={{ backgroundColor: this.props.color }}>
                <div>
                    <Image src={this.props.avatar === null ? '/bot.png' : this.props.avatar}
                        className="playerAvatar"
                        alt="avatar"
                        thumbnail
                    />
                    <p className="playerName"> {this.props.name}</p>
                </div>
                {this.props.mainPlayer === true && <ChangeMoveBtn />}
            </Container>
        )
    }
}
