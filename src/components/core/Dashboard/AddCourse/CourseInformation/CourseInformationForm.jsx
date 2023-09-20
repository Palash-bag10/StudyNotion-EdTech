import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseCategories } from '../../../../../services/operation/courseDetailsAPI';

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
      setLoading(true);
      const categories = await fetchCourseCategories();
      if(categories.length > 0) {
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

    getCategories();
  })

  return (
    <div>
      
    </div>
  )
}

export default CourseInformationForm
