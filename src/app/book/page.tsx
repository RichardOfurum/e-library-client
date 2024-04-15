import BookList from '@/components/books/BookList';
import React from 'react';


const page = async() => {

  return (
    <div>
        <BookList route="book?"/>
    </div>
  )
}

export default page;
// export default IsAuth(page);
