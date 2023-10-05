import React from 'react'
import IconButton from '../../common/IconButton'
import {AiOutlinePlusCircle} from "react-icons/ai"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchInstructorCourses } from '../../../services/operation/courseDetailsAPI'
import { useState } from 'react'

const MyCourses = () => {

    const {token} = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const result = await fetchInstructorCourses(token)
            if(result){
                setCourses(result)
            }
        }
        fetchCourses();
    },[])

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
