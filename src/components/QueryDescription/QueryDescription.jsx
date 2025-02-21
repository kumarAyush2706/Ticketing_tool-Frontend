import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import LeftBar from "./LeftBar/LeftBar";
import RightBar from "./RightBar/RightBar";
import "./QueryDescription.css";
import { MdHistory } from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaUser } from "react-icons/fa6";
import { BiCheckDouble } from "react-icons/bi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const QueryDescription = () => {
  const [content, setContent] = useState("");
  const { state } = useLocation();

  if (!state?.queryData) {
    return <h1>No Complaint</h1>;
  }

  const { name, description, createdAt } = state.queryData;

  return (
    <>
      <div className="header">
        <Header />
      </div>
      <div className="main_container">
        <LeftBar />
        <div className="container">
          <div>
            <nav className="container-nav">
              <h1>Conversation with {name} </h1>
              <h1>
                <MdHistory />
                <HiOutlineDotsVertical />
              </h1>
            </nav>
            <hr />

            <div className="chat-container">
              <div className="chat-title">
                <div className="user">
                  <div className="icon">
                    <FaUser fontSize={20} />
                  </div>
                  <h3>{name}</h3>
                </div>
                <p>{new Date(createdAt).toLocaleString()}</p>{" "}
                {/* Format timestamp */}
              </div>
              <div className="chat-description">
                {description}
                <BiCheckDouble fontSize={25} />
              </div>
            </div>

            <div className="reply-chat">
              <hr />
              <div className="reply">
                <h3>Reply</h3>
                <button>Send</button>
              </div>
              <div className="editor">
                <ReactQuill
                  value={content}
                  onChange={setContent}
                  theme="snow"
                />
              </div>
            </div>
          </div>
        </div>
        <RightBar />
      </div>
    </>
  );
};

export default QueryDescription;
