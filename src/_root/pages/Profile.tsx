// import React from 'react'

import { Outlet } from "react-router-dom"

const Profile = () => {

  return (
    <div className="text-rose-800 ml-72 mt-14 h-screen">
      <h1>Profile</h1>
      <Outlet/>
    </div>
  )
}

export default Profile