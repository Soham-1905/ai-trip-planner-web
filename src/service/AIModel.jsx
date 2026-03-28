import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_AI_API_KEY;
console.log("GEMINI KEY LOADED:", apiKey) 
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        { text: "Generate Travel Plan for Location : Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format." },
      ],
    },
    {
      role: "model",
      parts: [
        { text: "```json\n{\n  \"travelPlan\": {\n    \"location\": \"Las Vegas, Nevada\",\n    \"duration\": \"3 Days\",\n    \"budget\": \"Cheap\",\n    \"hotelOptions\": [\n      {\n        \"hotelName\": \"The STRAT Hotel, Casino & Tower\",\n        \"hotelAddress\": \"2000 S Las Vegas Blvd, Las Vegas, NV 89104\",\n        \"price\": \"$74 - $95 per night\",\n        \"hotelImageUrl\": \"https://images.unsplash.com/photo-1581351123004\",\n        \"geoCoordinates\": { \"latitude\": 36.147386, \"longitude\": -115.155389 },\n        \"rating\": 7.4,\n        \"description\": \"An iconic budget-friendly choice at the north end of the Strip.\"\n      }\n    ],\n    \"itinerary\": [\n      {\n        \"day\": 1,\n        \"theme\": \"Iconic Strip Highlights\",\n        \"plan\": [\n          {\n            \"placeName\": \"Bellagio Fountains\",\n            \"placeDetails\": \"Choreographed water show set to music.\",\n            \"placeImageUrl\": \"https://images.unsplash.com/photo-1516900448138\",\n            \"geoCoordinates\": { \"latitude\": 36.113, \"longitude\": -115.174 },\n            \"ticketPricing\": \"Free\",\n            \"rating\": 4.9,\n            \"timeTravel\": \"1 hour\",\n            \"bestTimeToVisit\": \"8:00 PM\"\n          }\n        ]\n      }\n    ]\n  }\n}\n```" },
      ],
    },
  ],
});