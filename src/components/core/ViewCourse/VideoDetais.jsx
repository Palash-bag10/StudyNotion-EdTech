import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'

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
    
  }

  const isLastVideo = () => {

  }

  const goToNextVideo = () => {

  }

  const goToPrevVideo = () => {

  }

  const handleLectureCompletion = () => {

  }

  return (
    <div>
      
    </div>
  )
}

export default VideoDetais
