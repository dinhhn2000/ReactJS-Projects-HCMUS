import {
    postLoginPending,
    postLoginSuccess,
    postLoginError,
    postRegisterPending,
    postRegisterSuccess,
    postRegisterError
} from '../actions/auth.action';
import axios from 'axios';

export function loginAction(data) {
    return (dispatch, getState) => {
        dispatch(postLoginPending());

        axios.post("http://localhost:4000/login", data)
            .then(res => {
                console.log(res.data);
                // console.log(data);
                dispatch(postLoginSuccess(res.data.token, data.email));
                console.log(getState());
                
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
                return res.data.token;
            })
            .catch(err => {
                console.log(err);
                dispatch(postRegisterError(err));
            })
    }
}
