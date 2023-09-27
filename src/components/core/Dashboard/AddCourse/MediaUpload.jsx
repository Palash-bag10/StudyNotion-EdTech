import React, { useState } from 'react'
import { useRef } from 'react'
import { useDropzone } from 'react-dropzone'
import {FiUpload} from 'react-icons/fi'
import { Player } from 'video-react'

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
    const [previewSource, setPreviewSource] = useState(
      viewData ? viewData : editData ? editData : ""
    )

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

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
      accept: !video ? {"image" : [".jpeg", ".jpg", ".png"]} : {"video" : [".mp4"]},
      onDrop,
    })

    

  return (
    <div>
      <label htmlFor={name}> {lable}<sup className=' text-pink-300'>*</sup> </label>

      <div className={`${isDragActive ? "bg-richblack-600" : " bg-richblack-700"} flex items-center justify-center border-dotted rounded-lg min-h-[250px] cursor-pointer border-2 border-richblack-500`}>
        {previewSource ?
          (
              <div>
                {!video 
                ? (
                  <img
                   src={previewSource}
                    alt="Preview"
                    className=' h-full w-full rounded-md object-cover'
                     />
                )
                : (
                  <Player aspectRatio='16:9' playsInline src={previewSource}/>
                )}
                {
                  !viewData && (
                    <button
                    type='button'
                    onClick={() => {
                      setPreviewSource("")
                      setSelectedFile(null)
                      setValue(name, null)
                    }}
                    >Cancle</button>
                  )
                }
              </div>
          ) : ( 
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
           )}
      </div>

      {errors[name] && (
        <span> {lable} is Required </span>
      )}
    </div>
  )
}

export default MediaUpload
