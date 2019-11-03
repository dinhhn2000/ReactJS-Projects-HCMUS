import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingScreen from 'react-loading-screen';

import './Home.css';
import { authAction } from '../asynchronous.action';
import { getAuthError, getAuthPending } from "../../reducers/auth.reducer";

class Game extends Component {
    constructor(props) {
        super(props);
        // Authenticate current user with token
        let token = sessionStorage.getItem("token");
        props.authenticate(token);
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
                    <div className="Landing-page">
                        <button className="customBtn Single" onClick={() => window.location.replace('/singleMode')}>
                            Single
                        <span></span><span></span><span></span><span></span>
                        </button>
                        <button className="customBtn Duel" onClick={() => window.location.replace('/multipleMode')}>
                            Duel
                        <span></span><span></span><span></span><span></span>
                        </button>

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
)(Game);