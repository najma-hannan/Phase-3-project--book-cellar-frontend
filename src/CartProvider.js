import React from "react";

export const CartContext = React.createContext();

function CartProvider({ children }) {
    const [cart, setCart] = React.useState([]);

    React.useEffect(() => {
        // TODO: remove this
        // console.log(cart.map(item => ({ title: item.title, qty: item.cart_quantity })));

        // TODO: persist to local storage
    }, [cart]);

    const addToCart = React.useCallback((bookItem) => {
        const cartItemIndex = cart.findIndex(item => item.id === bookItem.id);

        if (cartItemIndex !== -1) {
            cart[cartItemIndex].cart_quantity += 1;
            setCart([...cart]);
        } else {
            setCart([...cart, { ...bookItem, cart_quantity: 1 }]);
        }

    }, [cart]);

    const removeFromCart = React.useCallback((cartItem) => {
        const cartItemIndex = cart.findIndex(item => item.id === cartItem.id);

        if (cartItemIndex === -1) {
            return;
        }

        if (cart[cartItemIndex].cart_quantity === 1) {
            cart.splice(cartItemIndex, 1);
        } else {
            cart[cartItemIndex].cart_quantity -= 1;
        }
        setCart([...cart]);

    }, [cart]);

    const clearCart = React.useCallback(() => {
        setCart([])
    }, []);

    const cartCount = React.useMemo(() => {
        let count = 0;

        for (const cartItem of cart) {
            count += cartItem.cart_quantity;
        }

        return count;
    }, [cart]);

    const cartTotal = React.useMemo(() => {
        let totalAmount = 0;

        for (const cartItem of cart) {
            totalAmount += (cartItem.price * cartItem.cart_quantity);
        }

        return totalAmount;
    }, [cart])

    return (
        <CartContext.Provider value={{ cart, cartCount, addToCart, removeFromCart, clearCart, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;
