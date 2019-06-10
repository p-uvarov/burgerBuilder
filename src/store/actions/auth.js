import Axios from 'axios';

import * as actionTypes from './actionTypes';
import { webAPIKey } from '../../secure/firebase';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userID: authData.localId,
        token: authData.idToken,
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
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authLogoutTimer = expiresIn => dispatch => {
    setTimeout(() => {
        dispatch(logout());
    }, expiresIn * 1000);
}

export const auth = (email, password, isSignupMode) => dispatch => {
    console.log(email, password);
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
            console.log(respond);
            dispatch(authSuccess(respond.data));
            dispatch(authLogoutTimer(respond.data.expiresIn));
        })
        .catch(error => {
            console.log(error.response.data.error.message);
            dispatch(authFail(error.response.data.error));
        });
};