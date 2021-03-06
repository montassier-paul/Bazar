import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import HomeFeed from '../components/HomeFeed';
import { useSelector} from 'react-redux'



const Home = () => {


  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()


  useEffect(() => {
    if (!user) {    
      navigate('/Login')
    }


  }, [user, navigate])


    return (
      
      <>
      {user &&
        <HomeFeed dataId={user._id}/>
      }
      </>

    )
}

export default Home