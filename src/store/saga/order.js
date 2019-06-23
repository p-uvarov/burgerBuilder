import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';

import * as actions from '../actions/index';

export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart());

    try {
        const query = yield `?auth=${action.token}`;
        const response = yield axios.post('orders.json' + query, action.orderData);
        yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData));
    } catch (error) {
        yield put(actions.purchaseBurgerFail(error));
    };
};

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrdersStart());

    try {
        const query = yield `?auth=${action.token}&orderBy="userID"&equalTo="${action.userID}"`;
        const response = yield axios.get('orders.json' + query);
        const fetchedOrders = yield [];
        for (let key in response.data) {
            yield fetchedOrders.push({
                ...response.data[key],
                id: key
            });
        }
        yield put(actions.fetchOrdersSuccess(fetchedOrders));
    } catch (error) {
        yield put(actions.fetchOrdersFail(error));
    }
}