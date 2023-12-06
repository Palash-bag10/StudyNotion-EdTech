import React from 'react'
import { useSelector } from 'react-redux';

const CourseDetails = () => {
 
    const {token} = useSelector((state) => state.auth)
    
    const handleBuyCourse = () => {
        if(token){
            buyCourse();
            return;
        }
    }


  return (
    <div className=' flex items-center justify-center'>
      <button 
      onClick={() => handleBuyCourse()}
      className=' flex bg-yellow-5 p-4 mt-16'>
        Buy Now
      </button>
    </div>
  )
}

export default CourseDetails
