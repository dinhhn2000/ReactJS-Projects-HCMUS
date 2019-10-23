import {
    POST_LOGIN_PENDING,
    POST_LOGIN_SUCCESS,
    POST_LOGIN_ERROR,
    POST_REGISTER_PENDING,
    POST_REGISTER_SUCCESS,
    POST_REGISTER_ERROR,
    SET_USER_EMAIL
} from '../actions/auth.action';

const initialState = {
    pending: false,
    token: "",
    error: null,
    email: "",
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case POST_LOGIN_PENDING:
            return {
                ...state,
                pending: true
            }
        case POST_LOGIN_SUCCESS:
            return {
                ...state,
                pending: false,
                token: action.token,
                email: action.email,
            }
        case POST_LOGIN_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case POST_REGISTER_PENDING:
            return {
                ...state,
                pending: true
            }
        case POST_REGISTER_SUCCESS:
            return {
                ...state,
                pending: false,
                email: action.email,
            }
        case POST_REGISTER_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case SET_USER_EMAIL:
            return {
                ...state,
                email: action.email
            }
        default:
            return state;
    }
}

export const getLoginToken = state => state.token;
export const getLoginPending = state => state.pending;
export const getLoginError = state => state.error;
export const getRegisterEmail = state => {return state.email};
export const getRegisterPending = state => state.pending;
export const getRegisterError = state => state.error;