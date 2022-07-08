import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector} from 'react-redux'
import { TrendsFeed } from '../components/TrendsFeed';



const TrendsWall = () => {

  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  // navigate to login page if not logged
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  return (

      <TrendsFeed/>

  )
}

export default TrendsWall