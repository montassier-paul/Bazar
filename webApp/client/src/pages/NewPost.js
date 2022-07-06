import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector} from 'react-redux'
import PostCreation from '../components/PostCreation';


const NewPost = () => {
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }


  }, [user, navigate])

  return (
  
    <PostCreation/>
  

  )
}

export default NewPost