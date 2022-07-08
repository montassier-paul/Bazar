import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useSelector, useDispatch} from 'react-redux'
import TagCard from './TagCard'
import {BsPlusCircle} from "react-icons/bs"
import { useNavigate } from 'react-router-dom'
import { loaded } from '../features/loader/loaderSlice';


const TrendsBar = () => {


  let navigate = useNavigate();
  const dispatch = useDispatch() 
  const [tagsData, setTagsData] = useState([])
  const { user } = useSelector((state) => state.auth)
  const loader = useSelector(state => state.loader.value)
  const API_URL = process.env.REACT_APP_BACKEND_URL


  // fetch 10 tags for topbar
  useEffect(() => {
      const fetchUserInfo = async () => {

          const config = {
              headers: {
              Authorization: `Bearer ${String(user.token)}`,
              },
          }
          
          const response = await axios.get(API_URL + '/api/tags/trend/10', config)
          console.log(response.data)
          setTagsData(response.data) 

          dispatch(loaded())
      };
      fetchUserInfo();
    }, [user, loader]);

  // navigate to Search page when tag clicked 
  const HandleMoreTagsOnclick = () => {
    navigate("/TrendsWall");
  }

  return (
      <div className='w-80 flex overflow-x-scroll  rounded h-full mt-2'>

        {tagsData
          ? tagsData.map((tag, id)=>{
            return <TagCard tag={tag} id={id}/>
            })
          : <></>
          }


        <div className='cursor-pointer pt-1 ml-1 mr-2' onClick={HandleMoreTagsOnclick}>
            <BsPlusCircle/>
        </div>

    
    </div>
  )
}

export default TrendsBar