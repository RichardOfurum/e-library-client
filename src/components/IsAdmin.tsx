"use client"
import React, { useLayoutEffect, useEffect, useState } from 'react';
import { useUserStore } from '@/store/userStore';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';

const IsAdmin:React.FC = () => {
  const [admin, setAdmin] = useState<boolean>(true);
  const isAdmin = useUserStore(state => state.user_data.isAdmin)

  const router = useRouter();

  const checkLoginState = () =>{
      if(!admin){
        router.push('/auth/login')
      }
  }

  useEffect(() =>{
      setAdmin(isAdmin);
  },[isAdmin]);

  useEffect(() =>{
      checkLoginState();
  },[isAdmin])

  return <> </>
  
}

export default IsAdmin
