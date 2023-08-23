import React from 'react'
import UpdateDisplayPicture from './UpdateDisplayPicture'
import EditProfile from './EditProfile'
import ChangePassword from './ChangePassword'
import DeleteAccount from './DeleteAccount'

const Setting = () => {
  return (
    <div>
      <h1>Edit Profile</h1>

      {/* UPDATE_PROFILE_PICTURE */}
      <UpdateDisplayPicture />

      {/* EDIT_PROFILE */}
      <EditProfile />

      {/* UPDATE_PASSWORD */}
      <ChangePassword />

      {/* DELETE_ACCOUNT */}
      <DeleteAccount />

    </div>
  )
}

export default Setting
