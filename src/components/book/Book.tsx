'use client'
import React,{useEffect, useState} from 'react';
import styles from './Book.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Delete from '../delete/Delete';
import { VscEdit } from 'react-icons/vsc';
import { useUserStore } from '@/store/userStore';

type Props = {
    author:string,
    imageUrl:string,
    title:string,
    id:string
}

const Book:React.FC<Props> = ({author, imageUrl, title, id}) => {
    const [img, setImg] = useState<string | undefined>(undefined);

    const isAdmin = useUserStore(state => state.user_data.isAdmin);

    useEffect(() => {
        const isUrlValid = (url: string) => {
            try {
                new URL(url);
                return true;
            } catch (error) {
                return false;
            }
        };

        if (isUrlValid(imageUrl)) {
            setImg(imageUrl);
        } else {
            console.error('Invalid URL:', imageUrl);
        }
    }, [imageUrl]);

  return (
    <div className={styles.book}>
        {
            isAdmin && 
            <div className={styles.edit_delete}>
                <Link href={`/admin/editBook/${id}`}><VscEdit /></Link>
                
                <Delete route="book" id={id}/>
            </div>
        }
        <Link
            href={`/book/${id}`}

            className={styles.book_container}>
            <div className={styles.image_container}>    
                
             
                    <Image
                        className={styles.book_image}
                        src={img || "/image"} height={500} width={400} alt="image" 
                    />

                </div>
                <div className={styles.text_container}>
                    <span className={styles.title}>{title}</span>
                    <span className={styles.author}>{author}</span>
                </div>
        </Link>
    </div>
  )
}

export default Book
