import { takeEvery } from 'redux-saga/effects';

import { logoutSaga, authLogoutTimerSaga, authSaga } from './auth';
import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_INIT_LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.AUTH_LOGOUT_TIMER, authLogoutTimerSaga);
    yield takeEvery(actionTypes.AUTH_AUTH_USER, authSaga);
};