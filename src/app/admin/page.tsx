'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import axios from 'axios';
import { useUserStore } from '@/store/userStore';
import SmallLoader from '@/components/smallLoader/SmallLoader';
import styles from './Admin.module.css'
import { BiPlus, BiUser } from 'react-icons/bi';
import BookList from '@/components/books/BookList';


const AdminPage = () => {

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const [totalUsers, setTotalUsers] = useState<number>();

  const [totalCategories, setTotalCategories] = useState<number>();

  const [totalBooks, setTotalBooks] = useState<number>();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const userToken = useUserStore(state => state.user_data.token);

    const [getUserToken, setGetUserToken] = useState<string>();

    useEffect(() =>{
      setGetUserToken(userToken);
    },[]);

  useEffect(() => {
    const fetchData = async () => {
      const token = getUserToken;
      const urluser = `${baseUrl}user/total`;
      const urlcategory = `${baseUrl}category/total`;
      const urlbook = `${baseUrl}book/total`;
      try {
        const config = {
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
          }
        }

        // Make API requests to three endpoints simultaneously
        const [responseUser, responseCategory, responseBook] = await Promise.all([
          axios.get<any>(urluser, config),
          axios.get<any>(urlcategory, config),
          axios.get<any>(urlbook, config),
        ]);

        setTotalUsers(responseUser.data);
        setTotalCategories(responseCategory.data);
        setTotalBooks(responseBook.data);
        setLoading(false);

      } catch (error) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      // Any cleanup code if needed
    };
  }, []);

  if (loading) {
    return <div style={{height:"70vh", width:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>  
      <SmallLoader dark={true}/>
    </div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.dashboard}>
      <h3>Admin area</h3>
      <div className={styles.dashboard_container}>
          

          <div className={styles.totals}>

              <div className={`${styles["user"]} ${styles["total"]}`}>
                  <div className={styles.left}>
                      <BiUser className={styles.icon}/>
                      <div>
                        <span>Users</span>
                        <span>{totalUsers}</span>
                      </div>
                  </div>
                  <div className={styles.right}>
                      <Link
                        className={styles.add}
                        href="/admin/user">+</Link>
                  </div>
              </div>
              
              <div className={`${styles["category"]} ${styles["total"]}`}>
                  <div className={styles.left}>
                      <BiUser className={styles.icon}/>
                      <div>
                        <span>Categories</span>
                        <span>{totalCategories}</span>
                      </div>
                  </div>
                  <div className={styles.right}>
                      <Link
                        className={styles.add}
                        href="/admin/createCategory">+</Link>
                  </div>
              </div>
              
              <div className={`${styles["book"]} ${styles["total"]}`}>
                  <div className={styles.left}>
                      <BiUser className={styles.icon}/>
                      <div>
                        <span>Books</span>
                        <span>{totalBooks}</span>
                      </div>
                  </div>
                  <div className={styles.right}>
                      <Link
                        className={styles.add}
                        href="/admin/addbook">+</Link>
                  </div>
              </div>
                 

          </div>

          

          {/* <Link href="/admin/addbook">Add Book</Link>
          <br />
          <br />
          <Link href="/admin/user/createUser">create user</Link>
          <br />
          <br />
          <Link href="/admin/user/createAdmin">create admin</Link>
          <br />
          <br />
          <Link href="/admin/createCategory">create category</Link>
          <br />
          <br />
          <Link href="/admin/user">Users</Link> */}
      </div>

      <BookList route="book?"/>

    </div>
  )
}

export default AdminPage
