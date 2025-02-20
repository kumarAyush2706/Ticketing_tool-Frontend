import React from 'react'
import "./LeftBar.css";

const LeftBar = () => {
  return (
    <div className="left-bar">
        <div className="left">
        <div className="left-title">
            <h3>Ticket Details</h3>
        </div><hr />
        <div className="company-name left-data">
            
           <h4>Brand</h4>
            <p>Togile</p>
        </div>
        <div className="details">
            <hr />
            <div className="requester left-data">
                <h4>Requester</h4>
                <p>Ayush Kumar</p>

            </div>
            <div className="assignee left-data">
                <h4>Assignee</h4>
                <p>John Doe</p>
            </div>
            <div className="follower left-data">
                <h4>Followers</h4>
                <p>manish</p>
            </div>
            <div className="status left-data">
                <h4>Status</h4>
                <p>Open</p>

            </div>
        </div>
        <hr />
        <div className="form-details ">
            <form >
                <label >Tags</label>
                <input type="text" name="" id="" />
                <label >Type</label>
                <select name="" id="">
                    <option value="">Question</option>
                    <option value="">Select</option>

                </select>
                <label >Priority</label>
                <select name="" id="">
                    <option value="">Low</option>
                    <option value="">Medium</option>
                    <option value="">High</option>
                </select>


            </form>
        </div>
        </div>
      
    </div>
  )
}

export default LeftBar
