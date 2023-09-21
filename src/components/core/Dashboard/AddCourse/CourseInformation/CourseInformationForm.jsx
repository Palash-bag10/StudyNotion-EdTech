import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseCategories } from '../../../../../services/operation/courseDetailsAPI';
import {HiOutlineCurrencyRupee} from "react-icons/hi"
import RequirementField from './RequirementField';

const CourseInformationForm = () => {

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: {errors},
  } = useForm()

  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  const {course, editCourse} = useSelector((state) => state.course);
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategories = async() => {
      setLoading(true)
      const categories = await fetchCourseCategories()
      if(categories.length > 0) {
        console.log("categories", categories)
        setCourseCategories(categories)
      }
      setLoading(false)
    }

    if(editCourse){
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirments", course.instructions);
      setValue("courseImage", course.thumbnail);
    }

    getCategories()
  }, [])

  const onSubmit = async(data) => {

  }

  return (
    <form
    onSubmit={handleSubmit(onSubmit)}
    className=' bg-richblack-800 border-[1px] border-richblack-700 rounded-lg p-6 space-y-6'
    >

      {/* Course Title */}
      <div>
        <label htmlFor='courseTitle'>Course Title <sup className=' text-pink-300'>*</sup></label>
        <input
         id='courseTitle'
         placeholder='Enter Course Title'
         {...register("courseTitle", {required:true})}
         className=' w-full'
        />
        {
          errors.courseTitle && (
            <span>Course Title is Required</span>
          )
        }
      </div>

      {/* Course Description */}
      <div>
        <label htmlFor='courseShortDesc'>Course Short Description <sup className=' text-pink-300'>*</sup></label>
        <textarea
         id='courseShortDesc'
         placeholder='Enter Course Description'
         {...register("courseShortDesc", {required:true})}
         className='min-h-[140px] w-full'
        />
        {
          errors.courseShortDesc && (
            <span>Course Description is Required</span>
          )
        }
      </div>

      {/* Course Price */}
      <div>
        <label htmlFor='coursePrice'>Course Price<sup className=' text-pink-300'>*</sup></label>
        <div>
          <input
          id='coursePrice'
          placeholder='Enter Course Price'
          {...register("coursePrice", {
            required:true,
            valueAsNumber:true,
            })}
          className=' w-full'
          />
          <HiOutlineCurrencyRupee className=' text-pink-200'/>
        </div>
        {
          errors.coursePrice && (
            <span>Course Price is Required</span>
          )
        }
      </div>

      {/* Course Category */}
      <div>
        <label htmlFor="courseCategory">Course Category<sup className=' text-pink-300'>*</sup></label>
        <select
         id="courseCategory"
         defaultValue=""
         {...register("courseCategory", {required:true})}
         >
            <option
             value=""
             disabled>
             Choose a Category
            </option>

            {
              !loading && courseCategories?.map((category, index) => (
                <option
                 key={index}
                 value={category?._id}
                 >
                  {category?.name}
                 </option>
              ))
            }
         </select>
         {
          errors.courseCategory && (
            <span>Course Category is Required</span>
          )
         }
      </div>

      {/* Course Tags */}

      {/* Course Thumbnail */}

      {/* Benefits of the Course */}
      <div>
        <label htmlFor="courseBenefits">Benefits of the Course<sup className=' text-pink-300'>*</sup></label>
        <textarea
         id="courseBenefits"
         placeholder='Enter Benefits Of the course'
         {...register("courseBenefits", {require: true})}
         className='min-h-[140px] w-full'
         />
         {
          errors.courseBenefits && (
            <span>Benefits of the course are required</span>
          )
         }
      </div>

      {/* Requirements field */}
      <RequirementField
        name="courseRequirments"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        getValues={getValues}
        errors={errors}
      />
      
    </form>
  )
}

export default CourseInformationForm
