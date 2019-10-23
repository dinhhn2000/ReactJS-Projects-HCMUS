export const POST_LOGIN_PENDING = 'POST_LOGIN_PENDING';
export const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS';
export const POST_LOGIN_ERROR = 'POST_LOGIN_ERROR';
export const POST_REGISTER_PENDING = 'POST_REGISTER_PENDING';
export const POST_REGISTER_SUCCESS = 'POST_REGISTER_SUCCESS';
export const POST_REGISTER_ERROR = 'POST_REGISTER_ERROR';
export const SET_USER_EMAIL = 'SET_USER_EMAIL';

export function postLoginPending() {
    return {
        type: POST_LOGIN_PENDING
    }
}

export function postLoginSuccess(token, email) {
    return {
        type: POST_LOGIN_SUCCESS,
        token,
        email
    }
}

export function postLoginError(error) {
    return {
        type: POST_LOGIN_ERROR,
        error
    }
}
export function postRegisterPending() {
    return {
        type: POST_REGISTER_PENDING
    }
}

export function postRegisterSuccess(email) {
    return {
        type: POST_REGISTER_SUCCESS,
        email
    }
}

export function postRegisterError(error) {
    return {
        type: POST_REGISTER_ERROR,
        error
    }
}

export function setUserEmail(email) {
    return {
        type: SET_USER_EMAIL,
        email
    }
}
