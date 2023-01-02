import React from "react";
import Layout from "../../components/layout/Layout";
import ProductCard from "../../components/ProductCard";
import { client } from "../../lib/sanity";
import styles from "../../styles/Product.module.css";

const ElectricPage = ({ electric = [] }) => {
  return (
    <Layout>
      <h2 className="my-md">Explore the world of Gibson Electric Guitars</h2>
      <div className={styles.productGrid}>
        {electric?.length === 0 && (
          <h2 style={{ textAlign: "center" }}>No data.</h2>
        )}
        {electric?.map((product) => (
          <ProductCard
            key={product?._id}
            category="electric"
            product={product}
          />
        ))}
      </div>
    </Layout>
  );
};

export default ElectricPage;

export async function getServerSideProps() {
  const electricQuery = '*[_type == "electric"]';
  const electric = await client.fetch(electricQuery);

  return {
    props: {
      electric,
    },
  };
}
