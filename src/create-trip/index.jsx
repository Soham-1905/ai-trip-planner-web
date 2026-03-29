import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "@/constants/options";
import { chatSession } from "@/service/AIModel";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { setLogLevel } from "firebase/app";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const [place, setplace] = useState();
  const [formData, setformData] = useState([]);
  const [openDialogue, setopenDialogue] = useState(false);
  const [loading, setloading] = useState(false);
  const navigate=useNavigate()
  const handleInputChange = (name, value) => {
    setformData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });
  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setopenDialogue(true);
      return;
    }
    if (
      formData?.noOfDays > 5 ||
      formData?.noOfDays < 1 ||
      !formData?.location ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast.warning("Enter The Right Credentials!");
      return;
    }
    setloading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label,
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    console.log(FINAL_PROMPT);
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
    setloading(false);
    SaveAITrip(result?.response?.text());
  };
  const SaveAITrip = async (TripData) => {
    setloading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docID = Date.now().toString();
    await setDoc(doc(db, "AITrips", docID), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docID,
    });
    setloading(false);
    navigate('/view-trip/'+docID)
  };
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
        OnGenerateTrip();
      });
  };
  console.log(formData);
  return (
    <div className="px-5 sm:px-10 md:px-32 lg:px-56 mt-10">
      <h2 className="font-bold text-2xl md:text-3xl">
        Tell us your travel preferences 🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-base md:text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized iternary based on your preferences.
      </p>

      <div className="mt-10 md:mt-20">
        <h2 className="text-lg md:text-xl my-3 font-medium">
          What is your Destination Of Choice?
        </h2>
        <GooglePlacesAutocomplete
          selectProps={{
            place,
            onChange: (v) => {
              setplace(v);
              handleInputChange("location", v);
            },
          }}
        />
      </div>

      <div className="mt-8 md:mt-10">
        <h2 className="text-lg md:text-xl my-3 font-medium">
          How many days are you planning your trip?
        </h2>
        <Input
          placeholder="Ex.5"
          type="number"
          onChange={(e) => handleInputChange("noOfDays", e.target.value)}
        />
      </div>
      <div className="mt-8 md:mt-10">
        <h2 className="text-lg md:text-xl my-3 font-medium">What is your budget?</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-5">
          {SelectBudgetOptions.map((items, index) => (
            <div
              key={index}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.budget == items.title && "shadow-lg active:bg-slate-300 border-black"}`}
              onClick={() => handleInputChange("budget", items.title)}
            >
              <h2 className="text-3xl md:text-4xl">{items.icon}</h2>
              <h2 className="font-bold text-base md:text-lg">{items.title}</h2>
              <h2 className="text-xs md:text-sm text-gray-500">{items.desc}</h2>
            </div>
          ))}
        </div>
        Who do you plan on travelling with on your next adventure?
      </div>

      <div className="mt-8 md:mt-10">
        <h2 className="text-lg md:text-xl my-3 font-medium">
          Who do you plan on travelling with on your next adventure?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-5">
          {SelectTravelesList.map((items, index) => (
            <div
              key={index}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.traveler == items.people && "shadow-lg active:bg-slate-300 border-black"}`}
              onClick={() => handleInputChange("traveler", items.people)}
            >
              <h2 className="text-3xl md:text-4xl">{items.icon}</h2>
              <h2 className="font-bold text-base md:text-lg">{items.title}</h2>
              <h2 className="text-xs md:text-sm text-gray-500">{items.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end my-10">
        <Button
          onClick={OnGenerateTrip}
          disabled={loading}
          className="bg-slate-950 hover:text-black hover:bg-slate-300 text-white w-full md:w-auto"
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>

      <Dialog open={openDialogue} onOpenChange={setopenDialogue}>
        <DialogContent className="rounded-2xl bg-slate-300 p-5 md:p-8 text-center w-[90%] md:w-full mx-auto">
          <DialogHeader className="flex flex-col items-center gap-3">
            <DialogDescription>
              <div className="flex flex-col items-center sm:flex-row">
                <img src="/logo.svg" alt="" className="px-8" />
                <h2 className="font-bold text-lg mt-2 sm:mt-7">Sign In With Google</h2>
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
  );
};

export default CreateTrip;