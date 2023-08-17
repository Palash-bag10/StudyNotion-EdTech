import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'; 
import {BsArrowLeftShort} from 'react-icons/bs'
import {BiRotateLeft} from 'react-icons/bi'
import { sendotp, signUp } from '../services/operation/authAPI';

const VerifyEmail = () => {

    const [otp, setOtp] = useState("");

    const {signupData, loading} = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(!signupData){
            navigate("/signup")
        }
    }, [])

    const handleOnSubmit = (e) => {
        e.preventDefault();

        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = signupData;
    
        dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
    }

  return (
    <div className='text-white'>
      {
        loading 
        ? ( <div className='spinner'></div> )
        : (
           <div>

            <h3>Verify email</h3>

            <p>A verification code has been sent to you. Enter the code below</p>

            <form onSubmit={handleOnSubmit}>
                <OTPInput 
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => (<input {...props} 
                        className='text-black'
                    />)}
                    
                />

                <button type='submit'>
                    Verify Email
                </button>
            </form>

            <div>

                <div>
                    <Link to="/login">
                        <BsArrowLeftShort/>
                        <p>Back to Login</p>
                    </Link>
                </div>

                <button
                    onClick={() => dispatch(sendotp(signupData.email, navigate))}    
                >
                    <BiRotateLeft/>
                    <p>Resend</p>
                </button>

            </div>

           </div> 
        )
      }
    </div>
  )
}

export default VerifyEmail
