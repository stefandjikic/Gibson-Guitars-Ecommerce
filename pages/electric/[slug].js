import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { client, urlFor } from "../../lib/sanity";
import styles from "../../styles/ItemPage.module.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Link from "next/link";

const ElectricDetailsPage = ({ electric }) => {
  const { image, name, details, price } = electric;
  const [activeImage, setActiveImage] = useState(
    urlFor(image && image[0]) || ""
  );

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
          <img height={500} lassName={styles.mainImage} src={activeImage} alt={name} />
        </div>
        <div className={styles.priceBlock}>
          <h1>{name}</h1>
          <p className={styles.price}>${price}</p>
          <button>
            {" "}
            <AiOutlineShoppingCart /> Add to cart
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
