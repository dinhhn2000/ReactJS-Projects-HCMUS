import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import "./Login.css";
import { loginAction } from '../auth';
import { getLoginToken, getLoginPending, getLoginError } from "../../reducers/auth.reducer";

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.postLogin({ email, password });
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="email" bsSize="large">
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                </FormGroup>
                <Button block bsSize="large" disabled={!validateForm()} type="submit">Login</Button>
            </form>
        </div>
    );
}

const mapStateToProps = state => ({
    error: getLoginError(state),
    token: getLoginToken(state),
    pending: getLoginPending(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    postLogin: loginAction
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);