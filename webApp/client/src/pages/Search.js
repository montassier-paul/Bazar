import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector} from 'react-redux'
import SearchFeed from '../components/SearchFeed';


const Search = () => {

  const navigate = useNavigate()
  const tagId = window.location.pathname;

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user) {
      navigate('/Login')
    }


  }, [user, navigate])

  return (

      <SearchFeed dataId={tagId.substring(8)}/>

  )
}

export default Search