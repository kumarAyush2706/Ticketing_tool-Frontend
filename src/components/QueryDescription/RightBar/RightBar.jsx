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
import { useLocation } from "react-router-dom";

const RightBar = () => {
   const [query, setQuery] = useState([]);
   const { state } = useLocation();
   if (!state?.queryData) {
     return <h1>No Complaint</h1>;
   }
   const { name,email,phone, description, createdAt } = state.queryData;
      // useEffect(()=>{
      //     const getQuery = async () => {
      //         try {
      //             const URL ="http://localhost:3000/api/getQuery";
      //             const options ={
      //                 method: 'GET',
      //                 headers: {
      //                     'Content-Type': 'application/json',
      //                     },
      //                 Credential:"include"
      //             }
      //             const response = await fetch(URL, options);
      //             const data = await response.json();
      //             console.log(data);
      //             if(data.success){
      //                 setQuery(data.data);
      //             }
      //         } catch (error) {
                  
      //         }
  
      //     }
      //     getQuery();
      // },[])

      const [status, setStatus] = useState(state.queryData?.status || "New");
      const handleStatusChange = (event) => {
        setStatus(event.target.value);
      };
      const handleSubmit = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/updateStatus/${state.queryData._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status }),
          });
      
          const result = await response.json();
          if (result.success) {
            alert("Status updated successfully");
          } else {
            alert("Failed to update status");
          }
        } catch (error) {
          console.error(error);
          alert("Error updating status");
        }
      };
  return (
 
    <div className="right-bar">
   {/* {query.map((item, index) => {
      return (

    <> */}
      
      <div className="right-profile">
        <div className=" user-heading">
          <div className="icon">
            <FaUser fontSize={20} />
          </div>
          <h3>{name}</h3>
          <FaPen fontSize={20} />
        </div>
        <div className="user-information">
          <div className="user-email information">
            <HiOutlineMail />
            <p>{email}</p>
          </div>
          <div className="user-phone information">
            <FaPhone />
            <p> {phone}</p>
          </div>
          <div className="information">
            <MdAccessTime />
            <p>Joined on {createdAt}</p>
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
        <button onClick={handleSubmit}>Submit </button>
        <select value={status} onChange={handleStatusChange}>
        <option value="New">New</option>
          <option value="open">Open</option>
          <option value="progress">InProgress</option>
          <option value="closed">closed</option>
        </select>
        
      </div>
      {/* </>
    );
  })}
       */}
    </div>
  
  );
};

export default RightBar;
