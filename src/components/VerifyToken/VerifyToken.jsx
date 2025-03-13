import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyToken = () => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const URL = "http://localhost:3000/api/verify";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
        Credential: "include",
      };
      const response = await fetch(URL, options);
      const data = await response.json();
      if (data.success) {
        alert("Token Verify successfully");
        navigate("/details");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleVerify}>
        <label>Enter your Tooken no:</label>
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />

        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default VerifyToken;
