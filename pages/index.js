import styles from "../styles/Home.module.css";
import { client } from "../lib/sanity";
import Layout from "../components/layout/Layout";
import Hero from "../components/Hero";

export default function Home({ electric, acoustic}) {
  // console.log(electric, acoustic, 'props');
  return (
    <Layout>
      <Hero />
    </Layout>
  );
}

export async function getServerSideProps() {
  const electricQuery = '*[_type == "electric"]';
  const electric = await client.fetch(electricQuery);

  const acousticQuery = '*[_type == "acoustic"]';
  const acoustic = await client.fetch(acousticQuery);

  return {
    props: {
      electric,
      acoustic,
    },
  };
}
