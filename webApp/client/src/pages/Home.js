import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import HomeFeed from '../components/HomeFeed';
import { useSelector} from 'react-redux'
import axios from 'axios'



const Home = () => {

  const url = process.env.REACT_APP_BACKEND_URL

  
  const [userData, setUserData] = useState({})
  const { user } = useSelector((state) => state.auth)
  // const API_URL = 'http://localhost:8800/api/users/'
  const API_URL = url + '/api/users/'
  const navigate = useNavigate()


  useEffect(() => {
    // console.log('ici')
    // console.log(user)
    if (!user) {    
      navigate('/Login')
    }


  }, [user, navigate])



  useEffect(() => {
      const fetchUserInfo = async () => {

          const config = {
              headers: {
              Authorization: `Bearer ${String(user.token)}`,
              },
          }
          
          const response = await axios.get(API_URL + String(user._id), config)

          
          setUserData(response.data)
          console.log(userData._id) 
      };
      fetchUserInfo();
    }, [user,navigate]);


    return (
      
      
      <HomeFeed dataId={userData._id}/>

    )
}

export default Home