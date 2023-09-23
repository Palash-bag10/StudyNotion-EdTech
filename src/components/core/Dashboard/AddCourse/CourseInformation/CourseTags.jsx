import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux'
import {MdClose} from 'react-icons/md'

const CourseTags = ({label, name, placeholder, setValue, getValues, register, errors}) => {

    const {editCourse, course} = useSelector((state) => state.course);

    const [tags, setTags] = useState([]);

    const handleKeyDown = (event) => {

    }

    const handleDeleteTag = (index) => {
        
    }

  return (
    <div>
      <label htmlFor={name}> {label}<sup className=' text-pink-300'>*</sup> </label>

      <div>
        {
            tags.map((tag, index) => (
                <div
                key={index}
                >
                    {tag}
                    <button
                    onClick={() => handleDeleteTag()}
                    >
                        <MdClose />
                    </button>
                </div>
            ))
        }

        <input
         type="text"
         id={name}
         name={name}
         placeholder={placeholder}
         onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  )
}

export default CourseTags
