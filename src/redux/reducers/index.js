import { combineReducers } from "redux";
import cart from "./cart";
import shipping from "./shipping";

export const getCartDeleted = state => state.cart.deletedIds;
export const selectCartUpdated = (state) => state.cart.updatedIds.map(id => ({
    id: id,
    ...state.cart.itemsByIds[id]
}));

export default combineReducers({ cart, shipping });