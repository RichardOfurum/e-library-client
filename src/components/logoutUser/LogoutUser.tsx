import React, { useState, useEffect } from 'react';
import styles from './LogoutUser.module.css'
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';

type Props = {
    setShowLogOut: (setShowLogOut: boolean) => void
}

const LogoutUser:React.FC<Props> = ({setShowLogOut}) => {
    const router = useRouter();

    const resetUser = useUserStore(state => state.reset); 

    const redirectUser = async () =>{
        await resetUser();
        setShowLogOut(false);
        router.push("/") 
    }

    async function logoutUser() {
        await useUserStore.persist.clearStorage(); // Wait for the first function to finish
        redirectUser(); // Call the second function
    }

  return (
    <div className={styles.logout_user}>
        <div className={styles.logout_user_container}>
            <h3>Log out current user</h3>
            <div className={styles.btn_container}>

                <button onClick={() => setShowLogOut(false)}
                className={styles.cancel_btn}
                >Cancel</button>
                <button className={styles.logout_btn} onClick={logoutUser}>LogOut</button>
            </div>
        </div>
    </div>
  )
}

export default LogoutUser
