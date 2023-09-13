import React from 'react'
import { useSelector } from 'react-redux'
import IconButton from '../../../common/IconButton'

const RenderTotalAmount = () => {

    const {totalPrice, cart} = useSelector((state) => state.cart)

    const handleBuyCourses = () => {
        const courses = cart.map((course) => course._id)
        console.log('Bought This Courses:', courses)
    }

  return (
    <div>
      <p>Total: </p>
      <p>Rs {totalPrice}</p>

      <IconButton 
        text="Buy Now"
        onclick={handleBuyCourses}
        customClasses={"w-full justify-center"}
      />
    </div>
  )
}

export default RenderTotalAmount
