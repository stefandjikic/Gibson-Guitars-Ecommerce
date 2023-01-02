import React from 'react'
import { AiOutlineShopping } from 'react-icons/ai'
import styles from "../../styles/Layout.module.css"
import logo from '../../public/icons/logo.svg'

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className='flex align-items-center'>
      <img style={{width: '50px', marginRight: '50px'}} src={logo.src} alt="Gibson Guitars" />
        <div className='mx-1'>Electric</div>
        <div className='mx-1'>Acoustic</div>
      </div>
      <button>
        <AiOutlineShopping />
        <span>1</span>
      </button>
    </nav>
  )
}

export default Navbar