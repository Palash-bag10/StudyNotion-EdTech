import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import CTAButton from "../HomePage/Button"
import {FaArrowRight} from 'react-icons/fa'


const InstructorSection = () => {
  return (
    <div>
      <div className=' flex flex-row justify-center items-center gap-24'>

        {/* IMAGE */}
        <div className=' w-[50%]'>
            <img 
                src={Instructor} 
                alt="Instructorimage"
                className='shadow-white shadow-[-20px_-20px_0_0]'
             />
        </div>

        {/* TEXT */}
        <div className='flex flex-col w-[50%] gap-[12px]'>
            <h3 className=' text-4xl font-medium w-[60%]'>Become an <HighlightText text={"instructor"}/> </h3>

            <p className=' text-sm text-richblack-500 w-[73%]'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>

            
            <div className=' w-fit pt-9'>
                <CTAButton active={true} linkto={"/signup"}>
                    <div className='flex items-center gap-2'>
                        Start Teaching Today
                        <FaArrowRight/>
                    </div>
                </CTAButton>
            </div>
            

        </div>

      </div>
    </div>
  )
}

export default InstructorSection
