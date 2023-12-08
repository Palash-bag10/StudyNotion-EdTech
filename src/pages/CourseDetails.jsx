import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { buyCourse } from '../services/operation/studentFeaturesAPI';
import { useNavigate, useParams } from 'react-router-dom';

const CourseDetails = () => {
 
    const {token} = useSelector((state) => state.auth)
    const {user} = useSelector((state) => state.profile)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {courseId} = useParams()
    
    const handleBuyCourse = () => {
        if(token){
            buyCourse(token, [courseId], user, dispatch, navigate)
            return;
        }
    }


  return (
    <div className=' flex items-center justify-center'>
      <button 
      onClick={handleBuyCourse}
      className=' flex bg-yellow-5 p-4 mt-16'>
        Buy Now
      </button>
    </div>
  )
}

export default CourseDetails
