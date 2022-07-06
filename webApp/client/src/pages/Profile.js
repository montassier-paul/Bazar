import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector} from 'react-redux'
import ProfileFeed from '../components/ProfileFeed';

const Profile = () => {

  const navigate = useNavigate()
  const profileId = window.location.pathname;

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }


  }, [user, navigate])

  return (


        <ProfileFeed profileId={profileId.substring(9)}/>

  )
}

export default Profile