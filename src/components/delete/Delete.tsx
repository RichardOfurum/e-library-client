'use client'
import React, { useState } from 'react'
import styles from './Delete.module.css';
import { useUserStore } from '@/store/userStore';
import { BiTrash } from 'react-icons/bi';
import SmallLoader from '../bigLoader/BigLoader';
import { TiLockClosed } from 'react-icons/ti';

type Props = {
    route: string;
    id:string;
}

const Delete:React.FC<Props> = ({route, id}) => {

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const userToken = useUserStore(state => state.user_data.token);

    const[loading, setLoading] = useState<boolean>(false);

    const [isDone, setIsDone] = useState<boolean>(false);



  const deleteRecord = async() =>{
 
        setLoading(true)

        const url = baseUrl  +`${route}/${id}`;

        console.log(url);
        console.log("the id is :", id)

        const token = userToken;

        try {
            const response = await fetch(url, {
                method: 'Delete',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                // body: JSON.stringify({ name})
            });
    
            if (!response.ok) {
                setLoading(false);
                
                throw new Error(`Request failed with status ${response.status}`);
            }
    
            setLoading(false);
         
            console.log('record deleted');
            setIsDone(true)
            return await response.json();
        } catch (error:any) {
            setLoading(false);
            
            console.error('Error:', error.message);
            // Handle error cases as needed
        }
  }

  return (
    <button disabled = {isDone}
      onClick={deleteRecord}
      className={styles.delete}> 
      {
        !isDone ?
          (loading ? (
            <SmallLoader dark={true}/>
          ):
          <BiTrash />):

          <TiLockClosed/>    
      }
    </button>
  )
}

export default Delete
