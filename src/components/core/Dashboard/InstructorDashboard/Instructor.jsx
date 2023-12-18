import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getInstructorData } from '../../../../services/operation/ProfileAPI'
import { fetchInstructorCourses } from '../../../../services/operation/courseDetailsAPI'
import { Link } from 'react-router-dom'
import InstructorChart from './InstructorChart'

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

    // Calculate TotalAmount
    const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenarated, 0)

    // Calculate TotalEnrolledStudents
    const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0);
    

  return (
    <div className=' text-white'>
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-richblack-5">Hi, {user?.firstName} 👋</h3>
        <p className="font-medium text-richblack-200">Let's start something new</p>
      </div>

      {loading 
      ? ( <div className='spinner'></div> )
      : courses.length > 0
        ? (
            <div>
             <div>
              <div>
                <InstructorChart courses={instructorData} />
                <div>
                    <p>Statistics</p>
                    <div>
                        <p>Total Courses</p>
                        <p>{courses.length}</p>
                    </div>

                    <div>
                        <p>Total Students</p>
                        <p>{totalStudents}</p>
                    </div>

                    <div>
                        <p>Total Amount</p>
                        <p>{totalAmount}</p>
                    </div>
                </div>
              </div>  
             </div>

             <div>
                {/* Render 3 courses */}
                <div>
                  <p>Your Courses</p>
                  <Link to="/dashboard/my-courses">
                    <p>View All</p>
                  </Link>
                </div>

                <div>
                  {courses.slice(0, 3).map((course) => (
                    <div>
                        <img
                         src={course.thumbnail} 
                         alt={course.courseName} 
                        />
                        <div>
                          <p> {course.courseName} </p>
                          <div>
                            <p> {course.studentEnrolled.length} Students</p>
                            <p> | </p>
                            <p>Rs. {course.price} </p>
                          </div>
                        </div>
                    </div>
                  ))}
                </div>
             </div>
            </div>   
        ) 
        : (
            <div>
              <p>You have not created any courses yet</p>
              <Link to="/dashboard/addCourse">
                Create a Course
              </Link>  
            </div>
        ) 
      }
    </div>
  )
}

export default Instructor
