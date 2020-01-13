import {all, fork, takeEvery, call, put, take, actionChannel, select} from 'redux-saga/effects'
import {CART_LOAD_DATA, CART_SEND} from '../redux/actionTypes';
import {cartPutData, cartLoadError, cartSendError, cartSendSuccess} from '../redux/actions';
import {API} from "../services";
import {getCartDeleted, selectCartUpdated} from "../redux/reducers";

export function* getCart() {
    try {
        const response = yield call(API.getCart);
        const data = yield response.json();
        yield put(cartPutData(data));
    } catch (e) {
        yield put(cartLoadError(e.message));
    }
}

export function* sendCart(payload) {
    const deletedIds = yield select(getCartDeleted);
    const updatedItems = yield select(selectCartUpdated);
    try{
        const deletedResponses = yield all(deletedIds.map(id => call(API.deleteCartItemById, id)));
        deletedResponses.forEach(response => {
            if (!response.ok) {
                throw Error('Internal server error, please reload page and try again.');
            }
        });

        const updatedResponses = yield all(updatedItems.map(item => call(API.updateCartItem, item)));
        updatedResponses.forEach(response => {
            if (!response.ok) {
                throw Error('Internal server error, please reload page and try again.');
            }
        });

        yield put(cartSendSuccess());
    } catch (e) {
        yield put(cartSendError(e.message));
    }
}

export function* watchGetCart() {
    yield takeEvery(CART_LOAD_DATA, getCart);
}

export function* watchSendCart() {
    const requestChannel = yield actionChannel(CART_SEND);
    while (true){
        const {payload} = yield take(requestChannel);
        yield call(sendCart, payload);
    }
}

export default function*() {
    yield all([fork(watchGetCart), fork(watchSendCart)]);
}