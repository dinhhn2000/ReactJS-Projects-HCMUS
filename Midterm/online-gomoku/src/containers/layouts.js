import { Navbar, Nav, OverlayTrigger, Tooltip } from 'react-bootstrap'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons'

import '../App.css'

export default function Layout(props) {
    const userName = sessionStorage.getItem("userName");

    if (!userName)
        return (
            <div className="body1">
                {/* Header */}
                <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                    <Navbar.Brand href="/">
                        <img src="./logo.png" style={{ height: 30, marginRight: 10 }} alt="LOGO"></img>
                        XO_GAME
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/login">Sign in</Nav.Link>
                            <Nav.Link href="/register">Sign up</Nav.Link>
                            <Nav.Link href="/register">{props.userEmail}</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                {/* Body */}
                <div>
                    {props.children}
                </div>
            </div>
        )
    else {
        return (
            <div className="body1">
                {/* Header */}
                <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                    <Navbar.Brand href="/">
                        <img src="./logo.png" style={{ height: 30, marginRight: 10 }} alt="LOGO"></img>
                        XO_GAME
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            {props.userToken === "" && <Nav.Link href="#">{props.userEmail}</Nav.Link>}
                            <Nav.Link href="/">Hello {userName}</Nav.Link>
                            <Nav.Link href="/login" onClick={() => sessionStorage.clear()}>
                                <OverlayTrigger
                                    placement='bottom'
                                    overlay={
                                        <Tooltip id={`tooltip-sign-out`}>
                                            Sign out
                                        </Tooltip>
                                    }
                                >
                                    <FontAwesomeIcon icon={faSignOutAlt} />
                                </OverlayTrigger>
                            </Nav.Link>
                            <Nav.Link href="/profile">
                                <OverlayTrigger
                                    placement='bottom'
                                    overlay={
                                        <Tooltip id={`tooltip-profile`}>
                                            Profile
                                        </Tooltip>
                                    }
                                >
                                    <FontAwesomeIcon icon={faUser} />
                                </OverlayTrigger>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                {/* Body */}
                <div>
                    {props.children}
                </div>
            </div>
        )
    }
}
