'use client'
import React, { useEffect, useState } from 'react'
import styles from './BookDetails.module.css';
import { useUserStore } from '@/store/userStore';
import axios, { AxiosResponse, AxiosError } from 'axios';
import Image from 'next/image';
import SmallLoader from '../smallLoader/SmallLoader';
import Link from 'next/link';
import { BiArrowBack } from 'react-icons/bi';
import Back from '../back/Back';

type Props ={
    id:string
}


const BookDetails:React.FC <Props> = ({id}) => {

    const [bookData, setBookData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const token = useUserStore((state) => state.user_data.token);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  
    useEffect(() => {
      const fetchBookData = async () => {
        try {
          
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
  
          const response: AxiosResponse = await axios.get(`${baseUrl}book/${id}`, config);
          setBookData(response.data);
          setLoading(false);
        } catch (error: any) {
          if (error.response) {
            // Request was made and server responded with a status code that falls out of the range of 2xx
            setError(`Server responded with status ${error.response.status}: ${error.response.data}`);
          } else if (error.request) {
            // Request was made but no response was received
            setError('No response received from server');
          } else {
            // Something else happened while setting up the request
            setError('Error setting up the request');
          }
          setLoading(false);
        }
      };
  
      fetchBookData();
  
      return () => {
        // Cleanup
      };
    }, []);
  
    if (loading) {
      return(
        <div style={{width:"100%", height:"100vh", display:"flex", alignItems:"center", justifyContent:"center"}}>
            <SmallLoader dark={true}/>
        </div>
      );
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
  return (
    <div className={styles.book_details}>
        <div className={styles.book_details_container}>
            <div className={styles.top}>
                <div className={styles.left_container}>
                
                    <Back/>

                    <div className={styles.image_container}>
                        <Image
                            className={styles.image}
                            src={bookData.image}
                            height={500}
                            width={500}
                            alt='image'
                        />
                    </div>
                    <Link 
                        className={styles.reed_book}
                        href={bookData.url} target="_blank">Read Book</Link>
                </div>
                <div className={styles.overview}>
                    <p className={styles.title}><span>Title</span> {bookData.title} </p>

                    <p className={styles.page_number}><span>Page Number</span> {bookData.pages} </p>

                    <p className={styles.author}><span>Author</span> {bookData.author} </p>

                    <p className={styles.publisher}><span>Publisher</span> {bookData.publisher} </p>

                    <p className={styles.publisher}><span>Published Date</span> {bookData.publishedDate} </p>

                    <p className={styles.publisher}><span>Description</span> {bookData.description} </p>
                    <div className={styles.categories}>
                        {
                            bookData.categories.map((
                              category:any) =>(
                                <Link 
                                    className={styles.category}
                                    href={`/book/categories/${category}`}
                                    key={category}>{category}</Link>
                            ))
                        }
                    </div>
                </div>
            </div>
            {/* <div className={styles.books}>
                books
            </div> */}
        </div>
      
    </div>
  )
}

export default BookDetails
