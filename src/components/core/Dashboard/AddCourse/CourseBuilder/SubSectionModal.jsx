import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createSubSection, updateSubsection } from '../../../../../services/operation/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import {RxCross2} from "react-icons/rx"
import MediaUpload from '../MediaUpload';
import IconButton from '../../../../common/IconButton';


const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) => {

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: {errors},
  } = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState();
  const {course} = useSelector((state) => state.course);
  const {token} = useSelector((state) => state.auth);

  useEffect(() => {
    if(view || edit){
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  },[]);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if(currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl){
        return true;
      }
    else{
      return false;
    }
  }

  const handleEditSubSection = async () => {
    const currentValues = getValues();
    const formData = new FormData();

    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);

    if(currentValues.lectureTitle !== modalData.title){
      formData.append("title", currentValues.lectureTitle);
    }
    if(currentValues.lectureDesc !== modalData.description){
      formData.append("description", currentValues.lectureDesc);
    }
    if(currentValues.lectureVideo !== modalData.videoUrl){
      formData.append("video", currentValues.lectureVideo);
    }
    setLoading(true)

    // CALL API
    const result = await updateSubsection(formData, token);
    if(result){
      const updatedCourseContent = course.courseContent.map((section) => section._id === modalData.sectionId ? result : section);
      const updatedCourse = {...course, courseContent: updatedCourseContent};
      dispatch(setCourse(updatedCourse));
    }
    setModalData(null);
    setLoading(false);

  }

  const onSubmit =async(data) => {
    if(view) return

    if(edit){
      if(!isFormUpdated){
        toast.error("No changes made to the form")
      }
      else{
        handleEditSubSection();
      }
      return
    }

    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("video", data.lectureVideo);
    setLoading(true);

    // CALL API
    const result = await createSubSection(formData, token);

    if(result){
      const updatedCourseContent = course.courseContent.map((section) => section._id === modalData ? result : section);
      const updatedCourse = {...course, courseContent: updatedCourseContent};
      dispatch(setCourse(updatedCourse))
    }
    setModalData(null)
    setLoading(false)
  }

  return (
    <div>
      <div>
        <div>
          <p> {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture </p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross2 />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
            <MediaUpload 
              name="lectureVideo"
              lable="Lecture Video"
              register={register}
              setValue={setValue}
              errors={errors}
              video={true}
              viewData={view ? modalData.videoUrl : null}
              editData={edit ? modalData.videoUrl : null}
            />

            <div className="flex flex-col space-y-2">
              <label 
              htmlFor="lectureTitle"
              className="text-sm text-richblack-5">Lecture Title</label>
              <input 
               id='lectureTitle'
               placeholder='Enter Lecture Title'
               {...register("lectureTitle", {required: true})}
               className='form-style w-full'
              />
              {errors.lectureTitle && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">Lecture Title is Required</span>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <label 
              htmlFor="lectureDesc"
              className="text-sm text-richblack-5">Lecture Description</label>
              <textarea 
                id="lectureDesc"
                placeholder='Enter Lecture Description'
                {...register("lectureDesc", {required: true})}
                className=' form-style resize-x-none min-h-[130px] w-full'
              />
              {errors.lectureDesc && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">Lecture Description is Required</span>
              )}
            </div>

            {
              !view && (
                <div className="flex justify-end">
                  <IconButton 
                    text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}
                  />
                </div>
              )
            }
        </form>
      </div>
    </div>
  )
}

export default SubSectionModal
