import toast from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { courseEndPoints } from "../apis"

const{
    COURSE_CATEGORIES_API,
    CREATE_COURSE_API,
    EDIT_COURSE_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    DELETE_COURSE_API,
    UPDATE_SECTION_API,
    CREATE_SECTION_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SUBSECTION_API,
    COURSE_DETAILS_API,
    GET_ALL_COURSE_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
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

// Fetching all courses under specific instructor
export const fetchInstructorCourses = async (token) => {
    let result = [];
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector(
            "GET",
            GET_ALL_INSTRUCTOR_COURSES_API,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        )
        console.log("INSTRUCTOR COURSES RESPONSE...", response)
        if(!response?.data?.success){
            throw new Error("Could not fetch Instructor Courses")
        }
        result = response?.data?.data
    }catch(error){
        console.log("INSTRUCTOR COURSES ERROR...", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

// Delete a course
export const deleteCourse = async (data, token) => {
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
            Authorization: `Bearer: ${token}`,
        })
        console.log("DELETE COURSE API RESPONSE.....", response)
        if(!response?.data?.success){
            throw new Error("Could not Delete Course")
        }
        toast.success("Course Deleted")
    }catch(error){
        console.log("DELETE COURSE API ERROR....", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
}

// Update Section
export const updateSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("UPDATE SECTION API RESPONSE.....", response)
        if(!response?.data?.success){
            throw new Error("Could not Update Section")
        }
        toast.success("Course Section Updated")
        result = response?.data?.data
    } catch(error){
        console.log("Update Section Api Error")
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

// Create Section
export const createSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("POST", CREATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("CREATE_SECTION_API_RESPONSE........", response)
        if(!response?.data?.success){
            throw new Error("Could not Create Section")
        }
        toast.success("Course Section Created")
        result = response?.data?.updatedCourseDetails
    } catch(error){
        console.log("CREATE_SECTION_API ERROR.....", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

// Delete Section
export const deleteSection = async(data, token) => {
    let result = null
    const toastId = toast.loading("Loading....")
    try{
        const response = await apiConnector("POST", DELETE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("DELETE SECTION API RESPONSE....", response)
        if(!response?.data?.success){
            throw new Error("Could Not Delete Section")
        }
        toast.success("Course Section Deleted")
        result = response?.data?.data
    } catch(error){
        console.log("DELETE SECTION API ERROR.....", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

// Delete Sub Section
export const deleteSubsection = async(data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("DELETE SUB SECTION API RESPONSE...", response)
        if(!response?.data?.success){
            throw new Error("Could not Delete Lecture")
        }
        toast.success("Lecture Deleted")
        result = response?.data?.data
    } catch(error){
        console.log("DELETE SUB SECTION API ERROR...", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const createSubSection = async(data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("CREATE SUB SECTION API RESPONSE...", response)
        if(!response?.data?.success) {
            throw new Error("Could not Add Lecture")
        }
        toast.success("Lecture Added")
        result = response?.data?.data
    }catch(error){
        console.log("CREATE SUB SECTION API ERROR...", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

// Update Sub Section
export const updateSubsection = async(data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("UPDATE SUB SECTION API RESPONSE...", response)
        if(!response?.data?.success){
            throw new Error("Could not update Lecture")
        }
        toast.success("Lecture Updated")
        result = response?.data?.data
    }catch(error){
        console.log("UPDATE SUB SECTION API ERROR....", error)
        toast.error(toastId)
    }
    toast.dismiss(toastId)
    return result
}

// fetching course details
export const fetchCourseDetails = async (courseId) => {
    const toastId = toast.loading("Loading...");
    let result = null
    try{
        const response = await apiConnector("POST", COURSE_DETAILS_API, {
            courseId,
        })
        console.log("COURSE DETAILS API RESPONSE", response)

        if(!response.data.success){
            throw new Error(response.data.message)
        }
        result = response.data
    }catch(error){
        console.log("COURSE DETAILS API ERROR", error)
        result = error.response.data
    }
    toast.dismiss(toastId)
    return result
}

export const getAllCourse = async () => {
    const toastId = toast.loading("Loading...")
    let result = []
    try{
        const response = await apiConnector("GET", GET_ALL_COURSE_API)

        if(!response?.data?.success){
            throw new Error("Could not fetch course catagories")
        }
        result = response?.data?.data
    } catch(error){
        console.log("GET ALL COURSE API ERROR", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

// get full details of a course
export const getFullDetailsOfCourse = async (courseId, token) => {
    const toastId = toast.loading("Loading...")
    let result = null
    try{
        const response = await apiConnector("POST", GET_FULL_COURSE_DETAILS_AUTHENTICATED, {courseId,}, {
            Authorization: `Bearer ${token}`,
        })
        console.log("COURSE FULL DETAILS API RESPONSE", response)

        if(!response.data.success){
            throw new Error(response.data.message)
        }
        result = response?.data?.data
    }catch(error){
        console.log("COURSE FULL DETAILS API ERROR", error)
        result = error.response.data
    }
    toast.dismiss(toastId)
    return result
}