import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import LikedFeed from '../components/LikedFeed';
import { useSelector} from 'react-redux'

const LikedPosts = () => {
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  // check if user logged
  useEffect(() => {
    if (!user) {    
      navigate('/Login')
    }

  }, [user, navigate])

    return (    
      <LikedFeed dataId={user._id}/>

    )
}

export default LikedPosts