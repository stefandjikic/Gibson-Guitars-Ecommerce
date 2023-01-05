import React, { useState } from "react";
import Link from "next/link";
import Layout from "../../components/layout/Layout";
import { client, urlFor } from "../../lib/sanity";
import styles from "../../styles/ItemPage.module.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import {BsCashStack } from 'react-icons/bs'

const AcousticDetailsPage = ({ acoustic }) => {
  const { image, name, details, price } = acoustic;
  const [activeImage, setActiveImage] = useState(
    urlFor(image && image[0]) || ""
  );

  return (
    <Layout>
      <h1 className={styles.heading}>
        <Link href="/acoustic">Acoustic</Link> / {name}
      </h1>
      <div className={styles.grid}>
        <div className={styles.imageWrapper}>
          <div className={styles.imagesBlock}>
            {image?.map((img) => (
              <img
                onClick={() => setActiveImage(urlFor(img))}
                src={urlFor(img)}
                width={70}
                alt="product"
              />
            ))}
          </div>
          <img height={500} className={styles.mainImage} src={activeImage} alt={name} />
        </div>
        <div className={styles.priceBlock}>
          <h1>{name}</h1>
          <p className={styles.price}>${price}</p>
          <p className="mb-sm">Quantity:</p>
          <div className="flex">
            <button className={styles.btnQnty}>-</button>
            <div className={styles.btnQnty}>0</div>
            <button className={styles.btnQnty}>+</button>
          </div>
          <button className={styles.buyButton}>
            {" "}
            <AiOutlineShoppingCart className="mx-sm" /> Add to Cart
          </button>
          <button className={styles.buyButton}>
            {" "}
            <BsCashStack className="mx-sm" /> Buy Now
          </button>
        </div>
      </div>
      <p className={styles.details}>{details}</p>
    </Layout>
  );
};

export default AcousticDetailsPage;

export async function getStaticPaths() {
  const query = `*[_type == "acoustic"] {
    slug {
      current
    }
  }`;
  const acoustic = await client.fetch(query);
  const paths = acoustic.map((el) => ({
    params: {
      slug: el.slug.current,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const acousticQuery = `*[_type == "acoustic" && slug.current == '${slug}'][0]`;
  const acoustic = await client.fetch(acousticQuery);

  return {
    props: {
      acoustic,
    },
  };
}
