import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useChathook } from "../hooks/useChathook";

const Chatbot = () => {
  const [qaList, setQaList] = useState([]);
  const [visibleQAs, setVisibleQAs] = useState([]);
  const [messages, setMessages] = useState([]);
  const [qaIndex, setQaIndex] = useState(0);
  const [typing, setTyping] = useState(false);
  // const navigate = useNavigate();
  const messageEndRef = useRef(null);
  const {users,selectedUser,setSelectedUser} =useChathook();
  

  useEffect(() => {
    axios
      .get('https://linkup-e4dw.onrender.com/api/questions')
      .then((res) => {
        setQaList(res.data);
        setVisibleQAs(res.data.slice(0, 3));
        setQaIndex(3);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const handleQuestionClick = (qa, idx) => {
    setMessages((prev) => [...prev, { type: 'user', text: qa.question }]);
    setTyping(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, { type: 'bot', text: qa.answer }]);
      setTyping(false);
    }, 1000);

    const updatedQAs = [...visibleQAs];
    const nextQuestion = qaList[qaIndex];

    if (nextQuestion) {
      updatedQAs[idx] = nextQuestion;
      setQaIndex((prev) => prev + 1);
    } else {
      updatedQAs.splice(idx, 1);
    }

    setVisibleQAs(updatedQAs);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 rounded-lg shadow-lg" style={{ backgroundColor: 'oklch(0.554 0.046 257.417)' }}>
      <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
        🤖 FAQS BOT
      </h1>

      <div className="mb-6 min-h-[180px] transition-all">
        <p className="text-base font-semibold text-gray-800 mb-3">
          Choose a question:
        </p>
        <div className="space-y-2 relative min-h-[140px]">
          <AnimatePresence initial={false}>
            {visibleQAs.map((qa, idx) => (
              <motion.button
                key={qa.question}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ duration: 0.4 }}
                onClick={() => handleQuestionClick(qa, idx)}
                className="w-full text-left px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded-lg shadow-sm"
              >
                {qa.question}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="max-h-72 overflow-y-auto p-4 border rounded bg-gray-50 space-y-3 shadow-inner">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`px-4 py-2 max-w-xs rounded-xl shadow text-sm break-words ${
                msg.type === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-300 text-gray-900'
              }`}
            >
              {msg.text}
            </motion.span>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <span className="bg-gray-300 text-gray-700 text-sm px-3 py-1 rounded-xl animate-pulse">
              Typing...
            </span>
          </div>
        )}
        <div ref={messageEndRef} />
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm font-bold text-gray-900  mb-3">
          Need more help? Contact our live agent by cliking below.
        </p>
      </div>
<div className="flex justify-center gap-2 overflow-y-auto w-3xl py-3">
  {users
    .filter((user) =>
      ["Technical Support", "Pre-Sales Consultation", "Sales And Billing"].includes(user.fullName)
    )
    .map((user) => (
      <button
        key={user._id}
        onClick={() => setSelectedUser(user)}
        className={`btn btn-soft btn-primary justify-start ${
          selectedUser?._id === user._id ? "ring ring-offset-2 ring-primary" : ""
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="font-medium">{user.fullName}</span>
        </div>
      </button>
    ))}
</div>


    </div>
  );
};

export default Chatbot;
