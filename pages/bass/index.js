import React from "react";
import Layout from "../../components/layout/Layout";
import ProductCard from "../../components/ProductCard";
import { client } from "../../lib/sanity";
import styles from "../../styles/Product.module.css";

const ElectricPage = ({ bass = [] }) => {
  return (
    <Layout>
      <h2 className="my-md">Gibson Bass Guitars Collection</h2>
      <div className={styles.productGrid}>
        {bass?.length === 0 && (
          <h2 style={{ textAlign: "center" }}>No data.</h2>
        )}
        {bass?.map((product) => (
          <ProductCard
            key={product?._id}
            category="bass"
            product={product}
          />
        ))}
      </div>
    </Layout>
  );
};

export default ElectricPage;

export async function getServerSideProps() {
  const bassQuery = '*[_type == "bass"]';
  const bass = await client.fetch(bassQuery);

  return {
    props: {
      bass,
    },
  };
}
