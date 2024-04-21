import React from 'react'
import styles from './User.module.css';
import { TbTrash } from 'react-icons/tb';

const User = () => {

    

  return (
    <div className={styles.users}>
        
        <div className={styles.users_container}>
            
            <div className={styles.item}>
                <p>username</p> 
                <p>type</p>
                <p> <TbTrash/> </p>
            </div>

        </div>
    </div>
  )
}

export default User
