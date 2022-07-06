import React from 'react'
import TopBar from '../components/TopBar';
import SideBar from '../components/SideBar';
import {FcLike} from "react-icons/fc"
import {VscCircleFilled} from "react-icons/vsc"


const Poc = () => {
    
  return (
    <div className="w-screen h-screen flex flex-row justify-start  bg-slate-100">   
    <div className=''>
    {/* Sidebar */}
    <SideBar/>
    
    </div>
    <div className='grow flex flex-col justify-start'>
    {/* Topbar */}
    <TopBar/>
    {/* Feed */}
    <div className='m-2 flex justify-center items-center'>
        <div className='relative h-96 w-56 bg-black m-1 rounded-3xl group'>
            
            {/* Image */}
                <img
                src="../images/fashion_1.jpg"
                alt=""
                className="absolute top-0 left-0 w-full opacity-100 
                cursor-pointer h-full object-cover rounded-3xl group-hover:opacity-60"
                />
                {/* Button like */}
                <div className='absolute bottom-6 cursor-pointer left-6 opacity-0 hover:scale-125 group-hover:opacity-100'>
                    <FcLike fontSize={38}/>
                </div>
                {/* Tag test */}
                <div className='absolute top-32 left-24 cursor-pointer hover:scale-150 opacity-0 group-hover:opacity-100'>
                    <a href="https://www.amazon.fr/J-VER-Habill%C3%A9e-Business-Affaires-Repassage/dp/B08D7KN4PC/ref=lp_464828031_1_7" target="_blank" rel="noopener noreferrer">
                    <VscCircleFilled color='white'/>
                    </a>
                </div>
                <div className='absolute top-24 right-16 cursor-pointer hover:scale-150 opacity-0 group-hover:opacity-100'>
                    <a href="https://www.amazon.fr/dp/B07FMYPWR9/ref=syn_sd_onsite_desktop_22?psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUExTUlJMlFGNlBGOEdFJmVuY3J5cHRlZElkPUEwODEwOTk5MTlWNlJPVTlVOVFEVCZlbmNyeXB0ZWRBZElkPUEwMDkyOTM3RUUyME9QVlFFTVkyJndpZGdldE5hbWU9c2Rfb25zaXRlX2Rlc2t0b3AmYWN0aW9uPWNsaWNrUmVkaXJlY3QmZG9Ob3RMb2dDbGljaz10cnVl" target="_blank" rel="noopener noreferrer">
                    <VscCircleFilled color='white'/>
                    </a>
                </div>
                <div className='absolute top-[164px] left-28 cursor-pointer hover:scale-150 opacity-0 group-hover:opacity-100'>
                    <a href="https://www.amazon.fr/MLT-Belts-Accessoires-Ceinture-5000/dp/B06XB52SRD/ref=sr_1_1_sspa?c=ts&keywords=Ceintures+homme&qid=1655029258&s=apparel&sr=1-1-spons&ts_id=2308806031&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUFPRDRRVFdWTUM0SjYmZW5jcnlwdGVkSWQ9QTA2NjExOTMyN1BZOEs3RUFKNzUyJmVuY3J5cHRlZEFkSWQ9QTA1NDE5NDgxQ0UzRjJSVzIxMDQ3JndpZGdldE5hbWU9c3BfYXRmJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ==" target="_blank" rel="noopener noreferrer">
                    <VscCircleFilled color='white'/>
                    </a>
                </div>
                <div className='absolute top-60 left-24 cursor-pointer hover:scale-150 opacity-0 group-hover:opacity-100'>
                    <a href="https://www.amazon.fr/Levis-Pantalon-Chino-Shady-Homme/dp/B08P6538GP?ref_=Oct_d_orecs_d_464842031&pd_rd_w=qA3aN&content-id=amzn1.sym.8b3fc3bd-bdeb-490b-996f-bbae80e4e325&pf_rd_p=8b3fc3bd-bdeb-490b-996f-bbae80e4e325&pf_rd_r=8FF6N60QNF6XHFHP0CXK&pd_rd_wg=Bymse&pd_rd_r=c09de715-05ff-446c-bfe1-eb72556355e5&pd_rd_i=B08P6538GP" target="_blank" rel="noopener noreferrer">
                    <VscCircleFilled color='white'/>
                    </a>
                </div>
                <div className='absolute bottom-4 left-28 cursor-pointer hover:scale-150 opacity-0 group-hover:opacity-100'>
                    <a href="https://www.amazon.fr/Superga-Classic-Sneakers-Basses-Adulte/dp/B015O3H4LK?ref_=Oct_d_orecs_d_1765056031&pd_rd_w=GzfZ9&content-id=amzn1.sym.8b3fc3bd-bdeb-490b-996f-bbae80e4e325&pf_rd_p=8b3fc3bd-bdeb-490b-996f-bbae80e4e325&pf_rd_r=0GXAJF6ERJ7405WQJCZG&pd_rd_wg=sZ699&pd_rd_r=a8b9f990-30b6-41c4-a64d-7ea82c8a22d1&pd_rd_i=B015O3H4LK" target="_blank" rel="noopener noreferrer">
                    <VscCircleFilled color='white'/>
                    </a>
                </div>
            </div>
        
    </div>
    </div>


  </div>
  )
}

export default Poc
