import React, { useState, useEffect, useContext, createContext } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => {
      if (prev - 1 < 1) {
        return 1;
      } else {
        return prev - 1;
      }
    });
  };

  const addItemToCart = (product, quantity) => {
    setTotalPrice((prevPrice) => prevPrice + product.price * quantity);
    setTotalQuantity((prevTotalQuantitie) => prevTotalQuantitie + quantity);

    const isProductInCart = cartItems?.find((item) => item.id === product._id);
  
    if(isProductInCart) {
      const updatedCartItems = cartItems.map((item) => {
        if (item._id === product.id) {
          return {
            ...item,
            quantity: item.quantity + quantity,
          }
        }
      })

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, {...product}]);
    }
    toast.success(`${quantity} ${product.name} added to cart.`)
  }

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        quantity,
        totalQuantity,
        increaseQuantity,
        decreaseQuantity,
        addItemToCart,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);