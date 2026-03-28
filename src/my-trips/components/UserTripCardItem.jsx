import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalAPI'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const UserTripCardItem = ({trip}) => {
    const [photourl, setphotourl] = useState()
       useState
        useEffect(() => {
          trip&&GetPlacePhoto()
        
        }, [trip])
        
        const GetPlacePhoto=async()=>{
          const data={
            textQuery:trip?.userSelection?.location?.label
          }
            const result=await GetPlaceDetails(data) 
    .then(resp=>{
        console.log(resp.data.places[0].photos[3].name)
        const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name)
        setphotourl(PhotoUrl)
    })    }
    return (
    <Link to={'/view-trip/'+trip?.id}>
    <div className='hover:scale-105 transition-all'>
        <img src={photourl?photourl:'/airplane.webp'} alt=""  className="object-cover rounded-xl h-[250px] w-[250px]"/>
        <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
        <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays} Days Trip With {trip?.userSelection?.budget} Budget</h2>
    </div>
        </Link>
  )
}
 
export default UserTripCardItem