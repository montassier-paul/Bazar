import { Post } from './Post'
import React, {useState, useEffect} from 'react'
import PeoplesClothesPost from './PeoplesClothesPost'
import ProfilePost from './ProfilePost'
import axios from 'axios'
import { useSelector} from 'react-redux'




const SearchFeed = ({dataId}) => {

    
    const url = process.env.REACT_APP_BACKEND_URL


    const [API_URL, setAPI_URL] = useState(url + '/api/tags/posts/')



    const [posts, setPosts] = useState([])
    const { user } = useSelector((state) => state.auth)
    const [clothesDisplay, setClothesDisplay] = useState(true)

    useEffect(() => {

        if(clothesDisplay){
            setAPI_URL(url + '/api/tags/posts/')
            setPosts([])

        }
        else{
            
            setAPI_URL(url + '/api/tags/users/')
            setPosts([])
            
        }

    }, [clothesDisplay])

    const updatePage = (bool) => {
        setClothesDisplay(bool)
        // setPosts([]) 

        
     }


    useEffect(() => {

        const fetchPosts = async () => {

            const config = {
                headers: {
                Authorization: `Bearer ${String(user.token)}`,
                },
            }    
     

            try{
            const response = await axios.get(API_URL + String(dataId), config)
            setPosts(response.data) 
            }catch{
            }

        };
        fetchPosts();
      }, [dataId,API_URL]);


  return (
    <div className='m-2 flex flex-row overflow-auto justify-start items-center flex-wrap scrollbar-hide'>


    <PeoplesClothesPost updatePage={updatePage}/>


    {clothesDisplay & posts.length > 0
    ?posts.map((post, id)=>{
        return <Post post={post} id={id}/>
        })
    :posts.map((post, id)=>{
        return <ProfilePost profileId={post._id} id={id}/>
        })
        }


    </div>
  )
}

export default SearchFeed