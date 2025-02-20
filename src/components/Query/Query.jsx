import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Query = () => {

    const [name,setName] = useState("");
    const [email,setEmail]= useState("");
    const [query,setQuery]= useState("");
    const [description,setDescription]= useState("");
    const navigate = useNavigate();
  
    const handleSubmit = async (e)=>{
      e.preventDefault();
      try {
        const URL = "http://localhost:3000/api/generateToken";
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email,query,description}),
            Credential:"include"
        }
        const response = await fetch(URL, options);
        const data = await response.json();
        console.log(data);
        if(data.success){
          alert("Query submitted successfully");
          navigate('/verify');
        }
        
      } catch (error) {
        console.error(error);
        
      }
    }
  return (
    <>
    <form onSubmit={handleSubmit}>
     <label>Enter your Name:</label>
      <input type="text" value={name} onChange={(e)=>setName(e.target.value)}
      placeholder="Enter your name" />
      <label>Enter your Registerd Email:</label>
      <input 
      type="email"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
       />
      <label >Enter Your Query</label>
      <input
       type="text"
       value={query}
       onChange={(e)=>setQuery(e.target.value)}

        />
      <label >Enter Your Query Description</label>
      <textarea value={description} 
      onChange={(e)=>setDescription(e.target.value)} ></textarea>

      <button type="submit">Submit</button>

     </form>
      
    </>
  )
}

export default Query
