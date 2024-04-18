'use client'
import Back from '@/components/back/Back';
import { useUserStore } from '@/store/userStore';
import React, { useState } from 'react';
import styles from './CreateUser.module.css'
import SmallLoader from '@/components/bigLoader/BigLoader';

const CreateCategoryPage = () => {
  
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const userToken = useUserStore(state => state.user_data.token);

    
    const [name, setName] = useState<string>("");

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const[loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        setSuccessMessage("");
        setErrorMessage("");
        const url = baseUrl + 'category/';

        const token = userToken;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name})
            });
    
            if (!response.ok) {
                setLoading(false);
                setErrorMessage("faild to create Category please check your data and try again or try refreshing the page");
                throw new Error(`Request failed with status ${response.status}`);
            }
    
            setLoading(false);
            setName("");
            console.log('Category created successfully');
            setSuccessMessage("Category created successfully");

            return await response.json();
        } catch (error:any) {
            setLoading(false);
            setErrorMessage("faild to create category please check your data and try again or try refreshing the page");
            console.error('Error:', error.message);
            // Handle error cases as needed
        }
    };

  return (
    <div className={styles.creaete_user}>
        <Back/>
        <h3>Create admin</h3>
        <div className={styles.create_user_container}>
        
            <form onSubmit={handleSubmit}>
                <div className={styles.input_container}>
                    <label htmlFor="name">name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} required/>
                </div>
                
                
                
                <div className={styles.input_container}>
                    {
                        errorMessage &&
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
                </div>
                
                <div className={styles.input_container}>
                    <button type='submit'>
                        {
                            loading ? (
                                <span style={{display:"flex", width:"100%", height:"100%", alignItems:"center", justifyContent:"center"}}>
                                <SmallLoader dark={false}/>
                            </span>
                                
                            ) :
                            <span >
                                Create
                            </span>
                        }
                    </button>
                </div>
            </form>
        </div>
    </div>
  
  )
}

export default CreateCategoryPage
