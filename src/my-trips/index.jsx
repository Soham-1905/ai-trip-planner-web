import { db } from '@/service/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserTripCardItem from './components/UserTripCardItem';

const MyTrips = () => {
    const [userTrips, setuserTrips] = useState([])
    const navigation = useNavigate();
    
    useEffect(() => {
      GetUserTrips();
    }, [])

    const GetUserTrips=async()=>{
        const user = JSON.parse(localStorage.getItem('user'));
        if(!user){
            navigation('/')
            return;
        }
        setuserTrips([])
        const q=query(collection(db,'AITrips'),where('userEmail','==',user?.email))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            setuserTrips(prevVal=>[...prevVal, doc.data()])
        });
    }

    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
            <h2 className='font-bold text-3xl'>My Trips</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-6 mt-5'>
                {userTrips?.length>0?userTrips.map((trip,index)=>(
                    <UserTripCardItem key={index} trip={trip} />
                ))
           :[1,2,3,4,5,6].map((items,index)=>(
    <div key={index} className='h-[250px] w-full bg-slate-200 animate-pulse rounded-xl'></div>
))
            }
            </div>
        </div>
    )
}

export default MyTrips