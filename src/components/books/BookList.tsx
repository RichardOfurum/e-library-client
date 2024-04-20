'use client'
import React,{useState, useEffect} from 'react';
import styles from './BookList.module.css'
import Book from '../book/Book';
import { useUserStore } from '@/store/userStore';
import BigLoader from '../bigLoader/BigLoader';
import axios from 'axios';
import SmallLoader from '../smallLoader/SmallLoader';


type Props ={
  route:string
}

const BookList:React.FC<Props> = ({route}) => {

  const [loading, setLoading] = useState<boolean>(false);
  const [erroMessage, setErrorMessage] = useState<string>();

  const[userToken, setUserToken] = useState<string>();

  const [disableLoadMore, setDisableLoadMore] = useState<boolean>(false);

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(50); // Set the limit to 2

  const [books, setBooks] = useState<any[]>([]);


  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const getUserToken = useUserStore(state => state.user_data.token) 


  

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get<any[]>(`${baseUrl}${route}page=${page}&limit=${limit}`);
      // const response = await axios.get<any[]>(`${baseUrl}book?page=${page}&limit=${limit}`);
      const newBooks = response.data;
      if(newBooks.length < limit || newBooks.length <= 0){
        setDisableLoadMore(true);
      }
      setBooks(prevBooks => [...prevBooks, ...newBooks]);
      // setBooks(newBooks); // Set books data
      setLoading(false)
    } catch (error) {
      setErrorMessage("Could not fetch data")
      setLoading(false)
      console.error('Error fetching books:', error);
    }
  };

useEffect(() =>{
  setUserToken(getUserToken);
},[]);

useEffect(() => {
  fetchBooks()
}, [page]);


  return (
    <div className={styles.books}>
        <div className={styles.books_container}>

          {
              loading &&

              <div className={styles.load_more_container}>
                <BigLoader dark={true}/>
              </div>
          }
        
            {
              (books.length <= 0)?
              <div className={styles.load_more_container}>
                <p>No record found</p>
              </div> :
              books.map((book:any) =>(
                <div 
                className={styles.book}
                key={book._id}>
                    <Book 
                        id={book._id}
                        author={book.author}
                        imageUrl={book.image}
                        title={book.title}
                    />
                </div>
              ))
            }
        </div>
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
  )
}

export default BookList
