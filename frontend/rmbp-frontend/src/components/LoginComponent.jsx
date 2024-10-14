/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const LoginComponent = () => {
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
    <div className="border mx-auto">
      <form onSubmit={handleSubmit}>
        <h1 className="text-sm">LOGIN</h1>
        <p>
          <label>Username</label><br></br>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="border"
          />
        </p>

        <p>
          <label>Password</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border"
          />
        </p>
        <button type="submit" onClick={handleSubmit} disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginComponent;
