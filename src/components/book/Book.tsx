'use client'
import React,{useEffect, useState} from 'react';
import styles from './Book.module.css';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
    author:string,
    imageUrl:string,
    title:string,
    id:string
}

const Book:React.FC<Props> = ({author, imageUrl, title, id}) => {
    const [img, setImg] = useState<string | undefined>(undefined);

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
        <Link
            href={`/book/${id}`}
            // href={`/blog/${post.id}`}
            className={styles.book_container}>
            <div className={styles.image_container}>
                {/* <p>{id}</p> */}
                    <Image
                        className={styles.book_image}
                        src={img} height={500} width={400} alt="image" 
                    />

                    {/* {imageUrl} */}
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
