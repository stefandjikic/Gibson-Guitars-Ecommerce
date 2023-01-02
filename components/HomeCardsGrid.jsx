import React from "react";
import styles from "../styles/Home.module.css";
import { FaShippingFast } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";

const HomeCardsGrid = () => {
  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <div className="flex justify-center align-items-center">
          <FaShippingFast size="60px" />
        </div>
        <h2>FREE SHIPPING</h2>
        <p>For online orders over 50$.</p>
      </div>
      <div className={styles.card}>
        <div className="flex justify-center align-items-center">
          <MdSecurity size="60px" />
        </div>
        <h2>LIFETIME WARRANTY</h2>
        <p>Free, limited warranty on material and workmanship.</p>
      </div>
      <div className={styles.card}>
        <div className="flex justify-center align-items-center">
          <GiReceiveMoney size="60px" />
        </div>
        <h2>FINANCING AVAILABLE</h2>
        <p>Options available through Klarna at checkout.</p>
      </div>
    </div>
  );
};

export default HomeCardsGrid;
