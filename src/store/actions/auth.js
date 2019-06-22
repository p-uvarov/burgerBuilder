import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userID) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token,
        userID
    }
};

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_INIT_LOGOUT
    }
}

export const logoutSuccessed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const authLogoutTimer = expiresIn => {
    return {
        type: actionTypes.AUTH_LOGOUT_TIMER,
        expiresIn
    };
};

export const auth = (email, password, isSignupMode) => {
    return {
        type: actionTypes.AUTH_AUTH_USER,
        email,
        password,
        isSignupMode
    }
};

export const setAuthRedirectPath = authRedirectPath => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        authRedirectPath
    }
}

export const authCheckLocalStorage = () => dispatch => {
    const token = localStorage.getItem('token');

    if (!token) {
        dispatch(logout());
    }
    else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        const expirationTimeInSeconds = (expirationDate - new Date()) / 1000;

        if (new Date() > expirationDate) {
            dispatch(logout());
        }
        else {
            const userID = localStorage.getItem('userID');
            dispatch(authSuccess(token, userID));
            dispatch(authLogoutTimer(expirationTimeInSeconds));
        }
    }
}