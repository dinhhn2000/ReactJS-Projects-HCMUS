import {
    POST_LOGIN_PENDING,
    POST_LOGIN_SUCCESS,
    POST_LOGIN_ERROR,
    POST_REGISTER_PENDING,
    POST_REGISTER_SUCCESS,
    POST_REGISTER_ERROR,
    POST_AUTH_PENDING,
    POST_AUTH_SUCCESS,
    POST_AUTH_ERROR
} from '../actions/auth.action';

const initialState = {
    pending: false,
    error: null,
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
            }
        case POST_REGISTER_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case POST_AUTH_PENDING:
            return {
                ...state,
                pending: true
            }
        case POST_AUTH_SUCCESS:
            return {
                ...state,
                pending: false,
            }
        case POST_AUTH_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default:
            return state;
    }
}

export const getLoginPending = state => state.authReducer.pending;
export const getLoginError = state => state.authReducer.error;
export const getRegisterPending = state => state.authReducer.pending;
export const getRegisterError = state => state.authReducer.error;
export const getAuthPending = state => state.authReducer.pending;
export const getAuthError = state => state.authReducer.error;