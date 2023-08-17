import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconButton from '../../common/IconButton';
import {RiEditBoxLine} from "react-icons/ri"

const MyProfile = () => {

    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();

  return (
    <div className=' text-white'>

        <h2>My Profile</h2>

        {/* SECTION 1 */}
        <div>
            <div>
                <img 
                src={user?.image} 
                alt={`profile-${user?.firstName}`}
                className=' w-[70px] aspect-square rounded-full object-cover'
                 />
                <div>
                    <p>{user?.firstName + " " + user?.lastName}</p>
                    <p>{user?.email}</p>
                </div>
            </div>
            <IconButton
            text="Edit"
            onclick={()=>{
                navigate("/dashboard/settings")
            }}
            >
                <RiEditBoxLine/>
            </IconButton>
        </div>

        {/* SECTION 2 */}
        <div>
           <div>
            <p>About</p>
            <IconButton
            text="Edit"
            onclick={()=>{
                navigate("/dashboard/settings")
            }}
            >
                <RiEditBoxLine/>
            </IconButton>
           </div>  
           <p>{user?.additionalDetails?.about ?? "Write Something About Yourself"}</p>
        </div>

        {/* SECTION 3 */}
        <div className=' flex gap-x-4 p-4'>
            <div>
                <p>Personal Details</p>
                <IconButton
                text="Edit"
                onclick={()=>{
                    navigate("/dashboard/settings")
                }}
                >
                    <RiEditBoxLine/>
                </IconButton>
            </div>

            <div>
                <p>First Name</p>
                <p>{user?.firstName}</p>
            </div>
            <div>
                <p>Email</p>
                <p>{user?.email}</p>
            </div>
            <div>
                <p>Gender</p>
                <p>{user?.additionalDetails?.gender ?? "Add Gender"}</p>
            </div>

            <div>
                <p>Last Name</p>
                <p>{user?.lastName}</p>
            </div>
            <div>
                <p>Contact Number</p>
                <p>{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
            </div>
            <div>
                <p>Date of Birth</p>
                <p>{user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}</p>
            </div>
            
        </div>


    </div>
  )
}

export default MyProfile
