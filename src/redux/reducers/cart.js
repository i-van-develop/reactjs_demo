import {
    CART_REMOVE_ITEM,
    CART_DECREASE_ITEM_COUNT,
    CART_INCREASE_ITEM_COUNT,
    CART_CHANGE_ITEM_COUNT,
    CART_LOAD_DATA,
    CART_PUT_DATA,
    CART_LOAD_ERROR,
    CART_SEND, CART_SEND_SUCCESS, CART_SEND_ERROR, CART_SEND_ERROR_CANCEL, CART_REDIRECT_SUCCESS
} from "../actionTypes";

const initialState = {
    isLoad: false,
    isSend: false,
    loadError: null,
    sendError: null,
    sendSuccess: null,
    itemsByIds: {

    },
    updatedIds : [],
    deletedIds : []
};

const countValidation = count => !count ? 1 : (count > 50) ? 50 : (count < 1) ? 1 : count;
const setChangedId = (updatedIds, id) => updatedIds.includes(id) ? updatedIds : [...updatedIds, id];

export default function (state = initialState, action) {
    switch (action.type) {
        case CART_CHANGE_ITEM_COUNT : {
            const {id, newCount} = action.payload;
            return {
                ...state,
                itemsByIds: {
                    ...state.itemsByIds,
                    [id]: {
                        ...state.itemsByIds[id],
                        count: countValidation(parseInt(newCount.replace('/[^0-9]/', '')))
                    }
                },
                updatedIds: setChangedId(state.updatedIds, id)
            }
        }
        case CART_INCREASE_ITEM_COUNT : {
            const {id} = action.payload;
            if (!state.itemsByIds.hasOwnProperty(id))
                return state;
            return {
                ...state,
                itemsByIds: {
                    ...state.itemsByIds,
                    [id]: {
                        ...state.itemsByIds[id],
                        count: countValidation(state.itemsByIds[id].count + 1)
                    }
                },
                updatedIds: setChangedId(state.updatedIds, id)
            }
        }
        case CART_DECREASE_ITEM_COUNT : {
            const {id} = action.payload;
            return {
                ...state,
                itemsByIds: {
                    ...state.itemsByIds,
                    [id]: {
                        ...state.itemsByIds[id],
                        count: countValidation(state.itemsByIds[id].count - 1)
                    }
                },
                updatedIds: setChangedId(state.updatedIds, id)
            }
        }
        case CART_REMOVE_ITEM : {
            const {id} = action.payload;
            let newItemsByIds = {...state.itemsByIds};
            delete newItemsByIds[id];
            return {
                ...state,
                itemsByIds: newItemsByIds,
                deletedIds: [...state.deletedIds, id]
            }
        }
        case CART_LOAD_DATA : {
            return {
                ...state,
                updatedIds: [],
                deletedIds: [],
                isLoad: true,
                sendError: null,
                sendSuccess: null,
                isSend: null,
                loadError: null
            }
        }
        case CART_LOAD_ERROR : {
            const {message} = action.payload;
            return {
                ...state,
                isLoad: false,
                loadError: message
            }
        }
        case CART_PUT_DATA : {
            const {data} = action.payload;
            return {
                ...state,
                isLoad: false,
                loadError: null,
                itemsByIds: data.reduce((result, item) => {
                    result[item.id] = {
                        ...item
                    };
                    delete result[item.id].id;
                    return result;
                }, {})
            }
        }
        case CART_SEND : {
            return {
                ...state,
                isSend : true
            }
        }
        case CART_SEND_SUCCESS : {
            return {
                ...state,
                isSend: false,
                sendSuccess: true
            }
        }
        case CART_SEND_ERROR : {
            const {message} = action.payload;
            return {
                ...state,
                isSend: false,
                sendError: message
            }
        }
        case CART_SEND_ERROR_CANCEL : {
            return {
                ...state,
                sendError: null
            };
        }
        case CART_REDIRECT_SUCCESS : {
            return {
                ...state,
                sendSuccess: null
            };
        }

        default: return state;
    }
}