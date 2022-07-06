import { Post } from './Post'
import React, {useState, useEffect} from 'react'
import NewOutfitPost from './NewOutfitPost'
import ProfilePost from './ProfilePost'
import PeoplesClothesPost from './PeoplesClothesPost'
import ProfileInfo from './ProfileInfo'
import axios from 'axios'
import { useSelector} from 'react-redux'




const Feed = ({dataId, context}) => {


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
    <div className='m-2 flex flex-row overflow-auto justify-center items-center flex-wrap scrollbar-hide'>


    {context==="Profile" &&
      <div>
        <div className='hidden md:block'>
          <ProfileInfo/>
        </div>
        <div className='md:hidden'>
          <ProfilePost/>
        </div> 
      </div>
      }

      {context==="Search" &&
        <PeoplesClothesPost/>
      }

      {context==="Home" &&
      <NewOutfitPost/> 
      }


      {posts.map((post, id)=>{
        return <Post post={post} id={id}/>
      })}

    </div>
  )
}

export default Feed