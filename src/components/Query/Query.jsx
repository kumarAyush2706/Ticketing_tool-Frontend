import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Query.css";
import { BsPhone } from "react-icons/bs";

const Query = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [query, setQuery] = useState("");
  const [token, setToken] = useState('');
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const URL = "http://localhost:3000/api/generateToken";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, query, description,phone }),
        Credential: "include",
      };
      const response = await fetch(URL, options);
      const data = await response.json();
      console.log(data);
      if (data.success) {
        alert("Query submitted successfully");
        // navigate("/verify");
        setSubmitted(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleVerify = async (e) => {
    e.preventDefault();
    try {
        const URL = "http://localhost:3000/api/verify";
        const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token:token }),
            Credential: "include",
          };
          const response = await fetch(URL, options);
          const data = await response.json();
          if (data.success) {
            alert("Token Verify successfully")
            navigate("/details");
          }
    } catch (error) {
        
    }
}
  return (
    <>
    <div className="query-container">
      <div className="form-box">
        <h2>Submit Your Query</h2>
        {!submitted?(
        <form className="form_container" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Enter your Name<span className="required">*</span></label>
            <input 
            className='detail_field' 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
            <label>Enter your Registerd Email<span className="required">*</span></label>
            <input
            className='detail_field' 
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Enter your Phone Number<span className="required">*</span></label>
            <input 
             className='detail_field' 
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            />
            <label>Enter Your Query<span className="required">*</span></label>
            <input
            className='detail_field' 
              type="text"
              placeholder="Enter your query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <label>Enter Your Query Description<span className="required">*</span></label>
            <textarea
            className='detail_field' 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <button type="submit">Submit</button>
        </form> ):(
            <form onSubmit={handleVerify} className="form_container"> 
            <label >Enter your Tooken no:</label>
            <input type="text" style={{marginTop:"15px"}}
            className="detail_field"
            value={token}
            onChange={(e) => setToken(e.target.value)}/>    
            <button style={{marginTop:"15px"}} type="submit">Verify</button>
            </form>
        )}
      </div>
    </div>
    </>
  );
};

export default Query;
