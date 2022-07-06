import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector} from 'react-redux'
import {CgProfile} from "react-icons/cg"

const Comment = ({comment}) => {

  let navigate = useNavigate();
  const url = process.env.REACT_APP_BACKEND_URL; 
  const [profileData, setProfileData] = useState({})
  const { user } = useSelector((state) => state.auth)

  const HandleProfileOnclick = () => {
    navigate(`/Profile/${profileData._id}`);
  }

  
  useEffect(() => {
    const fetchUserInfo = async () => {
        const config = {
            headers: {
            Authorization: `Bearer ${String(user.token)}`,
            },
        }
        



        const profile_response = await axios.get(url + "/api/users/" + String(comment.userId), config)
        setProfileData(profile_response.data)


    };
    fetchUserInfo();
  }, [comment]);



  return (
    <div className='w-full  rounded-3xl flex flex-row justify-start p-2'>
        {/* left */}
        <div className=''>

              {!profileData.profilePicture || profileData.profilePicture === " "

              ?<CgProfile fontSize={20} onClick={HandleProfileOnclick}
              className='cursor-pointer hover:scale-125'/>
              :<img 
              src={profileData.profilePicture} 
              alt="Profile Picture" 
              className='rounded-full w-8 cursor-pointer hover:scale-125' 
              onClick={HandleProfileOnclick}
              />
          }

        </div>

        {/* Right */}
        <div className='flex w-full flex-col justify-start m-1'>
            {/* Header */}
            <div className='flex flex-row justify-start space-x-1 '>
                <p className='text-xs font-bold'>{profileData.username}</p>
                <p className='text-xs'>{String(comment.updatedAt).substring(0,10)}</p>
            </div>
            {/* Comment */}
            <div>
                <p>{comment.message}</p>
            </div>
        </div>
        

        
    </div>
  )
}

export default Comment