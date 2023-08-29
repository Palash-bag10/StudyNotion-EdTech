import { toast } from "react-hot-toast";
import { settingsEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import { logout } from "./authAPI";



const {
    DELETE_ACCOUNT_API,
    CHANGE_PASSWORD_API,
    UPDATE_PROFILE_API,
} = settingsEndpoints

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