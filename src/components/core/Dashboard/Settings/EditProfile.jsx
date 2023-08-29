import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {

    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

  return (
    <div>
      <form >
        <div>
            <h3>Profile Information</h3>
        </div>
      </form>
    </div>
  )
}

export default EditProfile
