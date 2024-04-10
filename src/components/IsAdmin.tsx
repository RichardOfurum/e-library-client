"use client"
import React, { useLayoutEffect, useEffect, useState } from 'react';
import { useUserStore } from '@/store/userStore';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';

const IsAdmin:React.FC = () => {
  const [admin, setAdmin] = useState<boolean>();
  const isAdmin = useUserStore(state => state.user_data.isAdmin)

  const router = useRouter();

  const checkLoginState = () =>{
    if(admin == false){
      router.push('/auth/login')
    }
  }

  useLayoutEffect(() =>{
    setAdmin(isAdmin);
  },[isAdmin]);

  useEffect(() =>{
    checkLoginState();
  },[admin])

  return <> </>
  
}

export default IsAdmin
