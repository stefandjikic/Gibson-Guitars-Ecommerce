import Link from "next/link";
import React from "react";
import Layout from "../../components/layout/Layout";
import purchaseSuccess from "../../public/img/purchase.svg";
import styles from "../../styles/ShoppingCart.module.css";

const index = () => {
  return (
    <Layout>
      <div className="flex flex-col justify-center align-items-center">
        <h2 className="my-md">Thank You For Your Purchase!</h2>
        <img
          style={{ marginTop: "80px", marginBottom: "60px" }}
          src={purchaseSuccess.src}
          alt="Purchase Successful"
          height="300"
        />
        <Link href='/'>
          <button className={styles.continueButton}>Continue Shopping</button>
        </Link>
      </div>
    </Layout>
  );
};

export default index;
