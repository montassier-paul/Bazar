import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector} from 'react-redux'
import Feed from '../components/Feed';
import ImgPin from '../components/ImgPin'

const Pin = () => {
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)
  const postId = window.location.pathname;

  useEffect(() => {
    console.log("ici")
      console.log(user)


    if (!user) {    
      navigate('/login')
    }


  }, [user, navigate])

  return (

      <div className='grow flex flex-row justify-center flex-wrap overflow-auto'>


        <ImgPin postId={postId.substring(5)}/>
        <Feed/>
      </div>




  )
}

export default Pin
