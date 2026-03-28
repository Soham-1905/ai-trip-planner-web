import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';

const Header = () => {
  const [openDialogue, setopenDialogue] = useState(false);
  const user=JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    console.log(user)
  }, [])
  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });
    const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        },
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setopenDialogue(false);
        window.location.reload(); 
      });
  };

  return (
    <div className='p-2 shadow-sm flex justify-between items-center px-5'>
      <div className='flex items-center gap-2'>
        <img src="/logo.svg" alt="" />
        <span className='font-bold text-lg'>TripForge</span>
      </div>
      <div>
        {
          user?
          <div className='flex items-center gap-5'>
             <a href='/create-trip'>
            <Button varient="outline" className="rounded-full bg-slate-950 hover:text-black hover:bg-slate-300 text-white">+ Create Trip</Button> </a>
            <a href='/my-trips'>
            <Button varient="outline" className="rounded-full bg-slate-950 hover:text-black hover:bg-slate-300 text-white">My Trips</Button> </a>
            <Popover>
              <PopoverTrigger>
                <img src={user?.picture} className='h-[35px] w-[35px] rounded-full' alt="" />
              </PopoverTrigger>
              <PopoverContent className="bg-slate-400 text-white w-56 rounded-md">
                <h2 className="cursor-pointer" onClick={()=>{
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();  
                }}>Logout</h2>
              </PopoverContent>
            </Popover>
          </div>:
          <Button onClick={()=>{
            setopenDialogue(true);
          }} className="bg-slate-950 hover:text-black hover:bg-slate-300 text-white">Sign In</Button>
        }
      </div>
        <Dialog open={openDialogue} onOpenChange={setopenDialogue}>
              <DialogContent className="rounded-2xl bg-slate-300 p-8 text-center">
                <DialogHeader className="flex flex-col items-center gap-3">
                  <DialogDescription>
                    <div className="flex">
                      <img src="/logo.svg" alt="" className="px-8" />
                      <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
                    </div>
                    <p>Sign In to the App with Google Authentication securely</p>
                    <Button
                      onClick={login}
                      className="bg-slate-950 w-full flex gap-4 items-center mt-5 hover:text-black hover:bg-slate-300 text-white"
                    >
                      <>
                        <FcGoogle className="h-7 w-7" />
                        Sign in With Google
                      </>
                    </Button>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
    </div>
  )
}

export default Header