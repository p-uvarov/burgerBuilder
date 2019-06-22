import { put, delay } from 'redux-saga/effects'
import Axios from 'axios';

import * as actions from '../actions/index';
import { webAPIKey } from '../../secure/firebase';

export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userID');

    yield put(actions.logoutSuccessed());
};

export function* authLogoutTimerSaga(action) {
    yield delay(action.expiresIn * 1000);
    yield put(actions.logout());
};

export function* authSaga(action) {
    yield put(actions.authStart());

    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }

    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + webAPIKey;

    if (!action.isSignupMode) {
        url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + webAPIKey;
    }

    try {
        const respond = yield Axios.post(url, authData);

        const expirationDate = yield new Date(new Date().getTime() + respond.data.expiresIn * 1000);

        yield localStorage.setItem('token', respond.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userID', respond.data.localId);

        yield put(actions.authSuccess(respond.data.idToken, respond.data.localId));
        yield put(actions.authLogoutTimer(respond.data.expiresIn));
    }
    catch (error) {
        console.log(error.response.data.error.message);
        yield put(actions.authFail(error.response.data.error));
    }
}