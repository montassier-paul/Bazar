import coverPicture from "../images/coverPicture.jpg"
import ProfileModal from './ProfileModal';
import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import {CgProfile} from "react-icons/cg"
import TagCard from "./TagCard";
import {load} from "../features/loader/loaderSlice"



const ProfileInfo = ({profileId}) => {

  const url = process.env.REACT_APP_BACKEND_URL
  const [modalOpened, setModalOpened] = useState(false);
  const { user } = useSelector((state) => state.auth)
  const [profileData, setProfileData] = useState({"tags" : []})
  const [follow, setFollow] = useState("follow")
  const [tags, setTags] = useState([])
  const API_URL = url + '/api/users/'
  const dispatch = useDispatch()


  useEffect(() => {
    const fetchUserInfo = async () => {
        const config = {
            headers: {
            Authorization: `Bearer ${String(user.token)}`,
            },
        }
        
        const response = await axios.get(API_URL + String(profileId), config)

        console.log(response.data)
        setProfileData(response.data)



        if(response.tags.length === 1){
          setTags([])
          const res = await axios.get(url + '/api/tags/get/'+ String(response.tags[0]), config)
          console.log(res.data)
          setTags(res.data)
        }
        if(response.tags.length === 2){
          setTags([])
          const res = await axios.get(url + '/api/tags/get/'+ String(response.tags[0]) +"/" + String(response.tags[1]), config)
          console.log(res.data)
          setTags(res.data)
        }
        if(response.tags.length === 3){
          setTags([])
          const res = await axios.get(url + '/api/tags/get/'+ String(response.tags[0]) + "/" + String(response.tags[1]) + "/" + String(response.tags[2]), config)
          console.log(res.data)
          setTags(res.data)
        }

        if(response.followers.includes(user._id)){
          setFollow("unfollow")
        }

        
        
    };
    fetchUserInfo();
  }, [profileId,modalOpened]);


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
    <div className='flex flew-row justify-start bg-white rounded-3xl h-96 m-1 mr-1'>




      
      
      
      {/* rightSide */}
      <div className='h-full w-56'>
        <div className='w-full h-full'>
          

              {!profileData.coverPicture || profileData.coverPicture === " "

              ?<img
              src={coverPicture}
              alt="Cover Picture" 
              className="rounded-tl-3xl rounded-bl-3xl h-full"/>
              :<img 
              src={profileData.coverPicture} 
              alt="Cover Picture" 
              className='rounded-tl-3xl rounded-bl-3xl h-full' 
              />

              }
        </div>
      </div>


      {/* LeftSide */}
      <div className=' h-full w-56 flex flex-col justify-start ml-2'>

        {/*Top*/}

        <div className='h-2/6 flex flex-row justify-start'>

          {/* Right */}

          <div className='w-full flex flex-row justify-start flex-wrap mt-1 ml-1 space-y-1'>

                     
            {!profileData.tags || profileData.tags.length == 0
            ?<div>no tags</div>
            :tags.map((tag, id)=>{
              return <TagCard tag={tag} id={id}/>
            }) 

            }
            


                
          </div>

          {/* Left */}

          <div className='flex flex-col justify-start mt-1 mr-1'>
            

                {!profileData.profilePicture || profileData.profilePicture === " "

                ?<CgProfile fontSize={32}/>
                :<img 
                src={profileData.profilePicture} 
                alt="Profile Picture" 
                className='rounded-full w-12' 
                />

                }

          <h4>{profileData.username}</h4>

          </div>

         

          

        </div>

      {/* Bottom*/}

      <div className='w-full h-3/6 mr-1 ml-1'>

        {!profileData.desc || profileData.desc.length === 0

          
          ?<div>I am new Here</div>
          :<div>{profileData.desc}</div>

          }


      </div>

      {/* Bottom*/}

      <div className='w-full h-1/6 flex justify-center pr-3'>
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

export default ProfileInfo