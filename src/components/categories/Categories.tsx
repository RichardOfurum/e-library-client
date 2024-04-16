'use client'
import React, { useEffect, useState } from 'react'
import styles from './Categories.module.css'
import Link from 'next/link'
import BookList from '../books/BookList'
import { useUserStore } from '@/store/userStore'
import { CgClose } from 'react-icons/cg'
import SmallLoader from '../smallLoader/SmallLoader'

type Props = {
    setShowCategoryList: (setShowLogOut: boolean) => void;
    setShowMobileNav?: (value: boolean) => void;
}
const Categories:React.FC<Props> = ({setShowCategoryList, setShowMobileNav}) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const userToken = useUserStore(state => state.user_data.token);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");

    const [getCategories, setGetCategories] = useState<string[]>([]);
    
    const handleFetchCategories = async () => {
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');
  
        const url = baseUrl + 'category?page=1&limit=1000/';
  
        const token = userToken; // Replace with your authentication token
        
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };
  
        try {
            const response = await fetch(url, requestOptions);
        
            if (!response.ok) {
                setLoading(false);
                console.log("Something went wrong");
                return;
            }
  
            const data = await response.json();
  
            if (data.statusCode === 400) {
                setErrorMessage(data.message);
            } else if (data.statusCode === 500) {
                setErrorMessage("Please check your internet connection");
            } else {
                setLoading(false);
                setGetCategories(data);
            }
  
            console.log(data);
        } catch (error: any) {
            console.error('Error:', error.message);
            setErrorMessage("Something went wrong, please reload the page");
        }
    };

    useEffect(() =>{
        handleFetchCategories();
    },[])

  return (
    <div className={styles.categories}>
        <div className={styles.categorie_container}>
            <CgClose onClick={() =>setShowCategoryList(false)} className={styles.close_category_list}/>
            <div className={styles.list}>
                {
                    !loading ?
                        (
                            Array.isArray(getCategories) ? (
                                getCategories.map((cat: any) => (
                                    
                                    <Link 
                                        onClick={() => {setShowCategoryList(false); setShowMobileNav && setShowMobileNav  (false)}}

                                        key={cat._id} 

                                        href={`/book/categories/${cat?.name}`}
                                        className={styles.category}
                                        >{cat?.name}

                                    </Link>
                                    
                                    
                                ))
                            ) : (
                                <p>No Category found</p>
                            )
                        ):

                        <div className={styles.load_more_container}>
                            <SmallLoader dark={true}/>
                        </div>
                    }
                   
            </div>
        </div>
    </div>
  )
}

export default Categories
