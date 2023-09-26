import React, { useState } from 'react'
import { useRef } from 'react'
import { useDropzone } from 'react-dropzone'
import {FiUpload} from 'react-icons/fi'

const MediaUpload = ({
    name,
    lable,
    setValue,
    register,
    errors,
    editData = null,
    video = false,
    viewData = null
}) => {

    const [selectedFile, setSelectedFile] = useState(null)
    const [previewSource, setPreviewSource] = useState(viewData)

    const inputRef = useRef(null)

    const previewFile = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setPreviewSource(reader.result)
      }
    }

    const onDrop = (acceptedFiles) => {
      const file = acceptedFiles[0];
      if(file){
        previewFile(file);
        setSelectedFile(file);
      }
    }

    const {getRootProps, getInputProps, isDragAccept} = useDropzone({
      accept: !video ? {"image" : [".jpeg", ".jpg", ".png"]} : {"video" : [".mp4"]},
      onDrop,
    })

    

  return (
    <div>
      <label htmlFor={name}> {lable}<sup className=' text-pink-300'>*</sup> </label>

      <div>
        {/* {previewSource && ( */}
            <div>
                <input ref={inputRef}/>
                <div>
                    <FiUpload/>
                </div>
                <p>
                    Drag and drop an image, or <span className=' text-yellow-200'>Browse</span>  Max 6MB each (12MB for videos)
                </p>
                <ul>
                    <li>Aspect ratio 16:9</li>
                    <li>Recommended size 1024x576</li>
                </ul>
            </div>
        {/* )} */}
      </div>

      {errors[name] && (
        <span> {lable} is Required </span>
      )}
    </div>
  )
}

export default MediaUpload
