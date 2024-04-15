import BookList from '@/components/books/BookList'
import Categories from '@/components/categories/Categories'
import React from 'react'
// import styles from './book.module.css'

// import BookDetails from '@/components/bookDetails/BookDetails';
// import BookList from '@/components/books/BookList';


const page:React.FC <any> = ({params}) => {
 
  return (
    <div style={{display:"flex", flexDirection:"column", gap:"20px"}}>
      {/* <BookDetails id={params.id}/> */}
      {/* <BookList /> */}
      {/* <Categories id={params.id}/> */}
      <h1>Category: </h1> <span>{params.id}</span>
      <BookList route={`book/search/category?category=${params.id}&`}/>
    </div>
  )
}

export default page
