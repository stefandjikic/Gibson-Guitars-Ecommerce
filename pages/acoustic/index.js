import React from "react";
import Layout from "../../components/layout/Layout";
import ProductCard from "../../components/ProductCard";
import { client } from "../../lib/sanity";
import styles from "../../styles/Product.module.css";

const AcousticPage = ({ acoustic = [] }) => {
  return (
    <Layout>
      <h2 className="my-md">Explore the Gibson Acoustic Guitars collection</h2>
      <div className={styles.productGrid}>
        {acoustic?.length === 0 && (
          <h2 style={{ textAlign: "center" }}>No data.</h2>
        )}
        {acoustic?.map((product) => (
          <ProductCard
            key={product?._id}
            category="acoustic"
            product={product}
          />
        ))}
      </div>
    </Layout>
  );
};

export default AcousticPage;

export async function getServerSideProps() {
  const acousticQuery = '*[_type == "acoustic"]';
  const acoustic = await client.fetch(acousticQuery);

  return {
    props: {
      acoustic,
    },
  };
}
