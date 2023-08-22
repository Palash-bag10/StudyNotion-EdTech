import { toast } from "react-hot-toast";
import { settingsEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import { logout } from "./authAPI";



const {
    DELETE_ACCOUNT_API,
} = settingsEndpoints

export function deleteAccount(token, navigate){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("DELETE", DELETE_ACCOUNT_API, null, {
                Authorization: `Barear ${token}`
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