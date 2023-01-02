import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import styles from "../../styles/Layout.module.css";

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Gibson Guitars Shop</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Navbar />
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;