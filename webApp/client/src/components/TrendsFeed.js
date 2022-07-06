import TagCard from './TagCard'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useSelector} from 'react-redux'



export const TrendsFeed = () => {

  const url = process.env.REACT_APP_BACKEND_URL

  const [tagsData, setTagsData] = useState([])
  const { user } = useSelector((state) => state.auth)
  

  const API_URL = process.env.REACT_APP_BACKEND_URL + '/api/tags/trend/100'

  useEffect(() => {
    const fetchUserInfo = async () => {

        const config = {
            headers: {
            Authorization: `Bearer ${String(user.token)}`,
            },
        }
        
        const response = await axios.get(API_URL, config)

        console.log(response.data)
        setTagsData(response.data) 
    };
    fetchUserInfo();
  }, [user]);


  return (
    <div className='flex flew-row justify-start flex-wrap'>
        
        {tagsData
        ? tagsData.map((tag, id)=>{
          return <TagCard tag={tag} id={id}/>
          })
        : <></>
        }

    </div>
  )
}
