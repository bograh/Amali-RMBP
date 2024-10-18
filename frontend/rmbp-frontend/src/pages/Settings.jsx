import Header from "../components/Header"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Settings = () => {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

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

    if (!token || getTokenExpiration(token)) {
      logout();
    } else {
      navigate("/settings");
    }
  }, [navigate]);

    return (
        <div id="chat-page" className="flex flex-col h-screen bg-gradient-to-b from-teal-700 to-teal-900 text-white">
        <Header />
        <main>
            <h1>Settings</h1>
        </main>
      </div>
    )
  }
  
  export default Settings