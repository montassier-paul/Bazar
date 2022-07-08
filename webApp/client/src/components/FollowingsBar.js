import ProfileCard from './ProfileCard'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useSelector, useDispatch} from 'react-redux'
import { loaded } from '../features/loader/loaderSlice';


const FollowingsBar = ({userId}) => {



  const [userData, setUserData] = useState({})
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const loader = useSelector(state => state.loader.value)
  const API_URL = process.env.REACT_APP_BACKEND_URL


  // load user infor, update forced when follow/unfollow button clicked
  useEffect(() => {
      const fetchUserInfo = async () => {

          const config = {
              headers: {
              Authorization: `Bearer ${String(user.token)}`,
              },
          }
          
          const response = await axios.get(API_URL +  '/api/users/' + String(user._id), config)

          console.log(response.data)
          setUserData(response.data) 
          dispatch(loaded())
      };
      fetchUserInfo();
    }, [user, loader]);


  return (
    <div className='w-80 flex overflow-x-scroll rounded scrollbar-hide h-full mt-5'>


      {userData.followings
      ? userData.followings.map((userId, id)=>{
          return <ProfileCard userId={userId} id={id}/>
        })
      : <></>
      }
    

    </div>
  )
}

export default FollowingsBar