'use client'

import React, { useLayoutEffect, useState, useRef, useEffect } from 'react';
import styles from './AddBook.module.css';
import { useUserStore } from '@/store/userStore';
// import { storage } from '../../../config';
import { storage } from '@/app/config';
import { StorageReference, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import axios, { AxiosError, AxiosResponse } from 'axios';
import Back from '@/components/back/Back';
import SmallLoader from '@/components/bigLoader/BigLoader';

type Props = {
    id:string;
}

const EditBook:React.FC <Props> = ({id}) => {


    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const userToken = useUserStore(state => state.user_data.token);

    const [loading, setLoading] = useState<boolean>(false);
    const [loadingCategorie, setLoadingCategories] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [getCategories, setGetCategories] = useState<string[]>([]);

    const [categories, setCategories] = useState<string[]>([]);
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [publisher, setPublisher] = useState<string>('');
    const [publishedDate, setPublishedDate] = useState<string>('');
    const [pages, setPages] = useState<number>(0);

    const imageRef = useRef<HTMLInputElement | null>(null);
    const urlRef = useRef<HTMLInputElement | null>(null);

    const [image, setImage] = useState<string>('');
    const [bookUrl, setBookUrl] = useState<string>('');



    const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent the default form submission
      
        setLoading(true);
      
        const imageFile = imageRef.current?.files?.[0];
        const pdfFile = urlRef.current?.files?.[0];
      
        if (imageFile) {
            try {
                const imageRef = ref(storage, `book_images/${imageFile.name + Date.now()}`);
        
                const imageSnapshot = await uploadBytes(imageRef, imageFile as Blob);
        
                const imageUrl = await getDownloadURL(imageSnapshot.ref);
        
                setImage(imageUrl);

                // setTimeout(() =>{
                //     handleSubmitWithImage();
                // },3000);
                
                // If image upload process is successful, call handleSubmit
             
                setSuccessMessage("Image uploaded");
            } catch (error: any) {
                setLoading(false);
                setErrorMessage(error?.message);
                console.log(error?.message);
                return;
            }
        } else {
            setLoading(false);
            console.log('Please select an image file');
        }
        
        // Handle PDF file upload
        if (pdfFile) {
            try {
                const pdfRef = ref(storage, `book_pdfs/${pdfFile.name + Date.now()}`);
        
                const pdfSnapshot = await uploadBytes(pdfRef, pdfFile as Blob);
        
                const pdfUrl = await getDownloadURL(pdfSnapshot.ref);
        
                setBookUrl(pdfUrl);
                
                // setTimeout(() =>{
                //     handleSubmitWithPdf();
                // },3000);
                // If PDF upload process is successful, call handleSubmit
                
        
                setSuccessMessage("PDF uploaded");
            } catch (error: any) {
                setLoading(false);
                setErrorMessage(error?.message);
                console.log(error?.message);
                return;
            }

           
        } else {
            setLoading(false);
            console.log('Please select a PDF file');
        }

        handleSubmit();


    };


    const handleSubmit = async () => {

        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');
    
        const url = baseUrl + 'book/'+ id;
    
        const token = userToken; // Replace with your authentication token

        const body = {
            title,
            author,
            description,
            publisher,
            publishedDate,
            pages,
            categories
        };

        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });
    
            if (!response.ok) {
                setLoading(false);
                throw new Error(`Request failed with status ${response.status}`);
            }
            
            setLoading(false);
            setSuccessMessage("Record updated");

            console.log('Record updated');
            const data = response.json()
            console.log(data);

            
        } catch (error:any) {
            setLoading(false);
            console.log("something went wrong");

            setErrorMessage("something went wrong, please reload the page and try again");
            console.error('Error:', error.message);
            // Handle error cases as needed
        }
};

const handleSubmitWithImage = async () => {

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    const url = baseUrl + 'book/'+ id;

    const token = userToken; // Replace with your authentication token

    const body = {
        title,
        author,
        description,
        publisher,
        publishedDate,
        pages,
        image,

        categories
    };

    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            setLoading(false);
            throw new Error(`Request failed with status ${response.status}`);
        }
        
        setLoading(false);
        setSuccessMessage("Record updated");

        console.log('Record updated');
        const data = response.json()
        console.log(data);

        
    } catch (error:any) {
        setLoading(false);
        console.log("something went wrong");

        setErrorMessage("something went wrong, please reload the page and try again");
        console.error('Error:', error.message);
        // Handle error cases as needed
    }
};

