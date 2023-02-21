import { useState } from "react";
import CartContext from "./Cart-Context";

const CartProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const addItemToCartHandler = (item) => {
    setTotalAmount(totalAmount + item.price * item.quantity);

    const existingCartItemIndex = cartItems.findIndex(
      (itm) => itm.id === item.id
    );
    const existingCartItem = cartItems[existingCartItemIndex];
    if (existingCartItem) {
      cartItems[existingCartItemIndex].quantity =
        existingCartItem.quantity + item.quantity;
      setCartItems(cartItems);
    } else {
      setCartItems([...cartItems, item]);
    }
  };
  const removeItemFromCartHandler = (id) => {
    const existingCartItemIndex = cartItems.findIndex((itm) => itm.id === id);
    const existingCartItem = cartItems[existingCartItemIndex];
    setTotalAmount(totalAmount - existingCartItem.price);
    if (existingCartItem.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.id !== id));
    } else {
      cartItems[existingCartItemIndex].quantity = existingCartItem.quantity - 1;
      setCartItems(cartItems);
    }
  };

  const cartContext = {
    items: cartItems,
    totalAmount: totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
