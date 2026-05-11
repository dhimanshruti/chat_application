import { useChathook } from "../hooks/useChathook";
import { useEffect, useRef, useState } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeleton/MessageSkele";

import useAuthhook from "../hooks/useAuthhook";
import { formatMessageTime } from "../lib/utils";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

const ChatContainer = () => {

  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChathook();

  const { authUser, socket } = useAuthhook();

  const messageEndRef = useRef(null);

  const [passwordInput, setPasswordInput] = useState("");
  const [verified, setVerified] = useState(false);
  const [isTyping, setIsTyping] = useState(false);


  const handleVerify = async () => {

    try {

      await axiosInstance.post("/auth/verify-password", {
        password: passwordInput,
      });

      setVerified(true);

    } catch (error) {

      toast.error("Incorrect password");

    }
  };


  useEffect(() => {

    if (!selectedUser?._id || !verified) return;

    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();

  }, [selectedUser?._id, verified]);


  useEffect(() => {

    if (!socket) return;

    socket.on("typing", () => {
      setIsTyping(true);
    });

    socket.on("stopTyping", () => {
      setIsTyping(false);
    });

    return () => {
      socket.off("typing");
      socket.off("stopTyping");
    };

  }, [socket]);


  useEffect(() => {

    if (messageEndRef.current && messages) {

      messageEndRef.current.scrollIntoView({ behavior: "smooth" });

    }

  }, [messages]);


  if (!verified) {

    return (

      <div className="flex-1 flex flex-col overflow-auto">

        <ChatHeader />

        <div className="p-6 space-y-4 flex-1 flex flex-col justify-center items-center text-center">

          <div className="chat chat-start">

            <div className="chat-bubble text-md">

              🔒 Please enter your password to start chatting.

            </div>

          </div>

          <div className="flex gap-2">

            <input
              type="password"
              className="input input-bordered"
              placeholder="Enter Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />

            <button
              onClick={handleVerify}
              className="btn btn-primary"
            >
              Verify
            </button>

          </div>

        </div>

      </div>
    );
  }


  if (isMessagesLoading) {

    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }


  return (

    <div className="flex-1 flex flex-col overflow-auto">

      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {messages.map((message) => (

          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
            ref={messageEndRef}
          >

            <div className="chat-image avatar">

              <div className="size-10 rounded-full border">

                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile"
                />

              </div>

            </div>


            <div className="chat-header mb-1">

              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>

            </div>


            <div className="chat-bubble flex flex-col">

              {message.image && (

                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />

              )}

              {message.text && <p>{message.text}</p>}

            </div>

          </div>

        ))}

        {isTyping && (
          <p className="text-sm text-gray-400 px-2">
            {selectedUser.fullName} is typing...
          </p>
        )}

      </div>

      <MessageInput />

    </div>

  );

};

export default ChatContainer;