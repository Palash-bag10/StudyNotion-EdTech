import React from 'react'
import IconButton from './IconButton'

const ConfirmationModal = ({modaldata}) => {
  return (
    <div>
      <div>
        <p> {modaldata.text1} </p>
        <p> {modaldata.text2} </p>
        <div>
            <IconButton
                onclick={modaldata?.btn1Handler}
                text={modaldata?.btn1Text}
            />
            <button
            onClick={modaldata?.btn2Handler}
            >
               {modaldata?.btn2Text} 
            </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
