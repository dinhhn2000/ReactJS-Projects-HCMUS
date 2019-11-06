import React, { useState, useEffect, useCallback } from "react";
import { FormGroup, FormControl, FormLabel, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dropzone from 'react-dropzone';

import "./Profile.css";
import { fetchUserAction, updateAvatar, updateProfile } from '../asynchronous.action';
import { clearUserAvatar, getUserAvatar } from '../../actions/profile.action'
import {
    getFetchUserAvatar,
    getFetchUserEmail,
    getFetchUserName,
    getFetchUserError,
    getFetchUserPending,
    getUploadSuccessState
} from "../../reducers/profile.reducer";

const avatarFileType = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif';
const avatarFileTypeArray = avatarFileType.split(',').map(item => { return item.trim() });
const avatarFileMaxSize = 2097152;

function Register(props) {
    let { email } = props;
    const isLocalAccount = sessionStorage.getItem("method").includes("local");
    const [password, setPassword] = useState("");
    const [confirmPassword, setComfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [avatarFile, setAvatarFile] = useState(null);
    const [alert, setAlert] = useState(false);

    const fetchUser = useCallback(() => {
        // Authenticate current user with token
        let token = sessionStorage.getItem("token");
        props.getUserProfile(token);
    }, [])

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        fetchUser();
    }, [fetchUser]);


    // Handle dropzone & avatar
    // const { getRootProps, getInputProps } = useDropzone();

    function verifyAvatarFile(files) {
        if (files && files.length > 0) {
            const verifyFile = files[0];

            // Check file type
            if (!avatarFileTypeArray.includes(verifyFile.type)) {
                alert("The file's format is not correct!!!");
                return false;
            }
            if (verifyFile.size > avatarFileMaxSize) {
                alert("The file is too big!!!");
                return false;
            }
            return true;
        }
    }

    function handleOnDrop(files, rejectedFiles) {
        if (rejectedFiles && rejectedFiles.length > 0) {
            verifyAvatarFile(rejectedFiles);
        }
        if (files && files.length > 0) {
            if (verifyAvatarFile(files)) {
                // imageBase64Data
                const avatarFile = files[0];
                setAvatarFile(avatarFile);
                const avatarReader = new FileReader();
                avatarReader.addEventListener("load", () => {
                    // console.log(avatarReader);
                    props.getUserAvatar(avatarReader.result);
                }, false);

                avatarReader.readAsDataURL(avatarFile);
            }
        }

    }

    function clearCurrentAvatar() {
        props.clearUserAvatar();
    }

    async function handleSubmitAvatar(event) {
        event.preventDefault();
        // Authenticate current user with token
        let token = sessionStorage.getItem("token");
        props.updateAvatar({ token, avatarFile });
        setAlert(true);
        setAvatarFile(null);
        setTimeout(() => setAlert(false), 3000);
    }

    // Handle form
    function validateForm() {
        return (
            password.length > 0 &&
            password === confirmPassword &&
            name.length > 0
        ) || (isLocalAccount === false && name.length > 0);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setAlert(true);
        setTimeout(() => setAlert(false), 3000);
        // Authenticate current user with token
        let token = sessionStorage.getItem("token");
        if (isLocalAccount)
            props.updateProfile({ name, password, token });
        else
            props.updateProfile({ name, token });
    }

    return (
        <div className="Profile">
            <form onSubmit={handleSubmit}>
                {props.error && alert && <Alert variant='danger'>
                    Something wrong happened!!!
                </Alert>}
                {props.isSuccess && alert && <Alert variant='success'>
                    Update profile complete!!!
                </Alert>}
                <Row className="justify-content-md-center">
                    <Col md="3" lg="4">
                        {props.avatar !== null ?
                            <div id="avatar">
                                <img className="avatarImage" src={props.avatar} alt="Cannot show!!!"></img>
                                <div className="avatarBtn">
                                    <Button className="changeAvatarBtn" variant="outline-info" onClick={() => clearCurrentAvatar()}>Change avatar</Button>
                                    {props.pending === false && avatarFile !== null ?
                                        <Button className="uploadAvatarBtn" variant="outline-success" onClick={handleSubmitAvatar}>Upload</Button>
                                        :
                                        <Button className="uploadAvatarBtn" variant="success" disabled>Upload</Button>
                                    }
                                </div>
                            </div>
                            :
                            <Dropzone onDrop={handleOnDrop}
                                multiple={false}
                                maxSize={avatarFileMaxSize}
                                accept={avatarFileType}
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <Container {...getRootProps()} className="avatarDropzone">
                                        <input {...getInputProps()} />
                                        <p>Drag & drop your image here, or click to select image ( {'<'} 2MB )</p>
                                    </Container>
                                )}
                            </Dropzone>
                        }
                    </Col>
                    <Col>
                        <Container>
                            <FormGroup controlId="email" bsSize="large">
                                <FormLabel>Email</FormLabel>
                                <FormControl
                                    autoFocus
                                    type="email"
                                    value={email}
                                    disabled="true"
                                />
                            </FormGroup>
                            <FormGroup controlId="name" bsSize="large">
                                <FormLabel>Name</FormLabel>
                                <FormControl
                                    type="text"
                                    value={name}
                                    placeholder={props.name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup controlId="password" bsSize="large">
                                <FormLabel>Password</FormLabel>
                                <FormControl
                                    type="password"
                                    value={password}
                                    onChange={e => { setPassword(e.target.value); setName(props.name) }}
                                    disabled={!isLocalAccount}
                                />
                            </FormGroup>
                            <FormGroup controlId="confirmPassword" bsSize="large">
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl
                                    type="password"
                                    onChange={e => setComfirmPassword(e.target.value)}
                                    value={confirmPassword}
                                    disabled={!isLocalAccount}
                                />
                            </FormGroup>
                            <Button block bsSize="large" disabled={!validateForm()} type="submit">UPDATE</Button>
                        </Container>
                    </Col>
                </Row>
            </form>
        </div>
    );
}

const mapStateToProps = state => ({
    error: getFetchUserError(state),
    pending: getFetchUserPending(state),
    email: getFetchUserEmail(state),
    name: getFetchUserName(state),
    avatar: getFetchUserAvatar(state),
    isSuccess: getUploadSuccessState(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    getUserProfile: fetchUserAction,
    updateProfile,
    updateAvatar,
    clearUserAvatar,
    getUserAvatar
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);