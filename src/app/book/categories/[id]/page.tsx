import Back from '@/components/back/Back'
import BookList from '@/components/books/BookList'
import React from 'react'

const page:React.FC <any> = ({params}) => {
 
  return (
    <div style={{display:"flex", flexDirection:"column", gap:"20px"}}>
      <Back/>
      <div style={{display:"flex", gap:"10px"}}>
          <p style={{fontWeight:"bold"}}>Category: </p> <p>{params.id}</p>
      </div>
      <BookList route={`book/search/category?category=${params.id}&`}/>
    </div>
  )
}

export default page
