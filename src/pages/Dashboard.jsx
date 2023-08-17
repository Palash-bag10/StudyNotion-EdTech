import React from 'react'
import SideBar from '../components/core/Dashboard/SideBar';
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';

const Dashboard = () => {

    const {loading: authLoading} = useSelector( (state) => state.auth);
    const {loading: profileLoading} = useSelector( (state) => state.profile);

    if(authLoading || profileLoading){
        return(
            <div>
                <div className='spinner'></div>
            </div>
        )
    }

  return (
    <div className=' text-white flex'>
      <SideBar />
      <div>
        <div>
            <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
