// import React, { useState, useEffect, useRef } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import Header from "../Header/Header";
// import LeftBar from "./LeftBar/LeftBar";
// import RightBar from "./RightBar/RightBar";
// import "./QueryDescription.css";
// import { MdHistory } from "react-icons/md";
// import { HiOutlineDotsVertical } from "react-icons/hi";
// import ReactQuill from "react-quill";
// import { BiCheckDouble } from "react-icons/bi";
// import "react-quill/dist/quill.snow.css";
// import { FaUser, FaUserTie } from "react-icons/fa6";

// const QueryDescription = () => {
//   const [content, setContent] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [adminName, setAdminName] = useState("");
//   const chatContainerRef = useRef(null);

//   const { state } = useLocation();
//   const queryId = state?.queryData?._id;
//   const name = state?.queryData?.name;
//   const description = state?.queryData?.description;
//   const createdAt = state?.queryData?.createdAt;

//   // Fetch logged-in admin details
//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/me", {
//           withCredentials: true,
//         });
//         if (response.data.success) {
//           setAdminName(response.data.user.name);
//         }
//       } catch (error) {
//         console.error("Error fetching admin details:", error);
//       }
//     };
//     getUser();
//   }, []);

//   // Fetch query details, including previous replies
//   useEffect(() => {
//     if (!queryId) return;

//     const fetchReplies = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:3000/api/getQuery/${queryId}`
//         );
//         console.log("API Response:", res.data);
//         setMessages(res.data.replies || []);
//       } catch (error) {
//         console.error(
//           "Error fetching replies:",
//           error.response?.data || error.message
//         );
//       }
//     };

//     fetchReplies();
//   }, [queryId]);

//   // Auto-scroll to bottom of chat
//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop =
//         chatContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const handleSend = async () => {
//     if (content.trim() === "") return;

//     const newMessage = { queryId, adminName, message: content };

