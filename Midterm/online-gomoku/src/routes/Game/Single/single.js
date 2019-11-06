import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './Single.css';
import Player from '../../../components/Player/Player'
import ChessBoard from '../../../containers/ChessBoard/ChessBoard';
import { getFetchUserAvatar, getFetchUserName } from "../../../reducers/profile.reducer";
import { fetchUserAction } from '../../asynchronous.action';

class Single extends Component {
    componentDidMount() {
        // Authenticate current user with token
        let token = sessionStorage.getItem("token");
        this.props.getUserProfile(token);
    }

    render() {
        const { name, avatar } = this.props;
        return (
            <div className="SinglePlay">
                {/* <audio src="./bg_music.mp3" autoPlay loop /> */}
                <Player mode="single" color='#e84b3a' mainPlayer={true} name={name} avatar={avatar} />
                <ChessBoard></ChessBoard>
                <Player mode="single" color='#56a560' mainPlayer={false} name="COMPUTER" avatar={null} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    name: getFetchUserName(state),
    avatar: getFetchUserAvatar(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    getUserProfile: fetchUserAction,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Single);