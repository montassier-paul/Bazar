import React, { useEffect, useState } from 'react'
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai"
import {ImPlus} from "react-icons/im"
import { useNavigate } from 'react-router-dom';
import ImageMapper from 'react-image-mapper';
import { useSelector} from 'react-redux'
import axios from 'axios';


// Heart fill if liked emty either
//Ajouter des vidéos

export const Post = ({post}) => {

  let navigate = useNavigate();
  const url = process.env.REACT_APP_BACKEND_URL

  const [liked, setLiked] = useState(false);
  const { user } = useSelector((state) => state.auth) 
  const [isShown, setIsShown] = useState(false)






  const HandlePlusOnclick = () => {
    navigate(`/Pin/${post._id}`);
}

  const onclick = (index) => {
    // console.log(postData.links[index.id].link)
    window.open(post.links[index.id].link)
  }

  const onMouseEnter = () => {
    setIsShown(true)
    console.log(JSON.parse(post.clothesPosition))
  }

  const onMouseLeave = () => {
    setIsShown(false)
    console.log(isShown)
  }

  const HandleLikeOnclick = async() => {
    const config = {
      headers: {
      Authorization: `Bearer ${String(user.token)}`,
      },
  }  

    if(liked){
      setLiked(false);
       const response = await axios.put(url + '/api/posts/' + String(post._id) + '/like' ,
      {'userId':String(user._id)},  config)
    }
    else{
      setLiked(true);
      const response = await axios.put(url + '/api/posts/' + String(post._id) + '/like' ,
      {'userId':String(user._id)},  config)
    }
  }


  return (
    <div className='h-96 w-56 m-1 rounded-3xl'>
    <div className='relative h-auto w-full bg-black group'>
      
        
    {/* Image */}
      <div className='absolute top-0 left-0 w-full opacity-100 
              cursor-pointer  overflow-auto rounded-3xl group-hover:opacity-60 bg-slate-200'
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}>  

              

              {!post.clothesPosition || !isShown
              ?<img
              src={post.image}
              alt=""
              className="w-[224px]"
            />
              :<ImageMapper
                      src={post.image}
                      map={JSON.parse(post.clothesPosition)}
                      onClick={(index) => onclick(index)}
                      width={224}
                      height={384}
                  />
                }

            </div>
        {/* Button like */}
        <div 
        className='absolute top-1 cursor-pointer left-6 opacity-0 hover:scale-125 group-hover:opacity-100'
        onClick={HandleLikeOnclick}>
            {liked
            ?<AiFillHeart fontSize={38} color='red'/>
            :<AiOutlineHeart fontSize={38} color='red'/> 
            }
        </div>   
        <div 
        className='absolute top-3 cursor-pointer right-6 opacity-0 hover:scale-125 group-hover:opacity-100'
        onClick={HandlePlusOnclick}>
            <ImPlus ontSize={52} color='red'/>
        </div>   
      </div>
    </div>
  )
}
