"use client"
import React, { useLayoutEffect, useEffect, useState } from 'react';
import { useUserStore } from '@/store/userStore';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';

const IsAuth:React.FC = () => {
  const [login, setLogin] = useState<boolean>(true);
  const isLoggedin = useUserStore(state => state.user_data.isLoggedin)

  const router = useRouter();

  const checkLoginState = () =>{
      if(!login){
        router.push('/auth/login')
      }
  }

  useEffect(() =>{
      setLogin(isLoggedin);
  },[isLoggedin]);

  useEffect(() =>{
      checkLoginState();
  },[login])

  return <> </>
  
}

export default IsAuth
