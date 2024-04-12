"use client"
import React,{useLayoutEffect, useState, useRef} from 'react'
import styles from './AddBook.module.css';
import { useUserStore } from '@/store/userStore';
import {storage} from '../../config';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';

const AddBook = () => {

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const userToken = useUserStore(state => state.user_data.token);

    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [getCategories, setGetCategories] = useState<string[]>([]);

    const [currentBookId, setCurrentBookId] = useState<string>();

    const [categories, setCategories] = useState<string[]>([]);
    const [title, setTitle] = useState<string>();
    const [author, setAuthor] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [publisher, setPublisher] = useState<string>();
    const [publishedDate, setPublishedDate] = useState<string>();
    const [pages, setPages] = useState<number>(0);

    const imageRef = useRef<HTMLInputElement | null>(null);
    const urlRef = useRef<HTMLInputElement | null>(null);

    const [image, setImages] = useState<string>("image");
    const [book_url, setBookUrl] = useState<string>("book");
    // const [url, setUrl] = useState<File | null>(null);

    const handleUpload = async() =>{
        // e.preventDefault();
       
        const image = imageRef.current?.files?.[0];
        const pdf = urlRef.current?.files?.[0];
        
        if (pdf) {
            setLoading(true);
            // setProgress(0);
            const imageSize = image?.size; // Get the size of the file
            const pdfSize = pdf?.size; // Get the size of the file
            console.log('File selected:', image, pdf);

            // size is less than or equal to 5MB
            if (image && image.type.startsWith('image/')) {

                if(imageSize && imageSize <= 2 * 1024 * 1024){
                    try {
                        const fileRef = ref(storage, `book_images/${image.name + Date.now()}`);

                        const snapshot = await uploadBytes(fileRef, image);
                        console.log("file Uploaded", snapshot);

                        const image_url = await getDownloadURL(snapshot.ref);

                        setImages(image_url)

                        console.log(image_url);

                    } catch (error: any) {
                        setLoading(false);
                        console.log(error?.message)
                    }
                }else{
                    setLoading(false);
                    console.log("file size too large")
                }
            }else{
                setLoading(false);
                console.log("Please select a valid image");
            }
            
            // size is less than or equal to 5MB
            if ((pdf && pdf.type === 'application/pdf')) {

                if(pdfSize <= 15 * 1024 * 1024){
                    try {
                        const fileRef = ref(storage, `book_pdfs/${pdf.name + Date.now()}`);

                        const snapshot = await uploadBytes(fileRef, pdf);
                        console.log("file Uploaded", snapshot);

                        const pdf_url = await getDownloadURL(snapshot.ref);

                        setBookUrl(pdf_url);

                        if(pdf_url){
                            updateBook();
                            console.log(categories);
                            console.log(pdf_url);
                        }
 
                    } catch (error: any) {
                        setLoading(false);
                        console.log(error?.message)
                    }
                }else{
                    setLoading(false);
                    console.log("file size too large")
                }
            }else{
                setLoading(false);
                console.log("Please select a valid pdf");
            }

            
        } else {
            setLoading(false);
            console.log('No file selected');
        }
      }


    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        const url = baseUrl + 'book/';

        const token = userToken; // Replace with your authentication token

        const body = {
            "title": title,
            "author": author,
            "description": description,
            "publisher": publisher,
            "publishedDate": publishedDate,
            "pages": pages,
            "image": image,
            "url":book_url,
            "categories": categories
        }
        
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            };

            
            try {

                const response = await fetch(url, requestOptions);
            
                //   alert("working")
                if (!response.ok) {
                    setLoading(false)
                    // throw new Error(`Request failed with status ${response.status}`);
                    console.log("something went wrong")
                }

                const data = await response.json();

                if (data.statusCode == 400) {
                        setErrorMessage(data.message)
                        setLoading(false)
                }else{
                    if (data.statusCode == 500) {
                        setLoading(false)
                        setErrorMessage("please check your internet connection");
                    }else{
                        if (data.statusCode == 401) {
                            setLoading(false)
                            setErrorMessage('unauthorized access');
                        }else{
                            setCurrentBookId(data._id)
                            setLoading(false);
                            handleUpload();
                            
                            setSuccessMessage("New Book Added")
                        }
                        
                        // setSuccessMessage("New User Added")
                    }
                        
                }

            console.log(data); // Process the data here
            
            } catch (error) {
                console.error('Error:', error);
                setErrorMessage("something went wrong, please reload the page")
            }
    }
    
    const updateBook = async() =>{
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        const url = baseUrl + `book/${currentBookId}`;

        const token = userToken; // Replace with your authentication token

        const body = {
            "image": image,
            "url":book_url,

        }
        
            const requestOptions = {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            };

            
            try {

                const response = await fetch(url, requestOptions);
            
                //   alert("working")
                if (!response.ok) {
                    setLoading(false)
                    // throw new Error(`Request failed with status ${response.status}`);
                    console.log("something went wrong")
                }

                const data = await response.json();

                if (data.statusCode == 400) {
                        setErrorMessage(data.message)
                        setLoading(false)
                }else{
                    if (data.statusCode == 500) {
                        setLoading(false)
                        setErrorMessage("please check your internet connection");
                    }else{
                        if (data.statusCode == 401) {
                            setLoading(false)
                            setErrorMessage('unauthorized access');
                        }else{
                            setCurrentBookId("")
                            setLoading(false);
                            setSuccessMessage("New Book Added")
                        }
                        
                        // setSuccessMessage("New User Added")
                    }
                        
                }

            console.log(data); // Process the data here
            
            } catch (error) {
                console.error('Error:', error);
                setErrorMessage("something went wrong, please reload the page")
            }
    }
    


    const handleFetchCategories = async() =>{
       
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        const url = baseUrl + 'category?page=1&limit=1000/';

            const token = userToken; // Replace with your authentication token
        
            const requestOptions = {
                method: 'GET',
                headers: {'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}`
                },
                
            };
 
            try {

                const response = await fetch(url, requestOptions);
            
                //   alert("working")
                if (!response.ok) {
                    setLoading(false)
                    // throw new Error(`Request failed with status ${response.status}`);
                    console.log("something went wrong")
                }

                const data = await response.json();

                if (data.statusCode == 400) {
                        setErrorMessage(data.message)
                        setLoading(false)
                }else{
                    if (data.statusCode == 500) {
                        setLoading(false)
                        setErrorMessage("please check your internet connection");
                    }else{
                        setLoading(false);

                        setGetCategories(data)
                        
                        // setSuccessMessage("New User Added")
                    }
                        
                }

            console.log(data); // Process the data here
            
            } catch (error) {
                console.error('Error:', error);
                setErrorMessage("something went wrong, please reload the page")
            }
        
    }

    useLayoutEffect(() =>{
        handleFetchCategories();
    },[]);

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
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className={styles.input_container}>
                <label htmlFor="title">Title</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder='The life of pie'required/>
            </div>
            <div className={styles.input_container}>
                <label htmlFor="author">Author</label>
                <input type="text" value={author} onChange={e => setAuthor(e.target.value)} placeholder='The life of pie'required/>
            </div>
            <div className={styles.input_container}>
                <label htmlFor="description">Description</label>
                <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder='Short description'required/>
            </div>

            <div className={styles.input_container}>
                <label htmlFor="publisher">Publisher</label>
                <input type="text" value={publisher} onChange={e => setPublisher(e.target.value)} placeholder=' John Okere'required/>
            </div>
            
            <div className={styles.input_container}>
                <label htmlFor="publishedDate">PublishedDate</label>
                <input type="date" value={publishedDate} onChange={e => setPublishedDate(e.target.value)} required/>
            </div>
            
            <div className={styles.input_container}>
                <label htmlFor="pages">Number Pages</label>
                <input type="number" value={pages} onChange={e => setPages(parseInt(e.target.value))} placeholder='105' required/>
            </div>
            
            <div className={styles.input_container}>
                <label htmlFor="categorie">Categories</label>
                {
                   
                   Array.isArray(getCategories) ? (

                        getCategories.map((cat:any) =>(
                            <div key={cat._id}>
                                <input
                                    type="checkbox"
                                    value={cat?.name}
                                    checked={categories.includes(cat?.name)}
                                    onChange={handleCheckboxChange}
                                />
                                    {cat?.name}
                            </div>
                        ))
                   ):
                   <p>No Category found</p>
                }
                
            </div>
            
            <div className={styles.input_container}>
                <label htmlFor="image">Cover Image</label>
                <input type="file" ref={imageRef} placeholder='select an image'/>
            </div>
            
            <div className={styles.input_container}>
                <label htmlFor="pdf">PDF file</label>
                <input ref={urlRef} type="file" placeholder=''/>
                {/* <input type="file" onChange={(e:any) => setUrl(e.target?.files?.[0])}  placeholder=''/> */}
            </div>
            
            <div className={styles.input_container}>
                <button type='submit'>Add Book</button>
            </div>

        </form>
    </div>
  )
}

export default AddBook
