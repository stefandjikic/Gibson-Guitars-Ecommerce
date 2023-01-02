import React from 'react'
import Link from 'next/link';
import styles from "../styles/Product.module.css";
import logo from '../public/icons/logo.svg'
import { urlFor } from '../lib/sanity';

const ProductCard = ({category = '', product: { image, name, slug, price }}) => {
  return (
    <div>
      <Link href={`/${category}/${slug.current}`}>
        <div className={styles.productCard}>
          <img src={urlFor(image && image[0])} height={400} width={250} alt={name} />
          <img src={logo.src} width="50px" />
          <p>{name}</p>
          <p>${price}</p>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard