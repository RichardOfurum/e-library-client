'use client'
import React,{useState, useEffect} from 'react';
import styles from './BookList.module.css'
import Book from '../book/Book';
import { useUserStore } from '@/store/userStore';
import BigLoader from '../bigLoader/BigLoader';
import axios from 'axios';
import SmallLoader from '../smallLoader/SmallLoader';
// type Props ={

// }

const BookList:React.FC = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [erroMessage, setErrorMessage] = useState<string>();

  const[userToken, setUserToken] = useState<string>();

  const [disableLoadMore, setDisableLoadMore] = useState<boolean>(false);

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5); // Set the limit to 2

  const [books, setBooks] = useState<any[]>([]);


  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const getUserToken = useUserStore(state => state.user_data.token) 


  // const handleFetchBooks = async() =>{
       
  //   setLoading(true);

  //   const url = baseUrl + `book?page=${page}&limit=${limit}/`;
  //   // const url = baseUrl + `book?page=${pageNumber+1}&limit=${1}/`;

  //   console.log(url)


  //       const token = userToken; // Replace with your authentication token
    
  //       const requestOptions = {
  //           method: 'GET',
  //           headers: {'Content-Type': 'application/json',
  //               'Authorization': `Bearer ${token}`
  //           },
            
  //       };

  //       try {

  //           const response = await fetch(url, requestOptions);
        
  //           //   alert("working")
  //           if (!response.ok) {
  //               setLoading(false)
  //               // throw new Error(`Request failed with status ${response.status}`);
  //               console.log("something went wrong")
  //           }

  //           const data = await response.json();

  //           if (data.statusCode == 400) {
  //                   setErrorMessage(data.message)
  //                   setLoading(false)
  //           }else{
  //               if (data.statusCode == 500) {
  //                   setLoading(false)
  //                   setErrorMessage("please check your internet connection");
  //               }else{
  //                   setLoading(false);
                    
  //                   if (data.lenght < limit) {
  //                       alert("end")
  //                   }

  //                   setBooks(prevBooks => [...prevBooks, ...data]);

  //                   // console.log(updatedData)
                    
  //                   // setSuccessMessage("New User Added")
  //               }
                    
  //           }

  //       console.log(data); // Process the data here
        
  //       } catch (error) {
  //           console.error('Error:', error);
  //           setErrorMessage("something went wrong, please reload the page")
  //       }
    
  //   }

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get<any[]>(`http://localhost:4000/api/book?page=${page}&limit=${limit}`);
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
              (books.length <= 0)?
              <div className={styles.load_more_container}>
                <BigLoader dark={true}/>
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
