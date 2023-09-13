import { useSelector } from "react-redux"
import RenderCartCourses from "./RenderCartCourses"

export default function Cart() {

    const {totalPrice, totalItems} = useSelector((state) => state.cart)

    return (
        <div>
            <h2>Your Cart</h2>
            <p>{totalItems} Courses in Cart</p>

            {
                totalPrice > 0
                ? (
                    <div>
                        <RenderCartCourses/>
                        <RenderTotalAmount/>
                    </div>
                  )
                : (
                    <p>Your Cart is Empty</p>
                  )
            }
        </div>
    )

}