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
      <div style={{display:"flex", gap:"10px"}}>
          <p style={{fontWeight:"bold"}}>Category: </p> <p>{params.id}</p>
      </div>
      <BookList route={`book/search/category?category=${params.id}&`}/>
    </div>
  )
}

export default page
