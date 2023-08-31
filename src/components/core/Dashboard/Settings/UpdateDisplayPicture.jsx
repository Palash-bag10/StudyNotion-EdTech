import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconButton from '../../../common/IconButton';

const UpdateDisplayPicture = () => {

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const dispatch = useDispatch();

    const [previewImage, setPreviewImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current.click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log(file)
        if(file){
            setImageFile(file)
            previewFile(file)
        }
    }

    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewImage(reader.result)
        }
    }

    useEffect (() => {
        if(imageFile){
            previewFile(imageFile)
        }
    }, [imageFile])



  return (
    <div>
      <div className=' flex rounded-md bg-richblack-800 border-[1px] border-richblack-700 p-6 items-center justify-between text-richblack-5'>
        <div className=' flex gap-x-4 items-center'>
            <img
             src={previewImage || user?.image} 
             alt={`Profile-${user?.firstName}`}
             className=' aspect-square w-[78px] rounded-full object-cover'
            />
            <div className=' space-y-2'>
                <p>Change Profile Picture</p>
                {/* Buttons Select and Upload */}
                <div className=' flex flex-row gap-3'>
                    <input
                     type="file"
                     ref={fileInputRef}
                     onChange={handleFileChange}
                     className='hidden'
                     accept='image/png, image/gif, image/jpeg'
                    />
                    <button
                    onClick={handleClick}
                    className=' cursor-pointer rounded-md bg-richblack-700 font-semibold text-richblack-50 px-5 py-2'
                    >
                        Select
                    </button>
                    <IconButton
                     text="Upload"

                    >

                    </IconButton>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateDisplayPicture
