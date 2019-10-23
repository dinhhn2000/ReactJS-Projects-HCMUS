import {
    postLoginPending,
    postLoginSuccess,
    postLoginError,
    postRegisterPending,
    postRegisterSuccess,
    postRegisterError,
    // setUserEmail
} from '../actions/auth.action';
import axios from 'axios';

export function loginAction(data) {
    return (dispatch, getState) => {
        dispatch(postLoginPending());

        axios.post("http://localhost:4000/login", data)
            .then(res => {
                console.log(res.data);
                dispatch(postLoginSuccess(res.data.token, data.email));
                // dispatch(setUserEmail(data.email));
                console.log(getState());
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
    return (dispatch, getState) => {
        dispatch(postRegisterPending());

        axios.post("http://localhost:4000/register", data)
            .then(res => {
                console.log(res.data);
                dispatch(postRegisterSuccess(res.data.token));
                window.location.replace("/login");
                return res.data.token;
            })
            .catch(err => {
                console.log(err);
                dispatch(postRegisterError(err));
            })
    }
}

export function checkUserAction(data) {
    return (dispatch, getState) => {
        dispatch(postRegisterPending());
        console.log(getState());
        
        axios.post("http://localhost:4000/register", data)
            .then(res => {
                console.log(res.data);
                dispatch(postRegisterSuccess(res.data.token));
                return res.data.token;
            })
            .catch(err => {
                console.log(err);
                dispatch(postRegisterError(err));
            })
    }
}
