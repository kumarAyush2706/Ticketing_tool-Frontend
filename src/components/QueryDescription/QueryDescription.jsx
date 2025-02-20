import React, { useEffect, useState } from "react";
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
  const [description, setDescription] = useState([]);
  const [content, setContent] = useState("");
  useEffect(() => {
    const getQuery = async () => {
      try {
        const URL = "http://localhost:3000/api/getQuery";
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          Credential: "include",
        };
        const response = await fetch(URL, options);
        const data = await response.json();
        console.log(data);
        if (data.success) {
          setDescription(data.data);
        }
      } catch (error) {}
    };
    getQuery();
  }, []);
  return (
    <>
      <div className="header">
        <Header />
      </div>
      <div className="main_container">
        <LeftBar />
        <div className="container">
          {description.map((index) => {
            return (
              <div>
                <nav className="container-nav">
                  <h1>Conversation with {index.name} </h1>
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
                      <h3>{index.name}</h3>
                    </div>

                    <p>{index.createdAt}</p>
                  </div>
                  <div className="chat-description">
                    {index.description}
                    <BiCheckDouble fontSize={25} />
                  </div>
                </div>

                <div className="reply-chat">
                  <hr />
                  <div className="reply">
                  <h3>reply</h3>
                  <button>Send</button>
                  </div>
                  <div className="editor">
                    <ReactQuill
                      value={content}
                      onChange={setContent}
                      theme="snow" // Other themes: 'bubble'
                    />
                    {/* <p >{content}</p> */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <RightBar />
      </div>
    </>
  );
};

export default QueryDescription;
