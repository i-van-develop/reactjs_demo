export const API = {
    getCart() {
        return fetch('https://5e171ef0505bb50014720754.mockapi.io/api/cart_goods');
    },
    deleteCartItemById(id) {
        return fetch('https://5e171ef0505bb50014720754.mockapi.io/api/cart_goods/' + id, {
            method: 'DELETE'
        });
    },
    updateCartItem(data) {
        return fetch('https://5e171ef0505bb50014720754.mockapi.io/api/cart_goods/' + data.id, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }
};