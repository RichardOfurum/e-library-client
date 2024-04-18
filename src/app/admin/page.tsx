import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <div>
      <h1>Admin dashboard</h1>
      <Link href="/admin/addbook">Add Book</Link>
      <br />
      <br />
      <Link href="/admin/user/createUser">create user</Link>
      <br />
      <br />
      <Link href="/admin/user/createAdmin">create admin</Link>
    </div>
  )
}

export default page
