import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './Single.css';
import Player from '../../../components/Player/Player'
import ChessBoard from '../../../containers/ChessBoard/ChessBoard';
import { getFetchUserAvatar, getFetchUserName } from "../../../reducers/profile.reducer";
import { fetchUserAction } from '../../asynchronous.action';

function Single(props) {
    let { name, avatar } = props;

    const fetchUser = useCallback(() => {
        // Authenticate current user with token
        let token = sessionStorage.getItem("token");
        props.getUserProfile(token);
    }, [])

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return (
        <div className="SinglePlay">
            <audio src="./bg_music.mp3" autoPlay loop/>
            <Player color='#e84b3a' mainPlayer={true} name={name} avatar={avatar} />
            <ChessBoard></ChessBoard>
            <Player color='#56a560' mainPlayer={false} name="COMPUTER" avatar={null} />
        </div>
    );
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