import React, { useEffect, useState } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import "swiper/css"
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import { FreeMode, Pagination}  from 'swiper/modules'
import ReactStars from "react-rating-stars-component"
import { apiConnector } from '../../services/apiconnector';
import { ratingsEndpoints } from '../../services/apis';

const ReviewSlider = () => {

    const [reviews, setReviews] = useState([]);
    const truncateWords = 15;

    useEffect(() => {
        const fetchAllReviews = async() => {
            const {data} = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API)
            console.log("RATING RESPONSE: ", data)

            if(data?.success){
                setReviews(data?.data)
            }

            console.log("Printing Reviews", reviews);
        }
        fetchAllReviews();
    }, [])

  return (
    <div>
      hi
    </div>
  )
}

export default ReviewSlider
