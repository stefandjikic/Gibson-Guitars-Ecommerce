import React, { useState } from "react";
import Link from "next/link";
import { useStateContext } from "../../context/StateContext";
import Layout from "../../components/layout/Layout";
import { client, urlFor } from "../../lib/sanity";
import styles from "../../styles/ItemPage.module.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsCashStack } from "react-icons/bs";

const ElectricDetailsPage = ({ electric }) => {
  const { image, name, details, price } = electric;
  const [activeImage, setActiveImage] = useState(
    urlFor(image && image[0]) || ""
  );
  const { quantity, increaseQuantity, decreaseQuantity, addItemToCart, setShowCart } =
    useStateContext();

  return (
    <Layout>
      <h1 className={styles.heading}>
        <Link href="/electric">Electric</Link> / {name}
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
          <img
            height={500}
            lassName={styles.mainImage}
            src={activeImage}
            alt={name}
          />
        </div>
        <div className={styles.priceBlock}>
          <h1>{name}</h1>
          <p className={styles.price}>${price}</p>
          <p className="mb-sm">Quantity:</p>
          <div className="flex">
            <button onClick={decreaseQuantity} className={styles.btnQnty}>
              -
            </button>
            <div className={styles.btnQnty}>{quantity}</div>
            <button onClick={increaseQuantity} className={styles.btnQnty}>
              +
            </button>
          </div>
          <button
            onClick={() => addItemToCart(electric, quantity)}
            className={styles.buyButton}
          >
            {" "}
            <AiOutlineShoppingCart className="mx-sm" /> Add to Cart
          </button>
          <button onClick={() => {
             addItemToCart(electric, quantity)
             setShowCart(true);
          }} className={styles.buyButton}>
            {" "}
            <BsCashStack className="mx-sm" /> Buy Now
          </button>
        </div>
      </div>
      <p className={styles.details}>{details}</p>
    </Layout>
  );
};

export default ElectricDetailsPage;

export async function getStaticPaths() {
  const query = `*[_type == "electric"] {
    slug {
      current
    }
  }`;
  const electric = await client.fetch(query);
  const paths = electric.map((el) => ({
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
  const electricQuery = `*[_type == "electric" && slug.current == '${slug}'][0]`;
  const electric = await client.fetch(electricQuery);

  return {
    props: {
      electric,
    },
  };
}
