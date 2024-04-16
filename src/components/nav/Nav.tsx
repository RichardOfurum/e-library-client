"use client"
import React,{useState} from 'react';
import styles from './Nav.module.css';
import { BiSearch, BiUser } from 'react-icons/bi';
import { useUserStore } from '@/store/userStore';
import MobileNav from './MobileNav';
import Link from 'next/link';
import SearchBox from '../searchBox/SearchBox';

const Nav:React.FC = () => {

    const [showMobileNav, setShowMobileNav] = useState<boolean>(false);

    const [showSearchBox, setShowSearchBox] = useState<boolean>(false);

    const username = useUserStore(state => state.user_data.username);

    const isAdmin = useUserStore((state) => state.user_data.isAdmin);
  return (
    <div className={styles.nav}>
        <div className={styles.nav_container}>
            <div className={styles.left}>
                <h3>E-Library</h3>

                <div 
                    onClick={() =>{setShowSearchBox(!showSearchBox)}}
                    className={styles.search_box}>
                    <BiSearch className={styles.search_icon}/>
                    <p>Search for title, author or category</p>
                </div>

                <BiSearch 
                    onClick={() =>{setShowSearchBox(!showSearchBox)}}
                    className={styles.search_icon_mobile}/>
            </div>

            <div>
                {
                    isAdmin &&
                    <Link 
                        style={{textDecoration:"none", color:"darkgray"}}
                    href="/admin">Admin</Link>
                }
            </div>
           
            <div className={styles.right}>
                <p>{username}</p>
                <BiUser/>
            </div>
            
            <div className={styles.right_mobile} onClick={() => setShowMobileNav(!showMobileNav)}>
                <p>{username}</p>
                <BiUser/>
            </div>
            
        </div>

        {/* display mobile nav */}

        {
            showMobileNav &&
            <MobileNav setShowMobileNav={setShowMobileNav}/>
        }
        
        {
            showSearchBox &&
            
            <SearchBox setShowSearchBox={setShowSearchBox}/>
        }
    </div>
  )
}

export default Nav
