"use client"
import React,{useState} from 'react'
import styles from './SideMenu.module.css';
import Link from 'next/link';
import { CgClose } from 'react-icons/cg';
import LogoutUser from '../logoutUser/LogoutUser';
import Categories from '../categories/Categories';
import { useUserStore } from '@/store/userStore';

const SideMenu:React.FC = () => {

    

    const [showLogout, setShowLogOut] = useState<boolean>();
    const [showCategoryList, setShowCategoryList] = useState<boolean>();




  return (
    <div className={styles.side_menu}>
        <div className={styles.side_menu_container}>
        <Link href="/book" className={styles.links}> Home </Link>
            <p onClick={() => setShowCategoryList(!showCategoryList)} className={styles.links}> Categories </p>
            <p onClick={() => setShowLogOut(true)} className={styles.links}> Logout </p>

        </div>

        {
            showLogout && 
            <LogoutUser setShowLogOut={setShowLogOut}/>
        }
        {
            showCategoryList && 
            <Categories setShowCategoryList={setShowCategoryList}/>
        }
    </div>
  )
}

export default SideMenu
