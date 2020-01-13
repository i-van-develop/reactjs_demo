import * as actionTypes from './actionTypes';

export const cartChangeItemCount = (id, newCount) => ({
    type: actionTypes.CART_CHANGE_ITEM_COUNT,
    payload: {
        id: id,
        newCount
    }
});

export const cartIncreaseItemCount = id => ({
    type: actionTypes.CART_INCREASE_ITEM_COUNT,
    payload: {id}
});

export const cartDecreaseItemCount = id => ({
    type: actionTypes.CART_DECREASE_ITEM_COUNT,
    payload: {id}
});

export const cartRemoveItem = id => ({
    type: actionTypes.CART_REMOVE_ITEM,
    payload: {id}
});

export const cartLoadData = () => ({
    type: actionTypes.CART_LOAD_DATA
});

export const cartPutData = data => ({
    type: actionTypes.CART_PUT_DATA,
    payload : {data}
});

export const cartLoadError = message => ({
    type: actionTypes.CART_LOAD_ERROR,
    payload : {message}
});

export const cartSend = () => ({
    type:actionTypes.CART_SEND
});

export const cartSendSuccess = () => ({
    type:actionTypes.CART_SEND_SUCCESS
});

export const cartSendError = message => ({
    type:actionTypes.CART_SEND_ERROR,
    payload: {message}
});

export const cartSendErrorCancel = () => ({
    type:actionTypes.CART_SEND_ERROR_CANCEL
});

export const cartRedirectSuccess = () => ({
    type: actionTypes.CART_REDIRECT_SUCCESS
});

export const shippingChangeName = value => ({
    type: actionTypes.SHIPPING_CHANGE_NAME,
    payload: {value}
});

export const shippingChangeAddress = value => ({
    type: actionTypes.SHIPPING_CHANGE_ADDRESS,
    payload: {value}
});

export const shippingChangePhone = value => ({
    type: actionTypes.SHIPPING_CHANGE_PHONE,
    payload: {value}
});

export const shippingChangeEmail = value => ({
    type: actionTypes.SHIPPING_CHANGE_EMAIL,
    payload: {value}
});

export const shippingChangeShippingOption = value => ({
    type: actionTypes.SHIPPING_CHANGE_SHIPPING_OPTIONS,
    payload: {value}
});

export const shippingPay = () => ({
    type: actionTypes.SHIPPING_PAY
});