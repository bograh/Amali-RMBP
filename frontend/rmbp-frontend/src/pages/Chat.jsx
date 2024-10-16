/* eslint-disable no-unused-vars */
import Header from '../components/Header';
import Query from '../components/Query';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ChatPage = () => {

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const signout = () => {
    localStorage.removeItem("token");
    navigate("/");
}

const getTokenExpiration = (token) => {
  if (!token) {
      return true; 
  }

  try {
      const decodedPayload = JSON.parse(atob(token.split(".")[1])); 
      if (!decodedPayload.exp) {
          return true;
      }

      const currentDate = Date.now();
      const expiryTime = decodedPayload.exp * 1000; // Convert to ms

      console.log("Current date: " + currentDate, "Expiry: " + expiryTime);

      return currentDate >= expiryTime; // Return true if token is expired
  } catch (error) {
      console.error("Error decoding token:", error);
      return true; // If there's an error, treat the token as expired
  }
};

useEffect(() => {
  const token = localStorage.getItem("token");
  console.log("Token found:", token);

  if (!token || getTokenExpiration(token)) {
      console.log("No token or token expired, logging out...");
      signout();
  } else {
      console.log("Token is valid, setting loading to false.");
      setLoading(false);
      console.log("Loading:", loading);
  }
}, []); 




  return (
    <div id="chat-page" className="flex flex-col h-screen overflow-y-auto bg-gradient-to-bl from-[#004A4F] to-[#13cdbb] text-[#fff]">
      <Header />
      <main id="chat-main" className="flex-grow flex flex-col p-4">
        <Query />
      </main>
    </div>
  );
};

export default ChatPage;