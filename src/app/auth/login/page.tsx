'use client'
import React,{useState, ChangeEvent, useLayoutEffect, useEffect } from 'react'
import styles from './Login.module.css';
import Image from 'next/image';
import { IoIosArrowRoundBack } from "react-icons/io";
import Link from 'next/link';
import { useUserStore } from '@/store/userStore';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import SmallLoader from '@/components/smallLoader/SmallLoader';




// import { usePathname } from 'next/navigation'

const Login = () => {

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const router = useRouter();
    

    const [loggedIn, setLoggedIn] = useState<boolean>();
    const [admin, setAdmin] = useState<boolean>();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");


const isLoggedin = useUserStore((state) => state.user_data.isLoggedin);
const isAdmin = useUserStore((state) => state.user_data.isAdmin);

const loginUserAndAdmin = () =>{
   if(loggedIn){
        router.back();
    }
}

  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) =>{
      e.preventDefault();
      setError(false);
        setLoading(true);

        const url = baseUrl + 'auth/login';

        const body = {
            username: username,
            password: password,
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }

        try {
            const response = await fetch(url, requestOptions);

            if (!response.ok) {
                setError(true)
                console.log(response)
                console.log("please check ur username and password");
                setError(true);
                setErrorMessage("please check ur username and password");
                setLoading(false);
            } else {
                const data = await response.json();

                if (data.statusCode == 400) {
                    alert("yes")
                    setError(true);
                    setErrorMessage(data.message)
                    setLoading(false)
                } else {

                    setErrorMessage("");
                    console.log(data)
                    // setUserData(data);

                   useUserStore.setState((state) =>({
                        user_data:{
                            id: data?.user?._id,
                            username: data?.user?.username,
                            isAdmin: data?.user?.isAdmin,
                            token: data?.token?.access_token,
                            isLoggedin: true
                        }
                   }));


                    setLoading(false);
                    setUsername("");
                    setPassword("");

                    // Redirect to the desired page
                    // router.push('/book');
                    loginUserAndAdmin();

                }
            }

        } catch (e) {
            setErrorMessage("Somthing went wrong, please try again");
            setLoading(false);
        }
    
  }
  

  useLayoutEffect(() =>{
    setLoggedIn(isLoggedin);
    setAdmin(isAdmin)
  },[isLoggedin, isAdmin]);

  useEffect(() =>{
    loginUserAndAdmin();
  },[loggedIn])



  return (
    <main className={styles.login}>
      <section className={styles.login_container}>
        <aside className={styles.left}>

            <Link 
                href="/"

                className={styles.back}>
                <IoIosArrowRoundBack style={{fontSize:"30px"}}/> <span>Back </span>
            </Link>
            <div className={styles.left_container}>
                <div className={styles.welcome}>
                    <h1>Welcome</h1>
                    <p>Please enter you details</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.input_container}>
                        <label htmlFor="username">Username</label>
                        <input type="text" value={username} onChange={(e) => {setUsername(e.target.value)}} placeholder='john' required/>
                    </div>
                    
                    <div className={styles.input_container}>
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder='**********' 
                            value={password}
                            onChange={e => {setPassword(e.target.value)}}
                        required/>
                    </div>
                    
                    <div className={styles.input_container}>
                        {
                            error &&
                            <p style={{color:"red"}}>{errorMessage}</p>
                        }
                    </div>
                    
                    <div className={styles.input_container}>
                        <button type='submit'>
                            {loading ? (<SmallLoader dark={false}/>) : <span>Signin</span>}
                        </button>
                    </div>

                </form>
            </div>
        </aside>

        <aside className={styles.right}>
          <Image
            className={styles.login_img}
            src="/login.jpg"
            width={500}
            height={500}
            alt=""
          />
        </aside>
      </section>
    </main>
  )
}

export default Login
