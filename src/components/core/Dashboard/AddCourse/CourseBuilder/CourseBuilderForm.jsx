import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconButton from '../../../../common/IconButton';
import {AiOutlinePlusCircle} from "react-icons/ai"

const CourseBuilderForm = () => {

  const [editSectionName, setEditSectionName] = useState(null)

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

  return (
    <div>
      <p>Course Builder</p>
      <form>
        <div> 
          <label htmlFor="sectionName">
            Section Name<sup>*</sup>
          </label>
          <input
           type="text" 
           id='sectionName'
           placeholder='Add Section Name'
           {...register("sectionName", {required: true})}
           className='w-full form-style'
          />
          {errors.sectionName && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">Section Name is required</span>
          )}
        </div>

        <div className='mt-5'>
          <IconButton
            type="submit" 
            text={editSectionName ? "Edit Section Name" : "Create Section"}
          >
            <AiOutlinePlusCircle/>
          </IconButton>
        </div>
      </form> 
    </div>
  )
}

export default CourseBuilderForm
