'use client'
import React,{useState} from 'react'
import styles from './CreateUser.module.css'
import Back from '@/components/back/Back'
import { useUserStore } from '@/store/userStore'
import SmallLoader from '@/components/bigLoader/BigLoader'

const page = () => {

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const userToken = useUserStore(state => state.user_data.token);

    
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const[loading, setLoading] = useState<boolean>(false);

    const createUser = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        const url = baseUrl + 'auth/register/';

        const token = userToken;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ username, password })
            });
    
            if (!response.ok) {
                setLoading(false);
                setErrorMessage("faild to create user please check your data and try again or try refreshing the page");
                throw new Error(`Request failed with status ${response.status}`);
            }
    
            setLoading(false);
            console.log('User created successfully');
            setSuccessMessage("User created successfully");

            return await response.json();
        } catch (error:any) {
            setLoading(false);
            setErrorMessage("faild to create user please check your data and try again or try refreshing the page");
            console.error('Error:', error.message);
            // Handle error cases as needed
        }
    };

  return (
    <div className={styles.creaete_user}>
        <Back/>
        <h3>Create user</h3>
        <div className={styles.create_user_container}>
        
            <form onSubmit={createUser}>
                <div className={styles.input_container}>
                    <label htmlFor="username">Username</label>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} required/>
                </div>
                
                <div className={styles.input_container}>
                    <label htmlFor="password">Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required/>
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

export default page
