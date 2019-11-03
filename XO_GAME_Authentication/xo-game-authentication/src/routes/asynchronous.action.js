import {
    postLoginPending,
    postLoginSuccess,
    postLoginError,
    postRegisterPending,
    postRegisterSuccess,
    postRegisterError,
    postAuthPending,
    postAuthSuccess,
    postAuthError
} from '../actions/auth.action';
import {
    fetchUserError,
    fetchUserPending,
    fetchUserSuccess,
    updateUserError,
    updateUserPending,
    updateUserSuccess
} from '../actions/profile.action';
import axios from 'axios';

//reads in configuration from a .env file
require('dotenv').config();
const apiUrl = process.env.REACT_APP_API_URL;

export function loginAction(data) {
    return (dispatch) => {
        dispatch(postLoginPending());
        let loginUrl = apiUrl + "/login";
        console.log(loginUrl);

        axios.post(loginUrl, data)
            .then(res => {
                console.log(res.data);
                dispatch(postLoginSuccess());

                // Save user's token in session storage
                sessionStorage.setItem("token", res.data.token);
                sessionStorage.setItem("userName", res.data.name);
                sessionStorage.setItem("method", "local");

                window.location.replace("/");
                return res.data.token;
            })
            .catch(err => {
                console.log(err);
                dispatch(postLoginError(err));
            })
    }
}

export function loginGoogleAction(data) {
    return (dispatch) => {
        dispatch(postLoginPending());
        let loginUrl = apiUrl + "/login";
        console.log(loginUrl);

        axios.post(loginUrl, data)
            .then(res => {
                console.log(res.data);
                dispatch(postLoginSuccess());

                // Save user's token in session storage
                sessionStorage.setItem("token", res.data.token);
                sessionStorage.setItem("userName", res.data.name);
                sessionStorage.setItem("method", "google");

                window.location.replace("/");
                return res.data.token;
            })
            .catch(err => {
                console.log(err);
                dispatch(postLoginError(err));
            })
    }
}

export function loginFacebookAction(data) {
    return (dispatch) => {
        dispatch(postLoginPending());
        let loginUrl = apiUrl + "/login/facebookOauth";
        console.log(loginUrl);

        axios.post(loginUrl, data)
            .then(res => {
                console.log(res.data);
                dispatch(postLoginSuccess());

                // Save user's token in session storage
                sessionStorage.setItem("token", res.data.token);
                sessionStorage.setItem("userName", res.data.name);
                sessionStorage.setItem("method", "facebook");

                window.location.replace("/");
                return res.data.token;
            })
            .catch(err => {
                console.log(err);
                dispatch(postLoginError(err));
            })
    }
}

export function registerAction(data) {
    return (dispatch) => {
        dispatch(postRegisterPending());
        let registerUrl = apiUrl + "/register";

        axios.post(registerUrl, data)
            .then(res => {
                console.log(res.data);
                dispatch(postRegisterSuccess());

                window.location.replace("/login");
                return res.data.emailAddress;
            })
            .catch(err => {
                console.log(err);
                dispatch(postRegisterError(err));
            })
    }
}

export function authAction(data) {
    return (dispatch) => {
        dispatch(postAuthPending());
        const authUrl = apiUrl + "/auth";

        axios({
            method: 'post',
            url: authUrl,
            headers: {
                Authorization: data
            }
        })
            .then(res => {
                console.log(res.data);
                if (res.data.success)
                    dispatch(postAuthSuccess());
                else
                    dispatch(postAuthError({ error: "Cannot authenticate current user" }));
                return res.data.success;
            })
            .catch(err => {
                console.log(err);
                dispatch(postAuthError(err));
                // window.location.replace('/login');
            })
    }
}

export function fetchUserAction(data) {
    return (dispatch) => {
        dispatch(fetchUserPending());
        const profileUrl = apiUrl + "/me";

        axios({
            method: 'get',
            url: profileUrl,
            headers: {
                Authorization: data
            }
        })
            .then(res => {
                console.log(res.data);
                if (res.data) {
                    let imageUrl = res.data.imageUrl;
                    if (imageUrl.includes("public/images/"))
                        imageUrl = apiUrl + '/' + imageUrl;
                    let data = {
                        email: res.data.email,
                        name: res.data.name,
                        avatar: imageUrl
                    };
                    dispatch(fetchUserSuccess(data));
                }
                else
                    dispatch(fetchUserError({ error: "Cannot authenticate current user" }));
                return res.data.success;
            })
            .catch(err => {
                console.log(err);
                dispatch(fetchUserError(err));
            })
    }
}

export function updateProfile(data) {
    return (dispatch) => {
        dispatch(updateUserPending());
        const authUrl = apiUrl + "/me/updateProfile";

        const loginMethod = sessionStorage.getItem("method");
        let sendData;
        if (loginMethod === 'local')
            sendData = {
                method: loginMethod,
                name: data.name,
                password: data.password,
            }
        else
            sendData = {
                method: loginMethod,
                name: data.name,
            }

        axios({
            method: 'post',
            url: authUrl,
            headers: {
                Authorization: data.token
            },
            data: sendData
        })
            .then(res => {
                console.log(res.data);
                sessionStorage.setItem("userName", sendData.name);
                if (res.data)
                    dispatch(updateUserSuccess());
                else
                    dispatch(updateUserError({ error: "Cannot update user's profile" }));
            })
            .catch(err => {
                console.log(err);
                dispatch(updateUserError(err));
            })
    }
}

export function updateAvatar(data) {
    return (dispatch) => {
        dispatch(updateUserPending());
        const updateUrl = apiUrl + "/me/updateImageUrl";
        const fd = new FormData();
        fd.append('avatarImage', data.avatarFile);

        axios({
            method: 'post',
            url: updateUrl,
            headers: {
                Authorization: data.token
            },
            data: fd
        })
            .then(res => {
                console.log(res.data);
                if (res.data.avatar)
                    dispatch(updateUserSuccess(res.data.avatar));
                else
                    dispatch(updateUserError({ error: "Cannot upload avatar" }));
            })
            .catch(err => {
                console.log(err);
                dispatch(updateUserError(err));
            })
    }
}