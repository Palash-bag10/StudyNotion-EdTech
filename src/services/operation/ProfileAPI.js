import { toast } from "react-hot-toast";
import { profileEndPoints } from "../apis";
import { apiConnector } from "../apiconnector";



const {
    GET_USER_ENROLLED_COURSES_API,
} = profileEndPoints

export async function getUserEnrolledCourse(token){
    const toastId = toast.loading("Loading...")
    let result = []

    try{

        const response = await apiConnector(
            "GET",
            GET_USER_ENROLLED_COURSES_API,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        )

        console.log("GET_USER_ENROLLED_COURSES_API...", response)
        
        if(!response.data.success){
            throw new Error (response.data.message);
        }

        result = response.data.data

    } catch(error) {
        console.log("GET_USER_ENROLLED_COURSES_API .....", error)
        toast.error("Could Not Get Enrolled Courses");
    }

    toast.dismiss(toastId)
    return result
}