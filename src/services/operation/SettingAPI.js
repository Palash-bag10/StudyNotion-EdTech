import { toast } from "react-hot-toast";
import { settingsEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import { logout } from "./authAPI";
import { setUser } from "../../slices/profileSlice";



const {
    DELETE_ACCOUNT_API,
    CHANGE_PASSWORD_API,
    UPDATE_PROFILE_API,
    UPDATE_PROFILE_PICTURE_API,
} = settingsEndpoints

export function updateDisplayPictue(token, formData){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        try{
            const response = await apiConnector("PUT", UPDATE_PROFILE_PICTURE_API, formData, {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            })
            console.log("UPDATE_PROFILE_PICTURE_API", response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Display Picture Updated Successfully");
            dispatch(setUser(response.data.data))
        }catch(error) {
            console.log("UPDATE_PROFILE_PICTURE_API", error)
            toast.error("Could not Updated Display Picture")
        }
        toast.dismiss(toastId)
    }
}

export function updateProfile(token, formData){
    return async (dispatch) => {

        const toastId = toast.loading("Loading...");
    
        try{
            const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
                Authorization: `Bearer ${token}`,
            })
            console.log("UPDATE_PROFILE_API RESPONSE: ", response);
    
            if(!response.data.success){
                throw new Error(response.data.message);
            }

            const userImage = response.data.updateUserDetails.image 
            ? response.data.updateUserDetails.image
            : `https://api.dicebear.com/6.x/initials/svg?seed=${response.data.updateUserDetails.firstName} ${response.data.updateUserDetails.lastName}`
            dispatch(setUser({...response.data.updateUserDetails, image: userImage }))
    
            toast.success("Profile Update Successfully");
    
        } catch(error){
            console.log("UPDATE_PROFILE_API ERROR...", error)
            toast.error("Could not Update Profile")
        }
    
        toast.dismiss(toastId)
    }
}

export async function changePassword(token, formData){
    
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
                Authorization: `Bearer ${token}`,
            })
            console.log("CHANGE_PASSWORD_API RESPONSE: ", response);

            if(!response.data.success){
                throw new Error (response.data.message);
            }

            toast.success("Password Changed Successfully")
        } catch(error) {
            console.log("CHANGE_PASSWORD_API API ERROR............", error)
            toast.error(error.response.data.message)
        }
    toast.dismiss(toastId)
}

export function deleteaccount(token, navigate){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("DELETE", DELETE_ACCOUNT_API, null, {
                Authorization: `Bearer ${token}`,
            })
            console.log("DELETE_PROFILE_API RESPONSE", response);

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Profile Deleted SuccessFully");
            dispatch(logout(navigate));
        }catch(error){
            console.log("DELETE_PROFILE_API ERROR", error)
            toast.error("Could not delete profile");
        }
        toast.dismiss(toastId);
    }
}