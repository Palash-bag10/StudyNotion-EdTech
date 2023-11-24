import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "../../../../common/IconButton";



export default function PublishCourse(){

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: {errors},
    } = useForm();

    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const onSubmit = () => {

    }

    const goBack = () => {

    }

    return(
        <div className=" bg-richblack-800 border-richblack-700 p-6 rounded-md border-[1px]">
         <p className=" text-richblack-5 font-semibold text-2xl">Publish Course</p>
         <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" my-6 mb-8">
              <label htmlFor="public" className=" items-center inline-flex text-medium">
                <input 
                    type="checkbox" 
                    id="public"
                    {...register("public", {required: true})}
                    className=" h-4 w-4 bg-richblack-500 border-gray-300 focus:ring-2 focus:ring-richblack-5 rounded" 
                    />

                    <span className=" ml-2 text-richblack-400">Make this Course Public</span>
              </label>
            </div>

            <div className=" ml-auto flex items-center max-w-max gap-x-4">
                <button
                disabled={loading}
                type="button"
                onClick={goBack}
                className=" flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-2 px-5 font-semibold text-richblack-900 ">
                    Back
                </button>
                <IconButton disabled={loading} text="Save & Publish"/>
            </div>
         </form>
        </div>
    );
}