import React from 'react'
import IconButton from './IconButton'

const ConfirmationModal = ({modaldata}) => {
  return (
    <div className=' fixed inset-0 !mt-0 z-[1000] grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
      <div className=' w-11/12 max-w-[350px] border border-richblack-400 bg-richblack-800 p-6 rounded-lg'>
        <p className=' text-2xl font-semibold text-richblack-5'> {modaldata.text1} </p>
        <p className=' mt-3 mb-5 leading-6 text-richblack-200'> {modaldata.text2} </p>
        <div className='flex items-center gap-x-4'>
            <IconButton
                onclick={modaldata?.btn1Handler}
                text={modaldata?.btn1Text}
            />
            <button
            onClick={modaldata?.btn2Handler}
            className=' cursor-pointer rounded-md bg-richblack-200 py-2 px-5 font-semibold text-richblack-900'
            >
               {modaldata?.btn2Text} 
            </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
