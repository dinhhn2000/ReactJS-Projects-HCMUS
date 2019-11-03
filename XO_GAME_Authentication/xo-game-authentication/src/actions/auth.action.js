export const POST_LOGIN_PENDING = 'POST_LOGIN_PENDING';
export const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS';
export const POST_LOGIN_ERROR = 'POST_LOGIN_ERROR';
export const POST_REGISTER_PENDING = 'POST_REGISTER_PENDING';
export const POST_REGISTER_SUCCESS = 'POST_REGISTER_SUCCESS';
export const POST_REGISTER_ERROR = 'POST_REGISTER_ERROR';
export const POST_AUTH_PENDING = 'POST_AUTH_PENDING';
export const POST_AUTH_SUCCESS = 'POST_AUTH_SUCCESS';
export const POST_AUTH_ERROR = 'POST_AUTH_ERROR';

export function postLoginPending() {
    return {
        type: POST_LOGIN_PENDING
    }
}

export function postLoginSuccess() {
    return {
        type: POST_LOGIN_SUCCESS,
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

export function postRegisterSuccess() {
    return {
        type: POST_REGISTER_SUCCESS,
    }
}

export function postRegisterError(error) {
    return {
        type: POST_REGISTER_ERROR,
        error
    }
}

export function postAuthPending() {
    return {
        type: POST_AUTH_PENDING
    }
}

export function postAuthSuccess() {
    return {
        type: POST_AUTH_SUCCESS,
    }
}

export function postAuthError(error) {
    return {
        type: POST_AUTH_ERROR,
        error
    }
}