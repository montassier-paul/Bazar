import { useNavigate } from 'react-router-dom';
import coverPicture from "../images/coverPicture.jpg"
import ProfileModal from './ProfileModal';
import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import {CgProfile} from "react-icons/cg"
import TagCard from "./TagCard";
import {load} from "../features/loader/loaderSlice"





const ProfilePost = ({profileId}) => {

  const url = process.env.REACT_APP_BACKEND_URL
  let navigate = useNavigate();
  const dispatch = useDispatch()
  const [modalOpened, setModalOpened] = useState(false);
  const [follow, setFollow] = useState("follow")
  const { user } = useSelector((state) => state.auth)
  const [profileData, setProfileData] = useState({"tags" : []})
  const [tags, setTags] = useState([])
  const API_URL = url + '/api/users/'

  // fetch user data 
  useEffect(() => {
    const fetchUserInfo = async () => {
      setTags([])
        const config = {
            headers: {
            Authorization: `Bearer ${String(user.token)}`,
            },
        }
        
        const response = await axios.get(API_URL + String(profileId), config)

        console.log(response.data)
        setProfileData(response.data)

        if(response.data.tags.length === 1){
          setTags([])
          const res = await axios.get(url + '/api/tags/get/'+ String(response.data.tags[0]), config)
          console.log(res.data)
          setTags(res.data)
        }
        if(response.data.tags.length === 2){
          setTags([])
          const res = await axios.get(url + '/api/tags/get/'+ String(response.data.tags[0]) +"/" + String(response.data.tags[1]), config)
          console.log(res.data)
          setTags(res.data)
        }
        if(response.data.tags.length === 3){
          setTags([])
          const res = await axios.get(url + '/api/tags/get/'+ String(response.data.tags[0]) + "/" + String(response.data.tags[1]) + "/" + String(response.data.tags[2]), config)
          console.log(res.data)
          setTags(res.data)
        }


        if(response.data.followers.includes(user._id)){
          setFollow("unfollow")
        }
        
    };
    fetchUserInfo();
  }, [profileId, modalOpened]);

  // Navigate to corresponding Profile Page
  const HandleImgOnclick = () => {
      navigate(`/Profile/${profileId}`)
    }


  // update database when follow button clicked
  const handleFollowButton = async() => {
    const config = {
      headers: {
      Authorization: `Bearer ${String(user.token)}`,
      },
    }     

    if(follow === "follow"){
      setFollow("unfollow")
        
      const response = await axios.put(url + '/api/users/' + String(profileId) + '/follow' ,
      {'userId':String(user._id)},  config)

    }else{

      setFollow("follow")
      const response = await axios.put(url + '/api/users/' + String(profileId) + '/unfollow' ,
      {'userId':String(user._id)},  config)

    }

    dispatch(load())

  }



return (
    <>
    {profileData._id !== undefined &&
    <div className=' h-96 w-56 m-1 rounded-3xl flex flex-col justify-start'>
      {/* top : Profile and Cover image */}
      <div className='relative w-full h-1/2 rounded-tl-3xl rounded-tr-3xl cursor-pointer'>


        {!profileData.coverPicture || profileData.coverPicture === " "

        ?<img
        src={coverPicture}
        alt=""
        className="absolute top-0 left-0 w-full h-full object-cover rounded-tl-3xl rounded-tr-3xl opacity-100 hover:opacity-60"
        onClick={HandleImgOnclick }/>
        :<img 
        src={profileData.coverPicture} 
        alt="Profile Picture" 
        className="absolute top-0 left-0 w-full h-full object-cover rounded-tl-3xl rounded-tr-3xl opacity-100 hover:opacity-60"
        onClick={HandleImgOnclick }
        />

        }

        {!profileData.profilePicture || profileData.profilePicture === " "

        ? <CgProfile fontSize={40} className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2"/>
        :<img 
        src={profileData.profilePicture} 
        alt="Profile Picture" 
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-14 h-14 rounded-full" 
        />

        }



      </div>
      {/* bottom : name, tag, desc */}
      <div className='w-full h-1/2 bg-white pt-3 pl-5 mt-1 flew flex-col justify-start space-y-2 rounded-bl-3xl rounded-br-3xl'>
        <span className=''>{profileData.username}</span>
        <div className='w-full flex flex-row justify-start flex-wrap'>
          {!profileData.tags || profileData.tags.length == 0
          ?<div>no tags</div>
          :tags.map((tag, id)=>{
            return <TagCard tag={tag} id={id}/>
          }) 

          }          
              
        </div>
        <div className='italic'>
          {!profileData.desc || profileData.desc.length === 0

      
                ?<div>I am new Here</div>
                :<div>{String(profileData.desc).substring(50)}</div>

                }            
            
        </div>
        <div className='w-full flex justify-end pr-3'>
          <div className='bg-blue-300 hover:bg-blue-400 rounded-2xl mt-2 h-6  w-20'>
            {profileData._id === user._id           
            ?<button type='button' className='w-full' onClick={() => setModalOpened(true)}>
                Edit
            </button>
            :<button type='button' className='w-full' onClick={handleFollowButton}>
              {follow}
              </button>

            }

            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              profileData={profileData}
            />
          </div>
        </div>

      </div>
      
    </div>
    }

    </>
  )
}

export default ProfilePost
