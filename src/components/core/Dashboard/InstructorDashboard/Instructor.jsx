import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getInstructorData } from '../../../../services/operation/ProfileAPI'
import { fetchInstructorCourses } from '../../../../services/operation/courseDetailsAPI'

const Instructor = () => {

    const {token} = useSelector((state) => state.auth)
    const {user} = useSelector((state) => state.profile)
    const [loading, setLoading] = useState(false)
    const [instructorData, setInstructorData] = useState(null)
    const [courses, setCourses] = useState([])

    useEffect(() => {

        const getCourseDataWithStats = async() => {
            setLoading(true)
            const instructorApiData = await getInstructorData(token)
            const result = await fetchInstructorCourses(token)

            console.log(instructorApiData)

            if(instructorApiData.length){
                setInstructorData(instructorApiData)
            }
            if(result){
                setCourses(result)
            }
            setLoading(false)
        }
        getCourseDataWithStats()

    },[])

  return (
    <div>
      
    </div>
  )
}

export default Instructor
