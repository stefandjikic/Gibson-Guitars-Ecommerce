import React from "react";
import Link from "next/link";
import { useStateContext } from "../../context/StateContext";
import { AiOutlineShopping } from "react-icons/ai";
import { FaGuitar } from "react-icons/fa";
import { GiGuitarBassHead, GiGuitarHead } from "react-icons/gi";
import styles from "../../styles/Layout.module.css";
import logo from "../../public/icons/logo.svg";
import ShoppingCart from "../ShoppingCart";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantity } = useStateContext()
  return (
    <nav className={styles.navbar}>
      <div className="flex align-items-center">
        <Link href="/">
          <img
            style={{ width: "50px", marginRight: "50px" }}
            src={logo.src}
            alt="Gibson Guitars"
          />
        </Link>
        <div className={styles.navLinksWrapper}>
          <div style={{ textAlign: "center" }} className="mx-sm">
            <div className={styles.navIcon}>
              <GiGuitarHead />
            </div>
            <Link href="/electric">Electric</Link>
          </div>
          <div style={{ textAlign: "center" }} className="mx-sm">
            <div className={styles.navIcon}>
              <FaGuitar />
            </div>
            <Link href="/acoustic">Acoustic</Link>
          </div>
          <div style={{ textAlign: "center" }} className="mx-sm">
            <div className={styles.navIcon}>
              <GiGuitarBassHead />
            </div>
            <Link href="/bass">Bass</Link>
          </div>
        </div>
      </div>
      <button onClick={() => setShowCart(!showCart)} className={styles.cartButton}>
        <AiOutlineShopping size='24px'/>
        <span className={styles.cartQnty}>{totalQuantity}</span>
      </button>
      {showCart && <ShoppingCart />}
    </nav>
  );
};

export default Navbar;
