import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalAPI';
import React, { useEffect, useState } from 'react'
import { FaMapLocation } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const PlaceCardItem = ({place}) => {
   const [photourl, setphotourl] = useState()
     
      useEffect(() => {
        place&&GetPlacePhoto()
      }, [place])
      
      const GetPlacePhoto=async()=>{
        const data={
          textQuery:place.placeName
        }
          const result=await GetPlaceDetails(data) 
  .then(resp=>{
      console.log(resp.data.places[0].photos[3].name)
      const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name)
      setphotourl(PhotoUrl)
  })    }

    return (
    <div className='flex gap-3 md:gap-5 border rounded-xl p-3 mt-2 h-full hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
        <img src={photourl?photourl:'/airplane.webp'} className='w-[80px] h-[80px] md:w-[130px] md:h-[130px] rounded-xl object-cover' alt="" />
        <div className='flex-1'>
            <h2 className='font-bold text-sm md:text-lg'>{place.placeName}</h2>
            <p className='text-xs md:text-sm text-gray-500 mt-1 md:mt-2'>{place.placeDetails}</p>
            <Link to={'https://www.google.com/maps/search/?api=1&query='+place.placeName+","+place.geoCoordinates.latitude+','+place.geoCoordinates.longitude} target='_blank'>
              <Button className="bg-slate-950 w-full flex gap-4 items-center mt-2 md:mt-4 hover:text-black hover:bg-slate-300 text-white text-xs md:text-sm">
                <FaMapLocation/>
              </Button>
            </Link>
        </div>
    </div>
  )
}

export default PlaceCardItem