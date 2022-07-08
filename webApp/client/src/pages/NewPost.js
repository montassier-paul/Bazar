import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector} from 'react-redux'
import PostCreation from '../components/PostCreation';


const NewPost = () => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  // check if user logged, if not navigate to login page
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