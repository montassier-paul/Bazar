import { Post } from './Post'
import React, {useState, useEffect} from 'react'
import NewOutfitPost from './NewOutfitPost'
import axios from 'axios'
import { useSelector} from 'react-redux'




const HomeFeed = ({dataId}) => {



    const API_URL = process.env.REACT_APP_BACKEND_URL + '/api/'


    const [posts, setPosts] = useState([])
    const { user } = useSelector((state) => state.auth)




    useEffect(() => {
        const fetchPosts = async () => {

            const config = {
                headers: {
                Authorization: `Bearer ${String(user.token)}`,
                },
            }            


            const response = await axios.get(API_URL + "posts/timeline/" + String(dataId), config)
            console.log(response.data)
            setPosts(response.data) 
        };
        fetchPosts();
      }, [dataId]);


  return (
    <div className='m-2 flex flex-row overflow-auto justify-start items-center flex-wrap scrollbar-hide'>


   
      <NewOutfitPost/> 


      {posts.map((post, id)=>{
        return <Post post={post} id={id}/>
      })}

    </div>
  )
}

export default HomeFeed