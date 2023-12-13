import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourse } from '../../../../services/operation/ProfileAPI';
import ProgressBar from '@ramonak/react-progress-bar';
import { useNavigate } from 'react-router-dom';

const EnrollCourses = () => {

  const {token} = useSelector((state) => state.auth);
  const navigate = useNavigate()

  const [enrolledCourses, setEnrolledCourses] = useState(null);

  // const getEnrolledCourses = async() => {
  //   try{

  //     const response = getUserEnrolledCourse(token);
  //     setEnrolledCourses(response);

  //   } catch(error){
  //     console.log('Unable to fetch enrolled courses')
  //   }
  // }

  // useEffect(() => {
  //   getEnrolledCourses();
  // },[])

  useEffect(() => {
    ;(async () => {
      try {
        const res = await getUserEnrolledCourse(token) // Getting all the published and the drafted courses

        // Filtering the published course out
        const filterPublishCourse = res.filter((ele) => ele.status !== "Draft")
        // console.log(
        //   "Viewing all the couse that is Published",
        //   filterPublishCourse
        // )

        setEnrolledCourses(filterPublishCourse)
      } catch (error) {
        console.log("Could not fetch enrolled courses.")
      }
    })()
  },[])

  return (
    <div className=' text-white'>

      <h2>Enrolled Courses</h2>

      {
        !enrolledCourses 
        ? ( <div className='spinner'></div> )
        : !enrolledCourses.length 
        ? ( <p>You don't have any enrolled courses</p> )
        : ( <div>
              <div>
                <p>Course Name</p>
                <p>Duration</p>
                <p>Progress</p>
              </div>

              {/* CARD */}
              {
                enrolledCourses.map((course, index) => (
                  <div
                  key={index}
                  >
                    <div
                    onClick={() => {
                      navigate(`/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`)
                    }}
                    >
                      <img src={course.thumbnail} />
                      <div>
                        <p>{course.courseName}</p>
                        <p>{course.courseDescription}</p>
                      </div>
                    </div>

                    <div>
                      {course?.totalDuration}
                    </div>

                    <div>
                      <p>Progress: {course.progressPercentage || 0}%</p>
                      <ProgressBar
                        completed={course.progressPercentage || 0}
                        height='8px'
                        isLabelVisible={false}
                      />
                    </div>

                  </div>
                ))
              }

            </div> 
          )
      }
      
    </div>
  )
}

export default EnrollCourses
