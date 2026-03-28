import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";
import { FaShareAlt } from "react-icons/fa";
const InfoSection = ({ trip }) => {
    const [photourl, setphotourl] = useState()
   
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
    <div>
      <img
        src={photourl?photourl:'/airplane.webp'} 
        className="h-[340px] w-full object-cover rounded-xl"
        alt=""
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location?.label}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text md:text-md ">
              📅{trip?.userSelection?.noOfDays} Days
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text md:text-md">
              💰{trip?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text md:text-md">
              🥂No. Of Travelers : {trip?.userSelection?.traveler} 
            </h2>
          </div>
        </div>
        <Button><FaShareAlt/></Button>
      </div>
    </div>
  );
};

export default InfoSection;