const handleSubmitWithPdf = async () => {

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    const url = baseUrl + 'book/'+ id;

    const token = userToken; // Replace with your authentication token

    const body = {
        title,
        author,
        description,
        publisher,
        publishedDate,
        pages,
        url: bookUrl,
        categories
    };

    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            setLoading(false);
            throw new Error(`Request failed with status ${response.status}`);
        }
        
        setLoading(false);
        setSuccessMessage("Record updated");

        console.log('Record updated');
        const data = response.json()
        console.log(data);

        
    } catch (error:any) {
        setLoading(false);
        console.log("something went wrong");

        setErrorMessage("something went wrong, please reload the page and try again");
        console.error('Error:', error.message);
        // Handle error cases as needed
    }
};
    

    const handleFetchCategories = async () => {
        setLoadingCategories(true);
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
                setLoadingCategories(false);
                console.log("Something went wrong");
                return;
            }

            const data = await response.json();

            if (data.statusCode === 400) {
                setErrorMessage(data.message);
            } else if (data.statusCode === 500) {
                setErrorMessage("Please check your internet connection");
            } else {
                setLoadingCategories(false);
                setGetCategories(data);
            }

            console.log(data);
        } catch (error: any) {
            console.error('Error:', error.message);
            setErrorMessage("Something went wrong, please reload the page");
        }
    };

    // useEffect(() =>{
    //     if((image.length > 0) && (bookUrl.length > 0) ){
    //         handleSubmit();
    //     }
    // },[image, bookUrl]);

    useLayoutEffect(() => {
        handleFetchCategories();
    }, []);

    // Handler function to toggle selected checkbox values
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;

        // If checkbox is checked, add value to selectedValues array
        // If checkbox is unchecked, remove value from selectedValues array
        if (checked) {
            setCategories([...categories, value]);
        } else {
            setCategories(categories.filter(val => val !== value));
        }
    };

    useEffect(() => {
        const fetchBookData = async () => {
            // alert("richard")
        const token = userToken; 
          try {
            
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
        
                const response: AxiosResponse = await axios.get(`${baseUrl}book/${id}`, config);
                // setBookData(response.data);
                const data = response.data;

                setTitle(data.title);
                setAuthor(data.author);
                setDescription(data.description);
                setPublisher(data.publishedDate);
                setPublishedDate(data.publishedDate);
                setPages(data.pages);            
                setCategories(data.categories);
                

                setLoading(false);
          } catch (error: any) {
            if (error.response) {
              // Request was made and server responded with a status code that falls out of the range of 2xx
              setErrorMessage(`Server responded with status ${error.response.status}: ${error.response.data}`);
            } else if (error.request) {
              // Request was made but no response was received
              setErrorMessage('No response received from server');
            } else {
              // Something else happened while setting up the request
              setErrorMessage('Error setting up the request');
            }
            setLoading(false);
          }
        };
    
        fetchBookData();
    
        return () => {
          // Cleanup
        };
      }, []);


      useEffect(() =>{
        if (bookUrl.length > 1) {
            handleSubmitWithPdf()
        }
      },[bookUrl]);
      
      useEffect(() =>{
        if (image.length > 1) {
            handleSubmitWithImage();
        }
      },[image]);

    return (
        <div className={styles.add_book}>

            <Back/>

            <h3>Edit book</h3>

            <div className={styles.add_book_container}>

                <form onSubmit={handleUpload}>
                    <div className={styles.input_container}>
                        <label htmlFor="title">Title</label>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="The Life of Pi" required/>
                    </div>
                    <div className={styles.input_container}>
                        <label htmlFor="author">Author</label>
                        <input type="text" value={author} onChange={e => setAuthor(e.target.value)} placeholder="John Doe" required/>
                    </div>
                    <div className={styles.input_container}>
                        <label htmlFor="description">Description</label>
                        <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Short description" />
                    </div>

                    <div className={styles.input_container}>
                        <label htmlFor="publisher">Publisher</label>
                        <input type="text" value={publisher} onChange={e => setPublisher(e.target.value)} placeholder="Publisher" />
                    </div>
                    
                    <div className={styles.input_container}>
                        <label htmlFor="publishedDate">Published Date</label>
                        <input type="date" value={publishedDate} onChange={e => setPublishedDate(e.target.value)} />
                    </div>
                    
                    <div className={styles.input_container}>
                        <label htmlFor="pages">Number of Pages</label>
                        <input type="number" value={pages} onChange={e => setPages(parseInt(e.target.value))} placeholder="105" required/>
                    </div>
                    
                    <div className={styles.input_container}>
                        <label htmlFor="categories">Categories</label>
                        <div className={styles.categories}>
                            
                                {   !loadingCategorie ?
                                    (
                                        Array.isArray(getCategories) ? (
                                            getCategories.map((cat: any) => (
                                                <div key={cat._id}
                                                    className={styles.category}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        value={cat?.name}
                                                        checked={categories.includes(cat?.name)}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                    {cat?.name}
                                                </div>
                                            ))
                                        ) : (
                                            <p>No Category found</p>
                                        )
                                    ) :(
                                        <SmallLoader dark={true}/>
                                    )
                                }
                        </div>
                    </div>
                    
                    <div className={styles.input_container}>
                        <label htmlFor="image">Cover Image</label>
                        <input type="file" ref={imageRef} accept="image/*" />
                    </div>
                    
                    <div className={styles.input_container}>
                        <label htmlFor="pdf">PDF file</label>
                        <input type="file" ref={urlRef} accept=".pdf" />
                    </div>

                    {
                        errorMessage.length > 0 &&
                        <p style={{color:"red"}}>
                            {errorMessage}
                        </p>
                    }
                    {
                       
                        successMessage &&
                        <p style={{color:"green"}}>
                            {successMessage}
                        </p>
                        
                    }
                    
                    <div className={styles.input_container}>
                        <button type="submit">
                            {
                                loading ? ( 
                                    <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                                        <SmallLoader dark={false}/>
                                    </div>
                                ) : (
                                    <span>
                                        Update Book
                                    </span>
                                )
                            }
                            
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default EditBook;

