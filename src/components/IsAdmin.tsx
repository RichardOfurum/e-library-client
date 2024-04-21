"use client"
import React, { useLayoutEffect, useEffect, useState } from 'react';
import { useUserStore } from '@/store/userStore';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';

const IsAdmin:React.FC = () => {
  const [admin, setAdmin] = useState<boolean>(true);
  const isAdmin = useUserStore(state => state.user_data.isAdmin)

  const router = useRouter();

  const checkLoginState = async() =>{
      if(admin == false){
        // await useUserStore.persist.clearStorage(); 
        // await router.push('/auth/login');
        await router.replace('/auth/login');
      }
  }

  useEffect(() =>{
      setAdmin(isAdmin);
  },[isAdmin]);

  useEffect(() =>{
      setTimeout(() =>{
        checkLoginState();
      },2000)
  },[admin])

  return <> </>
  
}

export default IsAdmin
