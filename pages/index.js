import styles from "../styles/Home.module.css";
import { client } from "../lib/sanity";
import Layout from "../components/layout/Layout";
import Hero from "../components/Hero";
import HomeCardsGrid from "../components/HomeCardsGrid";
import ProductCard from "../components/ProductCard";

export default function Home({ electric, acoustic, bass }) {
  // console.log(electric, acoustic, bass, 'props');
  return (
    <Layout>
      <Hero />
      <HomeCardsGrid />
      <h2 className={styles.bestSellerHeading}>Best Seller Gibson Guitars</h2>
      <h3 className={styles.subHeading}>Electric Guitars</h3>
      <div className={styles.grid}>
        {electric?.map((item) => <ProductCard key={item?._id} category='electric' product={item} />)}
      </div>
      <h3 className={styles.subHeading}>Acoustic Guitars</h3>
      <div className={styles.grid}>
        {acoustic?.map((item) => <ProductCard key={item?._id} category='acoustic' product={item} />)}
      </div>
      <h3 className={styles.subHeading}>Bass Guitars</h3>
      <div className={styles.grid}>
        {bass?.map((item) => <ProductCard key={item?._id} category='bass' product={item} />)}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const electricQuery = '*[_type == "electric"][0...3]';
  const electric = await client.fetch(electricQuery);

  const acousticQuery = '*[_type == "acoustic"][0...3]';
  const acoustic = await client.fetch(acousticQuery);

  const bassQuery = '*[_type == "bass"][0...3]';
  const bass = await client.fetch(bassQuery);

  return {
    props: {
      electric,
      acoustic,
      bass,
    },
  };
}
