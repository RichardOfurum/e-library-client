'use client'
import React from 'react'
import styles from './Categories.module.css'
import Link from 'next/link'
import BookList from '../books/BookList'

type Props = {
    id: string
}

const Categories:React.FC<Props> = ({id}) => {

  return (
    <div className={styles.categories}>
        <div className={styles.categorie_container}>
            {/* <Link href={`/category?category=${id}&`}></Link> */}
            <BookList route={`book/search/category?category=${id}&`}/>
        </div>
    </div>
  )
}

export default Categories
