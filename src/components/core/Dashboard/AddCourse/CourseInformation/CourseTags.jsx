import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux'
import {MdClose} from 'react-icons/md'
import { useEffect } from 'react';

const CourseTags = ({label, name, placeholder, setValue, getValues, register, errors}) => {

    const {editCourse, course} = useSelector((state) => state.course);

    const [tags, setTags] = useState([]);

    useEffect(() => {
        if(editCourse){
            setTags(course?.tag)
        }
        register(name, {
            require: true,
            validate: (value) => value.length > 0
        })
    }, [])

    useEffect(() => {
        setValue(name, tags)
    },[tags])

    const handleKeyDown = (event) => {
        if(event.key === "Enter" || event.key === ","){
            event.preventDefault()
            const tagsValue = event.target.value.trim()
            if(tagsValue && !tags.includes(tagsValue)){
                const newTags = [...tags, tagsValue]
                setTags(newTags)
                event.target.value = ""
            }
        }
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
      {
        errors[name] && (
            <span> {label} is Required </span>
        )
      }
    </div>
  )
}

export default CourseTags
