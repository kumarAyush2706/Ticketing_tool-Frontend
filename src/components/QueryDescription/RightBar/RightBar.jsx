import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import "./RightBar.css";
import { HiOutlineMail } from "react-icons/hi";
import { FaPhone } from "react-icons/fa6";
import { MdAccessTime } from "react-icons/md";
import { BiTask } from "react-icons/bi";
import { CiFilter } from "react-icons/ci";
import { AiOutlineHistory } from "react-icons/ai";

const RightBar = () => {
   const [query, setQuery] = useState([]);
      useEffect(()=>{
          const getQuery = async () => {
              try {
                  const URL ="http://localhost:3000/api/getQuery";
                  const options ={
                      method: 'GET',
                      headers: {
                          'Content-Type': 'application/json',
                          },
                      Credential:"include"
                  }
                  const response = await fetch(URL, options);
                  const data = await response.json();
                  console.log(data);
                  if(data.success){
                      setQuery(data.data);
                  }
              } catch (error) {
                  
              }
  
          }
          getQuery();
      },[])
  return (
 
    <div className="right-bar">
   {query.map((item, index) => {
      return (

    <>
      
      <div className="right-profile">
        <div className=" user-heading">
          <div className="icon">
            <FaUser fontSize={20} />
          </div>
          <h3>{item.name}</h3>
          <FaPen fontSize={20} />
        </div>
        <div className="user-information">
          <div className="user-email information">
            <HiOutlineMail />
            <p>{item.email}</p>
          </div>
          <div className="user-phone information">
            <FaPhone />
            <p> 9999999999</p>
          </div>
          <div className="information">
            <MdAccessTime />
            <p>Joined on 2022-01-01</p>
          </div>
          <div className="user-notes information">
            <BiTask />
            <input type="text" placeholder="Add notes" />
          </div>
        </div>
      </div>
      <div className="interaction-container">
        <hr />
        <div className="interaction-Heading information">
          <h3>Interactions</h3>
          <div className="icons">
            <CiFilter fontSize={20} />
            <AiOutlineHistory fontSize={20} />
          </div>
        </div>
        <div className="interaction"></div>
      </div>
      <div className="submit-interaction information">
        <button>Submit </button>
        <select >
          <option value="open">Open</option>
          <option value="progress">InProgress</option>
          <option value="closed">closed</option>
        </select>
        
      </div>
      </>
    );
  })}
      
    </div>
  
  );
};

export default RightBar;
