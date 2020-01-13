import {
    SHIPPING_CHANGE_ADDRESS,
    SHIPPING_CHANGE_EMAIL,
    SHIPPING_CHANGE_NAME,
    SHIPPING_CHANGE_PHONE,
    SHIPPING_CHANGE_SHIPPING_OPTIONS,
    SHIPPING_PAY
} from '../actionTypes';

const initialValue = {
    name: "",
    nameValid: true,
    address: "",
    addressValid: true,
    phone: "",
    phoneValid: true,
    email: "",
    emailValid: true,
    shippingOption: "",
    isValid: true
};

const validateEmpty = value => value.trim().length > 0;
const validateEmail = value => !validateEmpty(value) || value.search(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/) !== -1;
const validatePhone = value => !validateEmpty(value) || value.search(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/g) !== -1;
const validateState = state => state.nameValid && state.addressValid && state.emailValid && state.phoneValid;

const stateRevalidate = state => ({
    ...state,
    isValid: validateState(state)
});

const stateRevalidateRefresh = state => stateRevalidate({
    ...state,
    nameValid: validateEmpty(state.name),
    addressValid: validateEmpty(state.address),
    emailValid: validateEmail(state.email),
    phoneValid: validatePhone(state.phone)
});

export default function (state = initialValue, action) {
    switch (action.type) {
        case SHIPPING_CHANGE_NAME : {
            const {value} = action.payload;
            return stateRevalidate({
                ...state,
                name: value,
                nameValid: validateEmpty(value),
            });
        }
        case SHIPPING_CHANGE_ADDRESS : {
            const {value} = action.payload;
            return stateRevalidate({
                ...state,
                address: value,
                addressValid: validateEmpty(value)
            });
        }
        case SHIPPING_CHANGE_PHONE : {
            const {value} = action.payload;
            return stateRevalidate({
                ...state,
                phone: value,
                phoneValid: validatePhone(value)
            });
        }
        case SHIPPING_CHANGE_EMAIL : {
            const {value} = action.payload;
            return stateRevalidate({
                ...state,
                email: value,
                emailValid: validateEmail(value)
            });
        }
        case SHIPPING_CHANGE_SHIPPING_OPTIONS : {
            const {value} = action.payload;
            return {
                ...state,
                shippingOption: value
            };
        }
        case SHIPPING_PAY : {
            return stateRevalidateRefresh({...state});
        }
        default :
            return state;
    }
}