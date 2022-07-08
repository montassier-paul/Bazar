import React from 'react'
import TrendsBar from './TrendsBar'
import FollowingsBar from './FollowingsBar'
import ButtonTopBar from './ButtonTopBar'


const TopBar = () => {
  
  return (
    <div className= "flex flex-row justify-center h-16 w-full bg-white  pb-2 pl-3 pr-2 space-x-12">
        {/* TrendTags bar */}
        <div className='hidden xl:block'>
          <TrendsBar/>
        </div>
        {/* search input */}
        <div className=''>
          <ButtonTopBar/>
        </div>
        {/* followings bar */}
        <div className='hidden md:block'>
          <FollowingsBar className/>
        </div>
        
    </div>
  )
}

export default TopBar