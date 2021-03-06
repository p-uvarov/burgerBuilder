import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    userID: null,
    token: null,
    error: null,
    loading: null,
    authRedirectPath: '/'
}

const authStart = (state) => {
    const updatedState = {
        loading: true,
        error: null
    }

    return updateObject(state, updatedState)
}

const authSuccess = (state, action) => {
    const updatedState = {
        userID: action.userID,
        token: action.token,
        error: null,
        loading: false
    }

    return updateObject(state, updatedState);
}

const authFail = (state, action) => {
    const updatedState = {
        error: action.error,
        loading: false
    }

    return updateObject(state, updatedState);
}

const authLogout = (state) => {
    const updatedState = {
        userID: null,
        token: null
    }

    return updateObject(state, updatedState);
}

const setAuthRedirectPath = (state, action) => {
    const updatedState = {
        authRedirectPath: action.authRedirectPath
    };
    
    return updateObject(state, updatedState);
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
                
        default: return state;
    }
}

export default reducer;