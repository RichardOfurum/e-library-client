"use client"
import React, { useState } from 'react'
import styles from './MobileNav.module.css';
import Link from 'next/link';
import LogoutUser from '../logoutUser/LogoutUser';
import { BiCloset } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';
import Categories from '../categories/Categories';


type Props = {
    setShowMobileNav: (setShowMobileNav: boolean) => void;
}

const MobileNav:React.FC<Props> = ({setShowMobileNav}) => {

    const [showCategoryList, setShowCategoryList] = useState<boolean>();

    const [showLogout, setShowLogOut] =  useState<boolean>(false);

    
  return (
    <div className={styles.mobile_nav}>
        <div className={styles.mobile_nav_container}>
            <Link 
                onClick={() => setShowMobileNav(false)}
                href="/book" className={styles.links}> Home </Link>


            {/* <Link href="/categories" className={styles.links}> Categories </Link> */}

            <p onClick={() => setShowCategoryList(!showCategoryList)} className={styles.links}> Categories </p>


            <p onClick={() => setShowLogOut(true)} className={styles.links}> Logout </p>

            <CgClose style={{cursor:"pointer"}} onClick={() => setShowMobileNav(false)}/>
        </div>

        {
            showLogout && 
            <LogoutUser setShowLogOut={setShowLogOut}/>
        }

        {
            showCategoryList && 
            <Categories setShowCategoryList={setShowCategoryList} setShowMobileNav={setShowMobileNav}/>
        }
    </div>
  )
}

export default MobileNav
