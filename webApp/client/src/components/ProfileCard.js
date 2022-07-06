import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector} from 'react-redux'
import axios from 'axios'
import {CgProfile} from "react-icons/cg"



const ProfileCard = ({userId}) => {

 
  const [userData, setUserData] = useState({})
  const { user } = useSelector((state) => state.auth)
  const loader = useSelector(state => state.loader.value)



  const API_URL = process.env.REACT_APP_BACKEND_URL + '/api/users/'



  useEffect(() => {
      const fetchUserInfo = async () => {

          const config = {
              headers: {
              Authorization: `Bearer ${String(user.token)}`,
              },
          }
          
          const response = await axios.get(API_URL + String(userId), config)

          setUserData(response.data) 
      };
      fetchUserInfo();
    }, [user, loader]);


  let navigate = useNavigate();

    const HandleImageOnclick = () => {
      navigate(`/Profile/${userId}`);
    }

  return (
    

    <div className='flex justify-center items-center mr-1 ml-1 pr-1 pl-1 h-6'
    onClick={HandleImageOnclick}>
      {!userData.profilePicture || userData.profilePicture.length === 0

          ?<div className='cursor-pointer'><CgProfile fontSize={20}/></div>
          :<img 
          src={userData.profilePicture} 
          alt="Profile Picture" 
          className='rounded-full  cursor-pointer h-6 w-auto' 
          />

          }
      <div className='opacity-0 cursor-default'>aaaa</div>
    </div>
  )
}

export default ProfileCard