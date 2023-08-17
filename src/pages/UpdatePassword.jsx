import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useLocation } from 'react-router-dom';
import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai'
import { Link } from 'react-router-dom'; 
import {BsArrowLeftShort} from 'react-icons/bs'
import { resetPassword } from '../services/operation/authAPI';

const UpdatePassword = () => {

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    })
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const location = useLocation();
    const {password, confirmPassword} = formData;

    const handleOnChange = (e) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name] : e.target.value,
            }
        ))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password, confirmPassword, token))
    } 

  return (
    <div>
      {
        loading ? ( <div className='spinner'></div> )
        : (
            <div className=' text-white'>
                <h3>Choose new password</h3>
                <p>Almost done. Enter your new password and youre all set.</p> 
                <form onSubmit={handleOnSubmit}>
                    <label>
                        <p>New Password <sup>*</sup></p>
                        <input
                            required 
                            type={showPassword ? "text" : "password"}
                            name='password'
                            value={password}
                            onChange={handleOnChange}
                            className='text-black'
                        />
                        <span onClick={() => setShowPassword((prev) => !prev)}>
                            {
                                showPassword 
                                ? <AiOutlineEyeInvisible fontSize={24}/> 
                                : <AiOutlineEye fontSize={24}/>
                            }
                        </span> 
                    </label>

                    <label>
                        <p>Confirm New Password <sup>*</sup></p>
                        <input
                            required 
                            type={showConfirmPassword ? "text" : "password"}
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={handleOnChange}
                            className='text-black'
                        />
                        <span onClick={() => setShowConfirmPassword((prev) => !prev)}>
                            {
                                showConfirmPassword 
                                ? <AiOutlineEyeInvisible fontSize={24}/> 
                                : <AiOutlineEye fontSize={24}/>
                            }
                        </span> 
                    </label>

                    <button type='submit'>
                        Reset Password
                    </button>
                </form>

                <div>
                    <Link to="/login">
                        <BsArrowLeftShort/>
                        <p>Back to Login</p>
                    </Link>
                </div>
            </div>
        )
      }
    </div>
  )
}

export default UpdatePassword
