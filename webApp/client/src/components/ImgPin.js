import React, {useState, useEffect} from 'react'
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai"
import { useNavigate } from 'react-router-dom';
import Comment from './Comment';
import AddComment from './AddComment';
import { useSelector, useDispatch} from 'react-redux'
import axios from 'axios';
import TagCard from './TagCard';
import {CgProfile} from "react-icons/cg"
import ImageMapper from 'react-image-mapper';
import SearchFeed from './SearchFeed';
import {load} from "../features/loader/loaderSlice"



const ImgPin = ({postId}) => {

  let navigate = useNavigate();
  const dispatch = useDispatch()
  const url = process.env.REACT_APP_BACKEND_URL
  const { user } = useSelector((state) => state.auth)
  const [liked, setLiked] = useState(false);
  const [postData, setPostData] = useState({"clothesRef" : []})
  const [isShown, setIsShown] = useState(false)
  const [profileData, setProfileData] = useState({})
  const [comments, setComments] = useState([])
  const [similarTag, setSimilarTag] = useState([])
  const [tags, setTags] = useState([])
  const [follow, setFollow] = useState("follow")
  const [updateComments, setUpdateComments] = useState(0)

  // random number => select randomly post tag to display similar product
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  // force reload message when new comment added
  const updating = () => {
    if(updateComments === 0){
      setUpdateComments(1)
    }
    else{
      setUpdateComments(0)
    }
  }

  //  navigate to corresponding profile
  const HandleProfileOnclick = () => {
    navigate(`/Profile/${profileData._id}`);
    
  }

  // open item link when tag clicked
  const onclick = (index) => {
    // console.log(postData.links[index.id].link)
    window.open(postData.links[index.id].link)
  }

  // Show image item tag when mouse inside image
  const onMouseEnter = () => {
    setIsShown(true)
    console.log(isShown)
  }

  // Hide image item tag when mouse leave the image
  const onMouseLeave = () => {
    setIsShown(false)
    console.log(isShown)
  }

  // get tag name to display similar product
  useEffect(() => {
    const fetchSimalarTag = async () => {

    const config = {
      headers: {
      Authorization: `Bearer ${String(user.token)}`,
      },
  }  

    
    if(postData.tags){
      console.log(postData.tags[0])
      let index = getRandomInt(postData.tags.length)
      const response = await axios.get(url + "/api/tags/get/" + String(postData.tags[index]), config)
      setSimilarTag(response.data[0]._id)
    }

  };

  fetchSimalarTag(); 

  }, [postData])


  // Update database when image liked/unliked
  const HandleLikeOnclick = async() => {
    console.log(postData.clothesPosition)
    const config = {
      headers: {
      Authorization: `Bearer ${String(user.token)}`,
      },
  }  

    if(liked){
      setLiked(false);
       const response = await axios.put(url + '/api/posts/' + String(postData._id) + '/like' ,
      {'userId':String(user._id)},  config)
    }
    else{
      setLiked(true);
      const response = await axios.put(url + '/api/posts/' + String(postData._id) + '/like' ,
      {'userId':String(user._id)},  config)
    }
  }

  // get post data
  useEffect(() => {
    const fetchUserInfo = async () => {
        const config = {
            headers: {
            Authorization: `Bearer ${String(user.token)}`,
            },
        }
        
        // get post data
        const response = await axios.get(url + '/api/posts/' + String(postId), config)
        
        console.log("ici")
        console.log(response.data)
        setPostData(response.data)

        // get user  data from user who posted the post
        const profile_response = await axios.get(url + "/api/users/" + String(response.data.userId), config)
        setProfileData(profile_response.data)

        // get comments of the post
        const comments_response = await axios.get(url + "/api/messages/post/" + String(postId), config)
        setComments(comments_response.data)

        //  get tags added to the post
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

        // check if user follow the user who post
        if(profile_response.data.followers.includes(user._id)){
          setFollow("unfollow")
        }
        // check if user like the image
        if(response.data.likes.includes(user._id)){
          setLiked(true)
        }

    };
    fetchUserInfo();
  }, [postId]);


  // get message of the post when new messages added
  useEffect(() => {
    const fetchMessages = async () => {
        const config = {
            headers: {
            Authorization: `Bearer ${String(user.token)}`,
            },
        }
        
        const comments_response = await axios.get(url + "/api/messages/post/" + String(postId), config)
        setComments(comments_response.data)

    };

    fetchMessages();
  }, [updateComments]);


  // Handle follow/unfollow click
  const handleFollowButton = async() => {
  
    const config = {
      headers: {
      Authorization: `Bearer ${String(user.token)}`,
      },
  }     

    if(follow === "follow"){
      
        
      const response = await axios.put(url + '/api/users/' + String(profileData._id) + '/follow' ,
      {'userId':String(user._id)},  config)

      setFollow("unfollow")

    }else{

      
      const response = await axios.put(url + '/api/users/' + String(profileData._id) + '/unfollow' ,
      {'userId':String(user._id)},  config)

      setFollow("follow")

    }


    dispatch(load())

  
  }



  return (

    
    <div className='flex flex-col grow'>

      {profileData._id !== undefined &&
      

      <div className='grow flex justify-center items-center'>
        <div className='h-96 m-10 w-fit rounded-3xl bg-transparent flex flex-row justify-start md:bg-white'>
          {/* LeftSide */}
          <div className='w-56 h-auto'>
            <div className='relative h-auto w-56 bg-black group'>
            {/* Image */}

              <div className='absolute top-0 left-0 w-full opacity-100 
                cursor-pointer overflow-auto rounded-3xl group-hover:opacity-60 bg-slate-200'
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}>
                {postData.clothesPosition && isShown
                ?<ImageMapper
                        src={postData.image}
                        map={JSON.parse(postData.clothesPosition)}
                        onClick={(index) => onclick(index)}
                        width={224}
                        height={384}
                    />
                : <img
                src={postData.image}
                alt=""
                className="w-full h-auto"
              />
                  }
            </div>
            {/* Button like */}
            <div 
            className='absolute top-2 cursor-pointer left-6 opacity-0 hover:scale-125 group-hover:opacity-100'
            onClick={HandleLikeOnclick}>
              {liked
              ?<AiFillHeart fontSize={38} color='red'/>
              :<AiOutlineHeart fontSize={38} color='red'/>
              }
            </div>       
          </div>
        </div>

          {/* RightSide */}
          <div className='hidden md:block'>
            <div className='h-full w-[400px] rounded-br-3xl rounded-tr-3xl flex flex-col '>
              {/* Top */}
              <div className='w-full  flex flex-row justify-between h-2/6 mt-4 ml-4 pr-10'>
                {/* Tags */}
                <div className='w-3/4 flex flex-row justify-start flex-wrap'>
                    {!postData.tags || postData.tags.length == 0
                    ?<div>no tags</div>
                    :tags.map((tag, id)=>{
                      return <TagCard tag={tag} id={id}/>
                    }) 

                    }            
                </div>
                {/* Profile Picture and follow and unfollow button */}
                <div className='flex flex-col justify-start'>
                  {/* profile picture */}
                  <div className="w-full flex items-center justify-center h-auto cursor-pointer hover:scale-125">
                      {!profileData.profilePicture || profileData.profilePicture === " "

                        ?<CgProfile fontSize={32} onClick={HandleProfileOnclick}/>
                        :<img 
                        src={profileData.profilePicture} 
                        alt="Profile Picture" 
                        className='rounded-full w-12' 
                        onClick={HandleProfileOnclick}
                        />

                      }
                  </div>
                  {/* follow unfollow button */}
                  

                {profileData._id === user._id 
                ?<></>
                :<div className='bg-blue-300 hover:bg-blue-400 rounded-2xl mt-2 h-6  w-20'>
                  <button type='button' className='w-full' onClick={handleFollowButton}>
                    {follow}
                  </button>
                </div>}

                  </div>
              </div>
              {/* Buttom */}
              <div className='w-full h-full  rounded-br-3xl flex flex-col justify-start
              items-center pt-2'>
                {/* Comments */}
                <div 
                className='w-5/6 h-44 rounded-3xl flex flex-row 
                flex-wrap overflow-y-auto'>
                  {comments.map((comment, id)=>{
                    return <Comment comment={comment} id={id}/>
                  })}         
                </div>    
                {/* add comments */}
                <div className='w-5/6 h-20 rounded-3xl mt-2'>
                  <AddComment postId={postId} updating={updating}/>       
                </div>
              </div>
            </div>
          </div>  
        </div>
      </div>
      }


      
      {similarTag &&
        <SearchFeed dataId={similarTag}/>
      }

    
    </div>


  )
}

export default ImgPin