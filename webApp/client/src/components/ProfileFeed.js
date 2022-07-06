import { Post } from './Post'
import React, {useState, useEffect} from 'react'
import ProfilePost from './ProfilePost'
import ProfileInfo from './ProfileInfo'
import axios from 'axios'
import { useSelector} from 'react-redux'




const Feed = ({profileId}) => {

    const API_URL = process.env.REACT_APP_BACKEND_URL + '/api/posts/profile/'


    const [posts, setPosts] = useState([])
    const { user } = useSelector((state) => state.auth)




    useEffect(() => {
        const fetchPosts = async () => {

            const config = {
                headers: {
                Authorization: `Bearer ${String(user.token)}`,
                },
            }            


            const response = await axios.get(API_URL + String(profileId), config)
            console.log(response.data)
            setPosts(response.data) 
        };
        fetchPosts();
      }, [profileId]);


  return (
    <div className='m-2 flex flex-row overflow-auto justify-start items-center flex-wrap scrollbar-hide'>



        <div>
            <div className='hidden md:block'>
                <ProfileInfo profileId={profileId}/>
            </div>
            <div className='md:hidden'>
                <ProfilePost profileId={profileId}/>
            </div> 
        </div>


      {posts.map((post, id)=>{
        return <Post post={post} id={id}/>
      })}

    </div>
  )
}

export default Feed