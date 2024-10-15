/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/logo.svg";

const LoginComponent = () => {
<<<<<<< HEAD
    return (
      <div>
          
      </div>
    )
  }
  
  export default LoginComponent
=======
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email) && !/^\s*$/.test(email); // Check for spaces only
  };

  const validatePassword = (password) => {
    return password.length >= 6 && !/^\s*$/.test(password); // Check password length and for spaces only
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("clicked");
    try {
      const response = await fetch("http://16.171.19.134:8000/api/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, password_confirm }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Login Failed");
      }
    } catch (err) {
      console.error(err.message || "Login was not successful");
      setLoginError(true);
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className=" mx-auto mt-[13%] w-[300px] justify-center items-center min-h-screen bg-gray">
      <div className="mx-auto mb-12">
        <img src={logo} alt="logo" className="bg-[#000] mx-auto" />
        <h3 className="mx-auto">Access to generative AI in your language</h3>
      </div>
      
      <form onSubmit={handleSubmit} className ="rounded-xl border px-3 py-7 my-auto space-y-4 ">
        <h1 className="text-sm">LOGIN</h1>
        <p>
          <label>Username</label><br></br>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="border border-gray w-full py-1 rounded-lg pl-2"
          />
        </p>

        <p>
          <label>Password</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border w-full py-1 rounded-lg pl-2"
          />
        </p>
        <button type="submit" onClick={handleSubmit} className="bg-[#004a4f] rounded-xl py-2 w-full text-[#fff]" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>

        <h3>Don't  have an account? <a href="/signup" >Signup</a></h3>
        <h3 className="w-full border items-center justify-center ml5-auto">OR</h3>
        {/*Sign in with google */}
        <button className="bg-[#fff] text-[#000] border rounded-xl py-2 w-full">Sign in with Google</button>

      </form>
    </div>
  );
};

export default LoginComponent;
>>>>>>> dfde2d2f9c7b4a2066849b79435b2c0ead4318d4
