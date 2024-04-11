"use client"
import React,{useState} from 'react'
import styles from './SideMenu.module.css';
import Link from 'next/link';
import { CgClose } from 'react-icons/cg';
import LogoutUser from '../logoutUser/LogoutUser';

const SideMenu:React.FC = () => {
    const [showLogout, setShowLogOut] = useState<boolean>();
  return (
    <div className={styles.side_menu}>
        <div className={styles.side_menu_container}>
        <Link href="/book" className={styles.links}> Home </Link>
            <Link href="/categories" className={styles.links}> Categories </Link>
            <p onClick={() => setShowLogOut(true)} className={styles.links}> Logout </p>

        </div>

        {
            showLogout && 
            <LogoutUser setShowLogOut={setShowLogOut}/>
        }
    </div>
  )
}

export default SideMenu
