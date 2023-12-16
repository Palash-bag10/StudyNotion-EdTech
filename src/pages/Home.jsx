import React from 'react'
import { Link } from 'react-router-dom'
import {FaArrowRight} from 'react-icons/fa'
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from '../components/core/HomePage/Button'
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/HomePage/CodeBlocks'
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'
import TimelineSection from '../components/core/HomePage/TimelineSection'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import Footer from '../components/common/Footer'
import ExploreMore from '../components/core/HomePage/ExploreMore'
import ReviewSlider from '../components/common/ReviewSlider'

const Home = () => {
  return (
    <div>

    {/* SECTION 1 */}
    <div className=' relative flex flex-col w-11/12 mx-auto max-w-maxContent items-center text-white'>
        {/* InsTructor Link */}
        <Link to={"/signup"}>
            <div className='rounded__button mt-16 bg-richblack-800 p-1 rounded-full w-fit font-bold text-richblack-200 transition-all duration-200 hover:scale-95 @apply shadow-[0px_-1px_0px_0px_rgba(255,255,255,0.18)_inset]'>
                <div className='flex flex-row items-center gap-[10px] py-[6px] px-4 rounded-full transition-all duration-200 hover:bg-richblack-900'>
                    <p>Become an Instructor</p>
                    <FaArrowRight />
                </div>
            </div>
        </Link>

        <div className='font-inter font-semibold text-center text-4xl tracking-[-0.72px] mt-9 '>
            Empower Your Future with <HighlightText text={"Coding Skills"}/>
        </div>

        <div className=' w-[70%] mt-4 text-base font-medium text-center text-richblack-300'>
        With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
        </div>

        <div className=' flex flex-row gap-6 mt-9'>
            <CTAButton active={true} linkto={"/signup"}>
            Learn More
            </CTAButton>

            <CTAButton active={false} linkto={"/login"}>
                Book a Demo
            </CTAButton>
        </div>

        {/* VIDEO */}
        <div className='video__background w-[1035px] mx-3 my-16 shadow-[10px_-5px_50px_-5px] shadow-blue-200 rounded-full backdrop-blur-[60px]'>
            <video
            className='shadow-[20px_20px_rgba(255,255,255)]'
                muted
                autoPlay
                loop>
                <source src={Banner} />
            </video>
        </div> 

        {/* CODE-BLOCK SECTION 1 */}
        <div >
            <CodeBlocks
                position={"lg:flex-row"}
                heading={
                    <div>
                        Unlock your <HighlightText text={"coding potential"} /> with our online courses.
                    </div>
                }
                subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}

                ctabtn1={{
                    btnText: "Try it Yourself",
                    active: true,
                    linkto: "/signup",
                }}
                ctabtn2={{
                    btnText: "Learn More",
                    active: false,
                    linkto: "/login",
                }}

                codeblock={`<!DOCTYPE html>\n<html>\nhead><>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\n<body>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`}
                codeColor={"text-yellow-25"}
                backgroundGradient={<div className=' absolute codeblock1'></div>}
            />
        </div>

        {/* CODE-BLOCK SECTION 2 */}
        <div>
            <CodeBlocks
                position={"lg:flex-row-reverse"}
                heading={
                    <div>
                        Start <HighlightText text={"coding in seconds"} />
                    </div>
                }
                subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}

                ctabtn1={{
                    btnText: "Continue Lesson",
                    active: true,
                    linkto: "/signup",
                }}
                ctabtn2={{
                    btnText: "Learn More",
                    active: false,
                    linkto: "/login",
                }}

                codeblock={`<!DOCTYPE html>\n<html>\nhead><>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\n<body>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`}
                codeColor={"text-yellow-25"}
                backgroundGradient={<div className=' absolute codeblock2'></div>}
            />
        </div>

        {/* PENDING EXPLORE CATEGORY SECTION */}
        <ExploreMore />
        
    </div>

    {/* SECTION 2 */}
    <div className=' bg-pure-greys-5 text-richblack-700'>

    {/* PART 1 */}
    {/* For BG image */}
    <div className='homepage__bgimage h-[320px]'>

        <div className=' w-11/12 max-w-maxContent flex flex-col items-center justify-center gap-6 mx-auto'>
        <div className='h-[150px]'></div>
            {/* Buttons */}
            <div className='flex flex-row gap-6 pt-8 text-white'>
                <CTAButton active={true} linkto={"/signup"}>
                    <div className='flex items-center gap-2'>
                        Explore Full Catalog
                        <FaArrowRight/>
                    </div>
                </CTAButton>

                <CTAButton active={false} linkto={"/signup"}>
                        Learn More 
                </CTAButton>
            </div>
        </div>
    </div>

    {/* PART 2 */}
    <div className=' w-11/12 max-w-maxContent flex flex-col justify-between items-center gap-[52px] mx-auto py-[90px]'>
        <div className=' flex flex-row gap-5'>

            <div className='font-inter font-semibold text-4xl w-[45%] '>
            Get the skills you need for a <HighlightText text={"job that is in demand."}/>
            </div>

            <div className=' flex flex-col gap-10 items-start w-[40%]'>
                <div className=' text-[16px]'>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</div>
                
                <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
                
            </div>
        </div>

        {/* PART 3 */}
        <TimelineSection/>

        {/* PART 4 */}
        <LearningLanguageSection/>
        
    </div>

    </div>


    {/* SECTION 3 */}
    <div className=' w-11/12 max-w-maxContent mx-auto flex flex-col justify-between items-center gap-8 bg-richblack-900 text-white my-20 '>

        <InstructorSection/>

        <h2 className=' text-center text-4xl font-semibold mt-10'>Review from other learners</h2>
        {/* REVIEW SLIDER */}
        <ReviewSlider />
    </div>


    {/* SECTION 4 footer */}
        {/* PENDING */}
        <Footer/>
      
    </div>
  )
}

export default Home
