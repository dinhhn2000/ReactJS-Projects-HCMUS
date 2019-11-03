import React, { Component } from 'react'
import logo from '../../logo.svg';
import './Player.css'
import { Image, Container } from 'react-bootstrap';
import ChangeMoveBtn from '../../containers/ChangeMoveBtn/ChangeMoveBtn';

export default class Player extends Component {
    render() {
        return (
            <Container className="Player" style={{ backgroundColor: this.props.color }}>
                <div>
                    <Image src={logo} className="playerAvatar" alt="logo" thumbnail />
                    <p className="playerName">Player Name</p>
                </div>
                {this.props.mainPlayer === true && <ChangeMoveBtn />}
            </Container>
        )
    }
}
