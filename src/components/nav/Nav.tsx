"use client"
import React,{useState} from 'react';
import styles from './Nav.module.css';
import { BiSearch, BiUser } from 'react-icons/bi';
import { useUserStore } from '@/store/userStore';
import MobileNav from './MobileNav';

const Nav:React.FC = () => {

    const [showMobileNav, setShowMobileNav] = useState<boolean>(false);

    const username = useUserStore(state => state.user_data.username);
  return (
    <div className={styles.nav}>
        <div className={styles.nav_container}>
            <div className={styles.left}>
                <h3>E-Library</h3>

                <div className={styles.search_box}>
                    <BiSearch className={styles.search_icon}/>
                    <p>Search for name, author or category</p>
                </div>

                <BiSearch className={styles.search_icon_mobile}/>
            </div>
           
            <div className={styles.right}>
                <p>{username}</p>
                <BiUser/>
            </div>
            
            <div className={styles.right_mobile} onClick={() => setShowMobileNav(!showMobileNav)}>
                {/* <p>{username}</p> */}
                <p>mobile</p>
                <BiUser/>
            </div>


        </div>

        {/* display mobile nav */}

        {
            showMobileNav &&
            <MobileNav setShowMobileNav={setShowMobileNav}/>
        }
    </div>
  )
}

export default Nav
