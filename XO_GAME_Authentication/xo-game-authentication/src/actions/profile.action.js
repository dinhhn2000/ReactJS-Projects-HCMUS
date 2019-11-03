export const FETCH_USER_PENDING = 'FETCH_USER_PENDING';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';
export const UPDATE_USER_PENDING = 'UPDATE_USER_PENDING';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_AVATAR_SUCCESS = 'UPDATE_USER_AVATAR_SUCCESS';
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';
export const GET_USER_AVATAR = 'GET_USER_AVATAR';
export const CLEAR_USER_AVATAR = 'CLEAR_USER_AVATAR';

export function fetchUserPending() {
    return {
        type: FETCH_USER_PENDING
    }
}

export function fetchUserSuccess({email, name, avatar}) {
    return {
        type: FETCH_USER_SUCCESS,
        email,
        name,
        avatar
    }
}

export function fetchUserError(error) {
    return {
        type: FETCH_USER_ERROR,
        error
    }
}

export function updateUserPending() {
    return {
        type: UPDATE_USER_PENDING
    }
}

export function updateUserAvatarSuccess(avatarUrl) {
    return {
        type: UPDATE_USER_AVATAR_SUCCESS,
        avatarUrl
    }
}

export function updateUserSuccess() {
    return {
        type: UPDATE_USER_SUCCESS,
    }
}

export function updateUserError(error) {
    return {
        type: UPDATE_USER_ERROR,
        error
    }
}

export function getUserAvatar(image) {
    return {
        type: GET_USER_AVATAR,
        image
    }
}

export function clearUserAvatar() {
    return {
        type: CLEAR_USER_AVATAR,
    }
}