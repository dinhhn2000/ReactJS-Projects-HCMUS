import React, { useState } from "react";
import { FormGroup, FormControl, FormLabel, Button } from "react-bootstrap";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import "./Signup.css";
import { registerAction } from '../auth';
import { getRegisterError, getRegisterPending, getRegisterEmail } from "../../reducers/auth.reducer";

function Register(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setComfirmPassword] = useState("");
    const [name, setName] = useState("");

    function validateForm() {
        return (
            email.length > 0 &&
            password.length > 0 &&
            password === confirmPassword &&
            name.length > 0
        );
    }

    async function handleSubmit(event) {
        event.preventDefault();
        console.log({ email, password, name });
        props.postRegister({ email, password, name });
    }

    return (
        <div className="Signup">
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
                <FormGroup controlId="name" bsSize="large">
                    <FormLabel>Name</FormLabel>
                    <FormControl
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="confirmPassword" bsSize="large">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl
                        type="password"
                        onChange={e => setComfirmPassword(e.target.value)}
                        value={confirmPassword}
                    />
                </FormGroup>
                <Button block bsSize="large" disabled={!validateForm()} type="submit">Login</Button>
            </form>
        </div>
    );
}

const mapStateToProps = state => ({
    error: getRegisterError(state),
    token: getRegisterEmail(state),
    pending: getRegisterPending(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    postRegister: registerAction
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);