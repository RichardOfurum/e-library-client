import React from 'react'
import styles from './book.module.css'
import { useUserStore } from '@/store/userStore';
import BookDetails from '@/components/bookDetails/BookDetails';
import BookList from '@/components/books/BookList';




const page:React.FC <any> = ({params}) => {
 
  
  return (
    <div style={{display:"flex", flexDirection:"column", gap:"20px"}}>
      <BookDetails id={params.id}/>
      <BookList route="book?"/>
    </div>
  )
}

export default page
