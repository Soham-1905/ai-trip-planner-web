import React from 'react'
import PlaceCardItem from './PlaceCardItem'

const PlacesToVisit = ({trip}) => {
  console.log(trip.tripData)
  return (
    <div>
        <h2 className='font-bold text-lg mt-6 mb-3'>Places To Visit</h2>
        <div>
            {trip?.tripData?.travelPlan?.itinerary?.map((item,index)=>(
                <div className="mt-5" key={index}>
                    <h2 className='font-medium text-lg'>Day {item.day}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                        {item.plan.map((place,index)=>(
                            <div className='my-3' key={index}>
                                <h2 className='font-medium text-sm text-orange-600'>🕙{place.bestTimeToVisit}</h2>
                                <PlaceCardItem place={place}/>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default PlacesToVisit