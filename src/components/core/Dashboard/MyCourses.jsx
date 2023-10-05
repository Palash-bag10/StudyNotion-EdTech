import React from 'react'
import IconButton from '../../common/IconButton'
import {AiOutlinePlusCircle} from "react-icons/ai"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const MyCourses = () => {

    
    const navigate = useNavigate();

  return (
    <div className=' text-white'>
      <div>
        <h2>My Courses</h2>
        <IconButton 
            text="New"
            onclick={() => navigate("/dashboard/add-course") }
        > <AiOutlinePlusCircle/> </IconButton>
      </div>
    </div>
  )
}

export default MyCourses
