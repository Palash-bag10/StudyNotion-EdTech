import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourse } from '../../../../services/operation/ProfileAPI';
import ProgressBar from '@ramonak/react-progress-bar';

const EnrollCourses = () => {

  const {token} = useSelector((state) => state.auth);

  const [enrolledCourses, setEnrolledCourses] = useState(null);

  const getEnrolledCourses = async() => {
    try{

      const response = getUserEnrolledCourse(token);
      setEnrolledCourses(response);

    } catch(error){
      console.log('Unable to fetch enrolled courses')
    }
  }

  useEffect(() => {
    getEnrolledCourses();
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
                  <div>
                    <div>
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
