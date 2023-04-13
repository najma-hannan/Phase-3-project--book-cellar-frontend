import React from "react";

export const CartContext = React.createContext();

function CartProvider({ children }) {
    const [cart, setCart] = React.useState([]);

    React.useEffect(() => {
        console.log(cart.map(item => ({title: item.title, qty: item.cart_quantity})));
    }, [cart]);

    const addToCart = React.useCallback((bookItem) => {
        const cartItemIndex = cart.findIndex(item => item.id === bookItem.id);

        if(cartItemIndex !== -1) {
            cart[cartItemIndex].cart_quantity += 1;
            setCart([...cart]);
        } else {
            setCart([...cart, {...bookItem, cart_quantity: 1}]);
        }

    }, [cart]);

    const removeFromCart = React.useCallback((item) => {
        // TODO
    }, []);

    const clearCart = React.useCallback(() => {
        setCart(() => [])
    }, []);

    return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart}}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;
