import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {BsArrowLeftShort} from "react-icons/bs"
import { getPasswordResetToken } from '../services/operation/authAPI';

const ForgotPassword = () => {

    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");

    const {loading} = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent))
    }

  return (

    // PENDING: STYLLING

    <div className='text-white'>
      {
        loading 
        ? ( <div className='spinner'></div> ) 
        : (
            <div>
                <h3>
                    {
                        !emailSent 
                        ? "Reset your password"
                        : "Check email"
                    }
                </h3>
                <p>
                    {
                        !emailSent 
                        ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                        : `We have sent the reset email to ${email}`
                    }
                </p>
                <form onSubmit={handleOnSubmit}>
                    {
                        !emailSent && (
                            <label>
                                <p>Email Address <sup>*</sup></p>
                                <input 
                                type='email'
                                name='email'
                                value={email}
                                placeholder='Enter Your Email'
                                onChange={(e) => setEmail(e.target.value)}
                                className=' text-black'
                                />
                            </label>
                        )
                    }

                    <button type='submit'>
                        {
                            !emailSent
                            ? "Reset Password"
                            : "Resend email"
                        }
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

export default ForgotPassword
