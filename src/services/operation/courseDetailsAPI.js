import toast from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { courseEndPoints } from "../apis"

const{
    COURSE_CATEGORIES_API,
    CREATE_COURSE_API,
    EDIT_COURSE_API,
} = courseEndPoints


// Fetching the available course categories
export const fetchCourseCategories = async () => {
    let result = []
    try{
        const response = await apiConnector("GET", COURSE_CATEGORIES_API)
        console.log("COURSE_CATEGORIES_API API RESPONSE..", response)
        if(!response?.data?.success){
            throw new Error("Could Not Fetch Course Categories")
        }
        result = response?.data?.data
    } catch (error){
        console.log("COURSE_CATEGORIES_API ERROR....", error)
        toast.error(error.message)
    }
    return result
}

// Add Course Details
export const addCourseDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("POST", CREATE_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        console.log("CREATE_COURSE_API RESPONSE....", response)
        if(!response?.data?.success){
            throw new Error("Could not Add Course Details")
        }
        toast.success("Course Details Added Successfully")
        result = response?.data?.data
    }catch(error){
        console.log("CREATE COURSE API ERROR...", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

// Add Course Details
export const editCourseDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("POST", EDIT_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        console.log("EDIT_COURSE_API RESPONSE....", response)
        if(!response?.data?.success){
            throw new Error("Could not Edit Course Details")
        }
        toast.success("Course Details Edited Successfully")
        result = response?.data?.data
    }catch(error){
        console.log("EDIT COURSE API ERROR...", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}