import { takeEvery, takeLeading, all } from 'redux-saga/effects';

import { logoutSaga, authLogoutTimerSaga, authSaga, authCheckLocalStorage } from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './order';
import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_INIT_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_LOGOUT_TIMER, authLogoutTimerSaga),
        takeEvery(actionTypes.AUTH_AUTH_USER, authSaga),
        takeEvery(actionTypes.AUTH_CHECK_LOCAL_STORAGE, authCheckLocalStorage)
    ]);
};

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.FETCH_INGREDIENTS_INIT, initIngredientsSaga);
};

export function* watchOrder() {
    yield takeLeading(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}