import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import RenderAddCoursesteps from "../AddCourse/RenderAddCourseSteps"


export default function EditCourse () {

    const dispatch = useDispatch()
    const {courseId} = useParams()
    const {course} = useSelector((state) => state.course)
    const {token} = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(false)

    return(
        <div>
            <h3 className="mb-14 text-3xl font-medium text-richblack-5">Edit Course</h3>
            <div className="mx-auto max-w-[600px]">
                {
                    course ? (<RenderAddCoursesteps/>) : (<p className="mt-14 text-center text-3xl font-semibold text-richblack-100">Course not Found</p>)
                }
            </div>
        </div>
    )
}