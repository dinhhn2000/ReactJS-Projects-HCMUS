import { Navbar, Nav, Container } from 'react-bootstrap'
import React from 'react'
import { connect } from 'react-redux';
import { getLoginToken, getRegisterEmail } from "../reducers/auth.reducer";
// import { getUserState } from "../actions/auth.action"

const Layout = (props) => {
    // setInterval(() => console.log(props.user), 3000);
    console.log(props);
    

    return (
        <div>
            {/* Header */}
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/">XO_GAME</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        {props.userToken === "" && <Nav.Link href="#">{props.userEmail}</Nav.Link>}
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/login">Sign in</Nav.Link>
                        <Nav.Link href="/register">Sign up</Nav.Link>
                        <Nav.Link href="/register">{props.userEmail}</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            {/* Body */}
            <Container>
                {props.children}
            </Container>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userToken: getLoginToken(state),
        user: getRegisterEmail(state)
    };
}

export default connect(
    mapStateToProps,
)(Layout);