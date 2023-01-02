import React from "react";
import styles from "../styles/Layout.module.css";
import heroImage from "../public/img/hero-img.jpg";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <img src={heroImage.src} alt="hero" />
      <div className={styles.heroContent}>
        GIBSON GUITARS COLLECTION
        <p>Rarities. Exclusives. Demos. Customized one-off guitar mods.</p>
      </div>
      <div className={styles.layer}></div>
    </div>
  );
};

export default Hero;
