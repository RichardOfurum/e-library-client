import React from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { useRouter } from 'next/navigation';

const Back = () => {

    const router = useRouter();

    const redirectPreviousePage = () =>{
        router.back();
    }
  return (
    <div onClick={redirectPreviousePage} style={{display:"flex", cursor:"pointer", alignItems:"center", fontWeight:"bold"}}>
      <BiArrowBack /> back
    </div>
  )
}

export default Back
