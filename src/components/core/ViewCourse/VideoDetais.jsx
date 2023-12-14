import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markLectureAsComplete } from '../../../services/operation/courseDetailsAPI';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';

const VideoDetais = () => {

  const {courseId, sectionId, subSectionId} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const playerRef = useRef();
  const {token} = useSelector((state) => state.auth);
  const {courseSectionData, courseEntireData, completedLectures} = useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setVideoSpacificData = async() => {
      // check if data is present
      if(!courseSectionData.length) return;

      // if there is no data
      if(!courseId && !sectionId && !subSectionId){
        // navigate enrolled courses page
        navigate("/dashboard/enrolled-courses");
      }
      else{
        // if data present
        const filterData = courseSectionData.filter(
          (course) => course._id === sectionId
        )

        const filterVideoData = filterData?.[0].subsection.filter((data) => data._id === subSectionId)

        setVideoData(filterVideoData[0]);
        setVideoEnded(false)
      }
    }
    setVideoSpacificData();
  }, [courseSectionData, courseEntireData, location.pathname])

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId)

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subsection.findIndex((data) => data._id === subSectionId)

    if(currentSectionIndex === 0 && currentSubSectionIndex === 0){
      return true;
    }
    else{
      return false;
    }
  }

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId)

    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subsection.findIndex((data) => data._id === subSectionId)

    if(currentSectionIndex === courseSectionData.length - 1 && currentSubSectionIndex === noOfSubSections - 1) {
      return true
    }
    else{
      return false
    }
  }

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId)

    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subsection.findIndex((data) => data._id === subSectionId)

    // check any lecture exist on same section or not
    if(currentSubSectionIndex !==  noOfSubSections - 1){
      // go to next video on same section
      const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSectionIndex + 1]._id;
      // go to next video
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
    } else {
      // got to next video in diff section
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subsection[0]._id
      // go to the video
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
    }
  }

  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId)

    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subsection.findIndex((data) => data._id === subSectionId)

    // check if current video is not first video
    if(currentSubSectionIndex !== 0){
      // same section prev video
      const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1];
      // go to the video
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
    } else {
      // diff section last video
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length;
      const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subsection[prevSubSectionLength - 1]._id
      // go to the video
      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)
    }
  }

  const handleLectureCompletion = async () => {
    setLoading(true)
    const res = await markLectureAsComplete(
      {
        courseId: courseId,
        subSectionId: subSectionId
      }, token
    );

    // state update
    if(res){
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);
  }

  return (
    <div>
      
    </div>
  )
}

export default VideoDetais
