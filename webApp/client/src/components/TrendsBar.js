import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useSelector, useDispatch} from 'react-redux'
import TagCard from './TagCard'
import {BsPlusCircle} from "react-icons/bs"
import { useNavigate } from 'react-router-dom'
import { loaded } from '../features/loader/loaderSlice';


const TrendsBar = () => {

  const url = process.env.REACT_APP_BACKEND_URL

  let navigate = useNavigate();
  const dispatch = useDispatch() 

  const [tagsData, setTagsData] = useState([])
  const { user } = useSelector((state) => state.auth)
  const loader = useSelector(state => state.loader.value)



  const API_URL = url + '/api/tags/trend/10'



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

          dispatch(loaded())
      };
      fetchUserInfo();
    }, [user, loader]);


  const HandleMoreTagsOnclick = () => {
    navigate("/TrendsWall");
  }

  return (
      // <div className='w-80 flex overflow-x-scroll scrollbar-hide rounded h-full mt-5'>
        <div className='w-80 flex overflow-x-scroll  rounded h-full mt-2'>

      {tagsData
        ? tagsData.map((tag, id)=>{
          return <TagCard tag={tag} id={id}/>
          })
        : <></>
        }


      <div className='cursor-pointer pt-1 ml-1 mr-2'
      onClick={HandleMoreTagsOnclick}>
        <BsPlusCircle/>
      </div>

    
    </div>
  )
}

export default TrendsBar