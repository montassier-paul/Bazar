import { Post } from './Post'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useSelector} from 'react-redux'


const LikedFeed = ({dataId}) => {

  const API_URL = process.env.REACT_APP_BACKEND_URL 
  const [posts, setPosts] = useState([])
  const { user } = useSelector((state) => state.auth)

  // get post liked by user
  useEffect(() => {
      const fetchPosts = async () => {

          const config = {
              headers: {
              Authorization: `Bearer ${String(user.token)}`,
              },
          }            


          const response = await axios.get(API_URL + "/api/posts/liked/" + String(dataId), config)
          console.log(response.data)
          setPosts(response.data) 
      };
      fetchPosts();
    }, [dataId]);


  return (
    <div className='m-2 flex flex-row overflow-auto justify-start items-center flex-wrap scrollbar-hide'>

      {posts.map((post, id)=>{
        return <Post post={post} id={id}/>
      })}

    </div>
  )
}

export default LikedFeed