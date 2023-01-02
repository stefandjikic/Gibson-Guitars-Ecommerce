import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import styles from "../../styles/Layout.module.css";
import logo from "../../public/icons/logo.svg";

const Navbar = () => {
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
        <div className="mx-sm">
          <Link href="/electric">Electric</Link>
        </div>
        <div className="mx-sm">
          <Link href='/acoustic'>Acoustic</Link>
        </div>
        <div className="mx-sm">
          <Link href='/bass'>Bass</Link>
        </div>
      </div>
      <button>
        <AiOutlineShopping />
        <span>1</span>
      </button>
    </nav>
  );
};

export default Navbar;
