import React, { useState, useCallback, useEffect } from "react";
import {BsPlusCircle} from "react-icons/bs"; 
import {HiOutlineMinusCircle} from "react-icons/hi"
import ImageMapper from "react-image-mapper";
import {TbHandClick} from "react-icons/tb"
import { useSelector, useDispatch} from 'react-redux' 
import axios from "axios";
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import { load } from "../features/loader/loaderSlice";





const PostCreation = () => {

  const url = process.env.REACT_APP_BACKEND_URL
  const [query, setQuery] = useState(1);
  const [idLink, setIdLink]  = useState(0);
  const color = ['#00F','#0F0','#F00','#FFF','#000']; 
  const { user } = useSelector((state) => state.auth)
  const dispatch = useNavigate()
  const [mapAreas, setMapAreas] = useState({
    name: "my-map",
    areas: [
      
    ]
  });
  const [formData, setFormData] = useState({
    title: '',
    tag1: '',
    tag2: '',
    tag3: '',
    image: undefined, 
    links: [], 
    clothesPosition: [],
    userId: String(user._id),
  })

  const [inputLinks, setInputLinks] = useState([]);
  const {title, tag1, tag2, tag3, image, links, clothesPosition, userId} = formData
  const [img, setImg] = useState();

  // handle click event of the Remove button => remove tags and links 
  const HandleMinusButton = index => {
    if(inputLinks.length > 0){
    const list = [...inputLinks];
    list.splice(-1);
    setInputLinks(list);

    const areas = [...mapAreas.areas];
    areas.splice(-1);
    setMapAreas({
      name: mapAreas.name,
      areas
    });

    if(idLink==inputLinks.length-1 && inputLinks.length != 1){
      setIdLink(inputLinks.length - 2);

    }

    }
  };


 
  // handle click event of the Add button => add tag and link
  const HandlePlusButton = () => {

    if(inputLinks.length<5){

      const areas = [...mapAreas.areas, { id: inputLinks.length, shape: "circle", coords: [170, 100, 5], preFillColor: color[inputLinks.length]}];

      setMapAreas({
        name: mapAreas.name,
        areas
      });

    setInputLinks([...inputLinks, {link: " " }]);  

    }
  };

  // Load image
  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
    // setImg(file)

    setFormData((prevState) => ({
      ...prevState,
      ['image']:file,
    }))
  };

  // handle click to change tag position
  const handleUpdateMapArea = (evt) => {

    updateMapArea(idLink, [evt.nativeEvent.layerX, evt.nativeEvent.layerY, 5]);
  }

  // 
  useEffect(() => {
    setQuery(Math.random());
  }, [mapAreas]);

  //  Handle update of tag position when tag moved
  const updateMapArea = (id, coords) => {
    console.log(id, coords);
    const areas = mapAreas.areas.map(item =>
      item.id === id ? { ...item, coords } : item
    );

    setMapAreas({
      name: mapAreas.name,
      areas
    });
  };

  // handle tag choice
  const HandleHandOnClick = (id) => {
    setIdLink(id); 
  }; 

  // Handle tag or title writing
  const onChange = (e) => {
    console.log(formData)

    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  // Handle Link writing
  const onChangeLinks = (e) => {
    const link = inputLinks[e.target.name];
    link["link"] = e.target.value;
    setInputLinks([
      ...inputLinks.slice(0, e.target.name),
      link,
      ...inputLinks.slice(e.target.name + 1, inputLinks.length)
    ]);   

  }

  // update form when inputLinks change
  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      ['links']: inputLinks,
      ['clothesPosition']:[JSON.stringify(mapAreas)]

    }))
  }, [inputLinks]);
  
  // send new post to database
  const onSubmit = async(e) => {
    e.preventDefault();
    const config = {
        headers: {
        Authorization: `Bearer ${String(user.token)}`,
        "Content-Type": "multipart/form-data"
        },
            }


    // handle imgage, tags position, tags link, title, userId 
    const res1 = await axios.post(url + '/api/posts', formData, config)

    //  handle tag creation  => for each tag create the relationship between tag and post
    if(tag1.length > 0){
      const res2 = await axios.put(url + "/api/tags/addtopost/" + String(tag1),
      {
        postId : String(res1.data._id),
      }, 
      {
        headers: {
        Authorization: `Bearer ${String(user.token)}`
        },
      })
    }
  
    if(tag2.length > 0){
      const res3 = await axios.put(url + "/api/tags/addtopost/" + String(tag2),{
        postId : String(res1.data._id),
      }, 
      {
        headers: {
        Authorization: `Bearer ${String(user.token)}`
        },
      })

    }
  
    if(tag3.length > 0){
    const res4 = await axios.put(url + "/api/tags/addtopost/" + String(tag3),{
      postId : String(res1.data._id),
    }, 
    {
      headers: {
      Authorization: `Bearer ${String(user.token)}`
      },
          })
    }
  
    // force to reload user data
    dispatch(load())

    toast("Post Shared!")
  }


  return (
    <div className='w-full h-full flex flex-row justify-center items-center flex-wrap overflow-auto'>

      {/* image loader */}
      <div className='p-3'>
        <input type="file" onChange={onImageChange} />
        <div className="relative h-96 w-56 m-1 rounded-3xl">
          <ImageMapper
          src={img}
          //onClick={area => getTipPosition(area)}
          onImageClick={handleUpdateMapArea}
          map={mapAreas}
          width={224}
          height={384}
          />
        </div>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit}>
        <div className='flex flex-col justify-start space-y-5 p-4'>
          <div className="flex w-full justify-start items-start w-25">
            <h3 className="font-serif">Share your style</h3>
          </div>
          <div className="">
            <input
              type="text"
              className="text-center
              shadow w-25 focus:outline-2 outline-blue-500/50"
              placeholder="Title"
              id="title"
              name="title"
              value={title}
              onChange={onChange}
            />
          </div>

    
          <div className='flex flex-col h-full space-y-2'>
            <div className='pr-3'>
              <input 
              class="text-center
              shadow w-25 focus:outline-2 outline-blue-500/50" 
              type="text" 
              placeholder="New tag"
              id="tag1"
              name="tag1"
              value={tag1}
              onChange={onChange}
              />
            </div>
            <div className='pr-3'>
              <input 
                class="text-center
                shadow w-25 focus:outline-2 outline-blue-500/50" 
                type="text" 
                placeholder="New tag"
                id="tag2"
                name="tag2"
                value={tag2}
                onChange={onChange}
                />
            </div>
            <div className='pr-3'>
              <input 
                class="text-center
                shadow w-25 focus:outline-2 outline-blue-500/50" 
                type="text" 
                placeholder="New tag"
                id="tag3"
                name="tag3"
                value={tag3}
                onChange={onChange}
                />
            </div>
                
          </div>

          <div className="">
            <div className="flex">
              <h3 className="text-center font-serif">Add links to your outfit</h3>
              <div className="ml-2 mt-1 cursor-pointer hover:scale-125" 
              onClick={HandlePlusButton}
              >
                <BsPlusCircle/>
              </div>
              <div className="ml-2 mt-1 cursor-pointer hover:scale-125" 
              onClick={HandleMinusButton}
              >
                <HiOutlineMinusCircle/>
              </div>

            </div>

            <div>
              {inputLinks.map((data, id)=>{
                return <div className='pr-3 mt-1 flex'>
                          <input class="text-center
                          shadow w-25 focus:outline-2 
                          outline-blue-500/50" 
                          id={id}
                          name={id}                     
                          type="text" 
                          placeholder={"link " + String(id + 1)}
                          value={data.link}
                          onChange={onChangeLinks}
                          />
                          <div className="ml-2 mt-1 cursor-pointer active:scale-125"
                          onClick={() => HandleHandOnClick(id)}
                          >
                            <TbHandClick color={color[id]}/>
                          </div>

                        </div>
                        
                })}
            </div>

            <div className="flex w-full justify-end mt-2">
              <div className='bg-blue-300 hover:bg-blue-400 rounded-2xl mt-2 h-6  w-20'>
                <button type='submit' className='w-full'>
                    Edit
                </button>
              </div>
            </div>

          </div>        
        </div>
      </form>
    </div>
  )
}

export default PostCreation