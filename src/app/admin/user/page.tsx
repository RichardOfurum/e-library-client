'use client'
import Back from '@/components/back/Back'
import React, { useEffect, useState } from 'react'
import styles from './User.module.css';
import Delete from '@/components/delete/Delete';
import { useUserStore } from '@/store/userStore';
import { Span } from 'next/dist/trace';
import axios from 'axios';
import BigLoader from '@/components/bigLoader/BigLoader';
import SmallLoader from '@/components/smallLoader/SmallLoader';
import Link from 'next/link';
import { BiPlus } from 'react-icons/bi';

const UsersPage = () => {

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const userToken = useUserStore(state => state.user_data.token);

    const [getUserToken, setGetUserToken] = useState<string>();

    
    const [users, setUsers] = useState<any[]>([]);

    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(50); // Set the limit to 2

    

    const [loading, setLoading] = useState<boolean>(false);
    const [loadMore, setLoadMore] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");

    const [disableLoadMore, setDisableLoadMore] = useState<boolean>(false);

    const fetchUsers = async () => {
        setLoading(true);

        const token = getUserToken;
        const url = `${baseUrl}user?page=${page}&limit=${limit}` 

        try {
          const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
          }

          const response = await axios.get<any[]>(url, config);
          // const response = await axios.get(`${baseUrl}book?page=${page}&limit=${limit}`, config);
          const newUsers = response.data;
          console.log(newUsers);

          if (newUsers.length < limit || newUsers.length <= 0) {
            setDisableLoadMore(true);
          }
          setUsers(prevUsers => [...prevUsers, ...newUsers]);
          // setBooks(newBooks); // Set books data
          setLoading(false);
        } catch (error) {
          setErrorMessage("Could not fetch data");
          setLoading(false);
          console.error('Error fetching books:', error);
        }
      };
      

    useEffect(() =>{
        setGetUserToken(userToken);
      },[]);
      
      useEffect(() => {
        fetchUsers()
      }, [page]);

  return (
    <div className={styles.users}>
        <Back/>
        <div className={styles.page_title}>
            <h3>User list</h3>
            <div className={styles.create}>
                <Link 
                className={styles.create_link}
                href="/admin/user/createUser">
                    <BiPlus/> user</Link>
      
                <Link 
                className={styles.create_link}
                href="/admin/user/createAdmin"><BiPlus/> admin</Link>
            </div>
        </div>
        <div className={styles.user_container}>
        {
              (users.length <= 0 && loading) &&

              <div className={styles.load_more_container}>
                <BigLoader dark={true}/>
              </div>
          }
            
            {
                users.map((user:any) => (
                    <div 
                        key={user._id}
                        className={styles.list}
                    >
                        <p className={styles.username}>{user.username}</p>

                        
                        <p>
                            {
                                user.isAdmin == true ?(<span>Admin</span>): (<span>Student</span>)
                            }
                        </p>
                        <Delete route='user' id={user._id} />
                    </div>
                ))
                
            }

            <div className={styles.load_more_container}>
                {
                    !disableLoadMore &&
                    <button onClick={() => setPage(prevPage => prevPage + 1)} className={styles.load_more}>
                    {
                        loading ?
                        <SmallLoader dark={false}/> 
                        : <span>Load More</span>
                    }
                    </button>
                }
            </div>

        </div>
    </div>
  )
}

export default UsersPage
