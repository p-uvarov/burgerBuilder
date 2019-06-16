import Axios from 'axios';

import * as actionTypes from './actionTypes';
import { webAPIKey } from '../../secure/firebase';

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
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userID');
    
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authLogoutTimer = expiresIn => dispatch => {
    setTimeout(() => {
        dispatch(logout());
    }, expiresIn * 1000);
}

export const auth = (email, password, isSignupMode) => dispatch => {
    dispatch(authStart());

    const authData = {
        email,
        password,
        returnSecureToken: true
    }

    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + webAPIKey;

    if(!isSignupMode) {
        url ='https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + webAPIKey;
    }

    Axios.post(url, authData)
        .then(respond => {
            const expirationDate = new Date(new Date().getTime() + respond.data.expiresIn * 1000);

            localStorage.setItem('token', respond.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userID', respond.data.localId);

            dispatch(authSuccess(respond.data.idToken, respond.data.localId));
            dispatch(authLogoutTimer(respond.data.expiresIn));
        })
        .catch(error => {
            console.log(error.response.data.error.message);
            dispatch(authFail(error.response.data.error));
        });
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
        logout();
    }
    else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        const expirationTimeInSeconds = (expirationDate - new Date()) / 1000;

        if (new Date() > expirationDate) {
            logout();
        }
        else {
            const userID = localStorage.getItem('userID');
            dispatch(authSuccess(token, userID));
            dispatch(authLogoutTimer(expirationTimeInSeconds));
        }
    }
}