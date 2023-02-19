import React, { useRef } from "react";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/sanity";
import {
  AiOutlineShoppingCart,
  AiOutlineLeft,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import styles from "../styles/ShoppingCart.module.css";
import getStripe from "../lib/stripe";

const ShoppingCart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantity,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    removeCartItems,
  } = useStateContext();

  const handlePayment = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) {
      return;
    } else {
      const data = await response.json();
      toast.loading("Redirecting to checkout...");
      stripe.redirectToCheckout({ sessionId: data.id });
    }
  };

  return (
    <div ref={cartRef} className={styles.cartWrapper}>
      <div className={styles.cartContainer}>
        <button
          onClick={() => setShowCart(false)}
          className={styles.cartHeading}
        >
          <AiOutlineLeft color="#fff" />
          <span className={styles.heading}>Your Cart</span>
          <span className={styles.cartNumItems}>({totalQuantity} items)</span>
        </button>

        {cartItems?.length == 0 && (
          <div className={styles.emptyCart}>
            <h2 className="mb-md">Your shopping cart is empty.</h2>
            <AiOutlineShoppingCart size={80} />
            <button
              onClick={() => setShowCart(false)}
              className={styles.continueButton}
            >
              Continue Shopping
            </button>
          </div>
        )}
        <div className={styles.cartItems}>
          {cartItems?.length > 0 &&
            cartItems?.map((item) => (
              <div key={item?._id} className={styles.cartItem}>
                <img
                  className={styles.cartItemImage}
                  src={urlFor(item?.image[0])}
                  alt={item?.name}
                />
                <div>
                  <div className="flex">
                    <p className="mx-sm">{item?.name}</p>
                    <p style={{ marginLeft: "auto" }}>${item?.price}</p>
                  </div>
                  <div className={styles.qntyWrapp}>
                    <p className="mb-sm">Quantity:</p>
                    <div className="flex justify-center align-items-center">
                      <div className="flex">
                        <button
                          onClick={() =>
                            toggleCartItemQuantity(item?._id, "dec")
                          }
                          className="cart-btn-qnty"
                        >
                          -
                        </button>
                        <div className="cart-btn-qnty">{item?.quantity}</div>
                        <button
                          onClick={() =>
                            toggleCartItemQuantity(item?._id, "inc")
                          }
                          className="cart-btn-qnty"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeCartItems(item)}
                        className={styles.deleteButton}
                      >
                        <TiDeleteOutline color="#fff" size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems && cartItems?.length > 0 && (
          <div className={styles.cartBottom}>
            <div className="flex justify-between align-items-center">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className={styles.buttonContainer}>
              <button onClick={handlePayment}>Pay</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
