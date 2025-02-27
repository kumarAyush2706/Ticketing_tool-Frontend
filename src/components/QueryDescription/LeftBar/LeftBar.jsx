import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LeftBar.css";
import { useLocation } from "react-router-dom";

const LeftBar = () => {
    const [user, setUser] = useState(null);
    const { state } = useLocation();
    if (!state?.queryData) {
      return <h1>No Complaint</h1>;
    }
    const { name, description, createdAt,status } = state.queryData;
    useEffect(()=>{
      const getUser = async () => {
        try {
          const URL = "http://localhost:3000/api/me";
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        };
        const response = await fetch(URL, options);
        const data = await response.json();
        if (data.success) {
          setUser(data.user); // ✅ User comes from cookie
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, []);
  return (
    <div className="left-bar">
      <div className="left">
        <div className="left-title">
          <h3>Ticket Details</h3>
        </div>
        <hr />
        <div className="company-name left-data">
          <h4>Brand</h4>
          <p>Togile</p>
        </div>
        <div className="details">
            <hr />
            <div className="requester left-data">
                <h4>Requester</h4>
                <p>{name}</p>

            </div>
            <div className="assignee left-data">
                <h4>Assignee</h4>
                <p>{user?.name}</p>
            </div>
            <div className="follower left-data">
                <h4>Followers</h4>
                <p>manish</p>
            </div>
            <div className="status left-data">
                <h4>Status</h4>
                <p>{status}</p>

            </div>
        </div>
        <hr />
        <div className="form-details ">
          <form>
            <label>Tags</label>
            <input type="text" name="" id="" />
            <label>Type</label>
            <select name="" id="">
              <option value="">Question</option>
              <option value="">Select</option>
            </select>
            <label>Priority</label>
            <select name="" id="">
              <option value="">Low</option>
              <option value="">Medium</option>
              <option value="">High</option>
            </select>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
