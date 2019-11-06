import {
    FETCH_USER_PENDING,
    FETCH_USER_SUCCESS,
    FETCH_USER_ERROR,
    FETCH_OTHER_USER_PENDING,
    FETCH_OTHER_USER_SUCCESS,
    FETCH_OTHER_USER_ERROR,
    CLEAR_USER_AVATAR,
    GET_USER_AVATAR,
    UPDATE_USER_ERROR,
    UPDATE_USER_PENDING,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_AVATAR_SUCCESS
} from '../actions/profile.action'

const initialState = {
    pending: false,
    error: null,
    email: '',
    avatar: null,
    name: '',
    isSuccess: false,
    rivalName: '',
    rivalAvatar: null,
    rivalEmail: '',
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_USER_PENDING:
            return {
                ...state,
                pending: true
            }
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                pending: false,
                email: action.email,
                avatar: action.avatar,
                name: action.name
            }
        case FETCH_USER_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case FETCH_OTHER_USER_PENDING:
            return {
                ...state,
                pending: true
            }
        case FETCH_OTHER_USER_SUCCESS:
            return {
                ...state,
                pending: false,
                rivalEmail: action.email,
                rivalAvatar: action.avatar,
                rivalName: action.name
            }
        case FETCH_OTHER_USER_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case UPDATE_USER_PENDING:
            return {
                ...state,
                pending: true
            }
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                pending: false,
                isSuccess: true
            }
        case UPDATE_USER_AVATAR_SUCCESS:
            return {
                ...state,
                pending: false,
                avatar: action.avatarUrl,
                isSuccess: true
            }
        case UPDATE_USER_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case GET_USER_AVATAR:
            return {
                ...state,
                avatar: action.image,
            }
        case CLEAR_USER_AVATAR:
            return {
                ...state,
                avatar: null,
            }
        default:
            return state;
    }
}

export const getFetchUserPending = state => state.profileReducer.pending;
export const getFetchUserError = state => state.profileReducer.error;
export const getFetchUserName = state => state.profileReducer.name;
export const getFetchUserEmail = state => state.profileReducer.email;
export const getFetchUserAvatar = state => state.profileReducer.avatar;
export const getFetchOtherUserName = state => state.profileReducer.rivalName;
export const getFetchOtherUserEmail = state => state.profileReducer.rivalEmail;
export const getFetchOtherUserAvatar = state => state.profileReducer.rivalAvatar;
export const getUploadSuccessState = state => state.profileReducer.isSuccess;