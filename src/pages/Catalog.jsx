import React from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogPageData } from '../services/operation/pageAndComponentData';

const Catalog = () => {

    const {catalogName} = useParams();
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");

    // FETCH ALL CATEGORIES
    useEffect(() => {
        const getCategories = async() => {
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            const category_id = res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            setCategoryId(category_id);
        }
        getCategories();
    },[catalogName]);

     useEffect(() => {
        const getCategoryPageDetails = async() => {
            try{
                const res = await getCatalogPageData(categoryId);
                console.log("RES :", res);
                setCatalogPageData(res);
            } catch(error){
                console.log(error)
            }
        }
        getCategoryPageDetails();
     },[categoryId])


  return (
    <div className=' text-white'>

      <div>
        <p> {`Home / Catalog /`} 
        <span>

        </span>
        </p>
        <p></p>
        <p></p>
      </div>

      <div>
        {/* SECTION 1 */}
        <div>
            <div className=' flex gap-x-3'>
                <p>Most Popular</p>
                <p>New</p>
            </div>
            {/* <CourseSlider /> */}
        </div>

        {/* SECTION 2 */}
        <div>
            <p>Top Courses</p>
            <div>
                {/* <CourseSlider /> */}
            </div>
        </div>

        {/* SECTION 3 */}
        <div>
            <p>Most Selling</p>
        </div>

      </div>
     <Footer/>
    </div>
  )
}

export default Catalog
