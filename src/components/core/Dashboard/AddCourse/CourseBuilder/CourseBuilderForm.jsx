import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconButton from '../../../../common/IconButton';
import {AiOutlinePlusCircle} from "react-icons/ai"
import {MdKeyboardArrowRight} from "react-icons/md"
import { useDispatch, useSelector } from 'react-redux';
import { setEditCouse, setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';

const CourseBuilderForm = () => {

  const [editSectionName, setEditSectionName] = useState(null)
  const {course} = useSelector((state) => state.course);
  const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const cancelEdit = () => {
      setEditSectionName(null);
      setValue("sectionName", "");
    }

    const goBack = () => {
      dispatch(setStep(1));
      dispatch(setEditCouse(true));
    }

    const goToNext = () => {
      if(course.courseContent.length === 0){
        toast.error("Please add atleast One Section");
        return;
      }
      if(course.courseContent.some((section) => section.SubSection.length === 0)) {
        toast.error("Please Add atleast one lecture in each section");
        return;
      }
      // If everything is good
      dispatch(setStep(3))
    }

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

        <div className='mt-5 flex gap-x-4'>
          <IconButton
            type="submit" 
            text={editSectionName ? "Edit Section Name" : "Create Section"}
          >
            <AiOutlinePlusCircle/>
          </IconButton>

          {editSectionName && (
            <button
            type='button'
            onClick={cancelEdit}
            className='text-sm text-richblack-300 underline'
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form> 

      {course.courseContent.length > 0 && (
        {/* <NestedView /> */}
      )}

      <div className='flex justify-end gap-x-3'>
        <button onclick={goBack}>Back</button>
        <IconButton text="Next" onclick={goToNext}>
        <MdKeyboardArrowRight/> 
        </IconButton>
      </div>
    </div>
  )
}

export default CourseBuilderForm