//     try {
//       const res = await axios.post(
//         "http://localhost:3000/api/reply",
//         newMessage
//       );
//       setMessages((prevMessages) => [...prevMessages, res.data.reply]);
//       setContent("");
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   if (!queryId) {
//     return <h1>No Complaint</h1>;
//   }

//   return (
//     <>
//       <div className="header">
//         <Header />
//       </div>
//       <div className="main_container">
//         <LeftBar />
//         <div className="container">
//           <nav className="container-nav">
//             <h1>Conversation with {name}</h1>
//             <h1>
//               <MdHistory />
//               <HiOutlineDotsVertical />
//             </h1>
//           </nav>
//           <hr />

//           {/* Chat Section */}
//           <div className="chat-container">
//             <div className="chat-title">
//               <div className="user">
//                 <div className="icon">
//                   <FaUser fontSize={20} />
//                 </div>
//                 <h3>{name}</h3>
//                 <p>
//                   {createdAt
//                     ? new Date(createdAt).toLocaleString()
//                     : "Date not available"}
//                 </p>
//               </div>
//             </div>
//             <div className="chat-description">
//               {description}
//               <BiCheckDouble fontSize={25} />
//             </div>
//             {/* Display Messages */}
//             <div className="chat-messages" ref={chatContainerRef}>
//               {messages.length === 0 ? (
//                 <p>No replies yet.</p>
//               ) : (
//                 messages.map((msg, index) => (
//                   <div
//                     key={index}
//                     className={`message ${
//                       msg.adminName === adminName ? "admin" : "user"
//                     }`}
//                   >
//                     <div className="message-header">
//                       {msg.adminName === adminName ? (
//                         <FaUserTie fontSize={20} className="admin-icon" />
//                       ) : (
//                         <FaUser fontSize={20} className="user-icon" />
//                       )}
//                       <strong>{msg.adminName || "Admin"}:</strong>
//                     </div>
//                     <span dangerouslySetInnerHTML={{ __html: msg.message }} />
//                     <p className="timestamp">
//                       {msg.createdAt
//                         ? new Date(msg.createdAt).toLocaleString()
//                         : "Invalid date"}
//                     </p>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* Reply Section */}
//           <div className="reply-chat">
//             <hr />
//             <div className="reply">
//               <h3>Reply</h3>
//               <button onClick={handleSend}>Send</button>
//             </div>
//             <div className="editor">
//               <ReactQuill value={content} onChange={setContent} theme="snow" />
//             </div>
//           </div>
//         </div>
//         <RightBar />
//       </div>
//     </>
//   );
// };

// export default QueryDescription;

import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";
import LeftBar from "./LeftBar/LeftBar";
import RightBar from "./RightBar/RightBar";
import "./QueryDescription.css";
import { MdHistory } from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ReactQuill from "react-quill";
import { BiCheckDouble } from "react-icons/bi";
import "react-quill/dist/quill.snow.css";
import { FaUser, FaUserTie } from "react-icons/fa6";

const QueryDescription = () => {
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState([]);
  const [userReplies, setUserReplies] = useState([]); // State for user replies
  const [adminName, setAdminName] = useState("");
  const chatContainerRef = useRef(null);

  const { state } = useLocation();
  const queryId = state?.queryData?._id;
  // const name = state?.queryData?.name;
  // const description = state?.queryData?.description;
  // const createdAt = state?.queryData?.createdAt;

  // Fetch logged-in admin details

  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    // ["undo", "redo"],
    [{ font: ["Robot", 2, 3, 4, 5, 6] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
  ];

  const formats = [
    // "undo",
    // "redo",
    "header",
    "font",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/me", {
          withCredentials: true,
        });
        if (response.data.success) {
          setAdminName(response.data.user.name);
        }
      } catch (error) {
        console.error("Error fetching admin details:", error);
      }
    };
    getUser();
  }, []);

  // Fetch admin replies
  useEffect(() => {
    if (!queryId) return;

    const fetchReplies = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/getQuery/${queryId}`
        );
        setMessages(res.data.replies || []);
      } catch (error) {
        console.error(
          "Error fetching replies:",
          error.response?.data || error.message
        );
      }
    };

    fetchReplies();
  }, [queryId]);

  // Fetch user replies
  useEffect(() => {
    if (!queryId) return;

    const fetchUserReplies = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/userReply", {
          params: { queryId },
        });
        setUserReplies(res.data.replies || []);
      } catch (error) {
        console.error(
          "Error fetching user replies:",
          error.response?.data || error.message
        );
      }
    };

    fetchUserReplies();
  }, [queryId]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, userReplies]);

  const handleSend = async () => {
    if (content.trim() === "") return;

    const newMessage = { queryId, adminName, message: content };

    try {
      const res = await axios.post(
        "http://localhost:3000/api/reply",
        newMessage
      );
      setMessages((prevMessages) => [...prevMessages, res.data.reply]);
      setContent("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (!queryId) {
    return <h1>No Complaint</h1>;
  }

  const { name, description, createdAt, status } = state.queryData;

  return (
    <>
      <div className="header">
        <Header />
      </div>
      <div className="main_container">
        <LeftBar />
        <div className="container">
          <nav className="container-nav">
            <h1>Conversation with {name}</h1>
            <h1>
              <MdHistory />
              <HiOutlineDotsVertical />
            </h1>
          </nav>
          <hr />

          {/* Chat Section */}
          <div className="chat-container">
            <div className="chat-title">
              <div className="user">
                <div className="icon">
                  <FaUser fontSize={20} />
                </div>
                <h3>{name}</h3>
              </div>
              <p>
                {createdAt
                  ? new Date(createdAt).toLocaleString()
                  : "Date not available"}
              </p>
            </div>
            <div className="chat-description">
              {description}
              <BiCheckDouble fontSize={25} />
            </div>

            {/* Display Messages */}
            <div className="chat-messages" ref={chatContainerRef}>
              {messages.length === 0 && userReplies.length === 0 ? (
                <p>No replies yet.</p>
              ) : (
                <>
                  {messages.map((msg, index) => (
                    <div key={index} className="message admin">
                      <div className="message-header">
                        <div className="reply-icon">
                          <FaUserTie fontSize={20} className="admin-icon" />
                          <strong>{msg.adminName || name}:</strong>
                        </div>
                        <p className="timestamp">
                          {msg.createdAt
                            ? new Date(msg.createdAt).toLocaleString()
                            : "Invalid date"}
                        </p>
                      </div>
                      {/* <span className="reply-span">
                        {msg.message}
                        </span> */}
                      <div
                        className="reply-span"
                        dangerouslySetInnerHTML={{
                          __html: msg.message.replace(/\n/g, "<br>"),
                        }}
                      />
                    </div>
                  ))}
                  {/* {userReplies.map((msg, index) => (
                    <div key={index} className="message user">
                      <div className="message-header">
                        <FaUser fontSize={20} className="user-icon" />
                        <strong>{msg.userName || "User"}:</strong>
                      </div>
                      <span dangerouslySetInnerHTML={{ __html: msg.message }} />
                      <p className="timestamp">
                        {msg.createdAt
                          ? new Date(msg.createdAt).toLocaleString()
                          : "Invalid date"}
                      </p>
                    </div>
                  ))} */}
                </>
              )}
            </div>
          </div>

          {/* Reply Section */}
          <div className="reply-chat">
            <hr />
            <div className="reply">
              <h3>Reply</h3>
              <button onClick={handleSend}>Send</button>
            </div>
            <div className="">
              <ReactQuill
                value={content}
                onChange={setContent}
                modules={{ toolbar: toolbarOptions }}
                theme="snow"
                formats={formats}
                className="Text-Editor"
              />
            </div>
          </div>
        </div>
        <RightBar />
      </div>
    </>
  );
};

export default QueryDescription;
