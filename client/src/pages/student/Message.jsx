// "use client";

// import React, { useContext, useEffect } from "react";
// import { useState } from "react";
// import axios from "axios";
// import { AppContext } from "../../context/AppContext";

// export default function Message() {
//   const [selectedStudent, setSelectedStudent] = useState("C17471");
//   const [message, setMessage] = useState("");
//   const [teachers, setTeachers] = useState(null);
//   const { backendUrl } = useContext(AppContext);

//   const getTeachers = async () => {
//     try {
//       const res = await axios.get(`${backendUrl}/enseignant/get`);
//       console.log("teachers : ", res.data.data);
//       setTeachers(res.data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getTeachers();
//   }, []);

//   // let teachers = []
//   // if(enseignants.length > 0) {
//   //   teachers = [
//   //     { id: "ANALYSE", name: "Dr. Saadbouh" },
//   //     { id: "PROGRAMMATION", name: "Abdallahi Nah" },
//   //     { id: "ALGÈBRE", name: "Abdallahi Nah" },
//   //     { id: "CHIMIE-GÉNÉRALE", name: "Mohamed Ali" },
//   //     { id: "BIOLOGIE", name: "Fatima Zahra" },
//   //     { id: "PHYSIQUE", name: "Ahmed Hassan" },
//   //   ];
//   // }

//   const messages = [
//     { id: 1, text: "Bonjour", time: "11h:50", isOutgoing: true },
//     { id: 2, text: "Salut", time: "12h:30", isOutgoing: false },
//     { id: 3, text: "Comment ça va ?", time: "12h:31", isOutgoing: true },
//     { id: 4, text: "Ça va bien, merci !", time: "12h:32", isOutgoing: false },
//   ];

//   const CustomSelect = ({ value, onChange, placeholder, options }) => {
//     const [isOpen, setIsOpen] = useState(false);

//     return (
//       <div className="relative">
//         <button
//           type="button"
//           onClick={() => setIsOpen(!isOpen)}
//           className="w-full h-10 px-3 py-2 bg-white border border-gray-300 rounded text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between text-sm"
//         >
//           <span className={value ? "text-gray-900" : "text-gray-500"}>
//             {value
//               ? options.find((opt) => opt.value === value)?.label
//               : placeholder}
//           </span>
//           <svg
//             className={`w-4 h-4 transition-transform ${
//               isOpen ? "rotate-180" : ""
//             }`}
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M19 9l-7 7-7-7"
//             />
//           </svg>
//         </button>

//         {isOpen && (
//           <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
//             {options.map((option) => (
//               <button
//                 key={option.value}
//                 type="button"
//                 onClick={() => {
//                   onChange(option.value);
//                   setIsOpen(false);
//                 }}
//                 className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
//               >
//                 {option.label}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (message.trim()) {
//       console.log("Sending message:", message);
//       setMessage("");
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Left Column - Student List */}
//       <div className="w-1/4 bg-white border-r border-gray-200 flex flex-col">
//         {/* Student List */}
//         <div className="flex-1 overflow-y-auto">
//           {teachers &&
//             teachers.map((teacher) => (
//               <button
//                 key={teacher._id}
//                 onClick={() => setSelectedStudent(teacher._id)}
//                 className={`cursor-pointer w-full p-3 text-left border-b border-gray-100 hover:bg-gray-50 transition-colors ${
//                   selectedStudent === teacher._id
//                     ? "bg-green-600 text-white hover:bg-green-700"
//                     : "bg-white text-gray-900"
//                 }`}
//               >
//                 {/* <div className="font-bold text-sm">{teacher.}</div> */}
//                 <div className="text-sm mt-1 cursor-pointer">
//                   {teacher.nom} {teacher.prenom}
//                 </div>
//               </button>
//             ))}
//         </div>
//       </div>

//       {/* Right Column - Chat Interface */}
//       <div className="w-3/4 flex flex-col">
//         {/* Chat Header */}
//         <div className="bg-white border-b border-gray-200 p-4">
//           {(() => {
//             const selectedTeacher = teachers?.find(
//               (t) => t._id === selectedStudent
//             );
//             return (
//               <>
//                 <div className="font-semibold text-gray-900">
//                   {selectedTeacher
//                     ? `${selectedTeacher.nom} ${selectedTeacher.prenom}`
//                     : "Sélectionner un enseignant"}
//                 </div>
//                 <div className="text-sm text-gray-500">
//                   {/* Tu peux afficher un champ comme l'email ou le module ici si tu veux */}
//                 </div>
//               </>
//             );
//           })()}
//         </div>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto p-4 space-y-4">
//           {messages.map((msg) => (
//             <div
//               key={msg.id}
//               className={`flex ${
//                 msg.isOutgoing ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div
//                 className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
//                   msg.isOutgoing
//                     ? "bg-green-600 text-white"
//                     : "bg-white text-gray-900 border border-gray-200"
//                 }`}
//               >
//                 <div className="text-sm">{msg.text}</div>
//                 <div
//                   className={`text-xs mt-1 ${
//                     msg.isOutgoing ? "text-green-100" : "text-gray-500"
//                   }`}
//                 >
//                   {msg.time}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Message Input */}
//         <div className="bg-white border-t border-gray-200 p-4">
//           <form
//             onSubmit={handleSendMessage}
//             className="flex items-center space-x-3"
//           >
//             <input
//               type="text"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Message..."
//               className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
//             />
//             <button
//               type="submit"
//               className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer"
//             >
//               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
//               </svg>
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { AppContext } from "../../context/AppContext";

// export default function Message() {
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [message, setMessage] = useState("");
//   const [teachers, setTeachers] = useState(null);
//   const [chatMessages, setChatMessages] = useState([]);
//   const { backendUrl } = useContext(AppContext);

//   const userId = Cookies.get("id"); // Récupère l'ID de l'étudiant connecté via cookie

//   const getTeachers = async () => {
//     try {
//       const res = await axios.get(`${backendUrl}/enseignant/get`);
//       setTeachers(res.data.data);
//     } catch (error) {
//       console.log("Erreur enseignants :", error);
//     }
//   };

//   const getMessages = async () => {
//     if (!selectedStudent || !userId) return;
//     try {
//       const res = await axios.get(
//         `${backendUrl}/message/get/${selectedStudent}`,
//         { withCredentials: true }
//       );
//       setChatMessages(res.data);
//     } catch (error) {
//       console.log("Erreur récupération messages :", error);
//     }
//   };

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!message.trim() || !selectedStudent || !userId) return;

//     try {
//       const res = await axios.post(
//         `${backendUrl}/message/send`,
//         {
//           senderId: userId,
//           receiverId: selectedStudent,
//           content: message,
//         },
//         { withCredentials: true }
//       );

//       setChatMessages((prev) => [...prev, res.data]);
//       setMessage("");
//     } catch (error) {
//       console.error("Erreur envoi message :", error);
//     }
//   };

//   useEffect(() => {
//     getTeachers();
//   }, []);

//   useEffect(() => {
//     getMessages();
//   }, [selectedStudent]);

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Liste des enseignants */}
//       <div className="w-1/4 bg-white border-r border-gray-200 flex flex-col">
//         <div className="flex-1 overflow-y-auto">
//           {teachers &&
//             teachers.map((teacher) => (
//               <button
//                 key={teacher._id}
//                 onClick={() => setSelectedStudent(teacher._id)}
//                 className={`cursor-pointer w-full p-3 text-left border-b border-gray-100 hover:bg-gray-50 transition-colors ${
//                   selectedStudent === teacher._id
//                     ? "bg-green-600 text-white hover:bg-green-700"
//                     : "bg-white text-gray-900"
//                 }`}
//               >
//                 <div className="text-sm mt-1 cursor-pointer">
//                   {teacher.nom} {teacher.prenom}
//                 </div>
//               </button>
//             ))}
//         </div>
//       </div>

//       {/* Interface de chat */}
//       <div className="w-3/4 flex flex-col">
//         {/* En-tête */}
//         <div className="bg-white border-b border-gray-200 p-4">
//           {(() => {
//             const selectedTeacher = teachers?.find(
//               (t) => t._id === selectedStudent
//             );
//             return (
//               <>
//                 <div className="font-semibold text-gray-900">
//                   {selectedTeacher
//                     ? `${selectedTeacher.nom} ${selectedTeacher.prenom}`
//                     : "Sélectionner un enseignant"}
//                 </div>
//               </>
//             );
//           })()}
//         </div>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto p-4 space-y-4">
//           {chatMessages.map((msg, index) => (
//             <div
//               key={index}
//               className={`flex ${
//                 msg.senderId === userId ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div
//                 className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
//                   msg.senderId === userId
//                     ? "bg-green-600 text-white"
//                     : "bg-white text-gray-900 border border-gray-200"
//                 }`}
//               >
//                 <div className="text-sm">{msg.content}</div>
//                 <div
//                   className={`text-xs mt-1 ${
//                     msg.senderId === userId ? "text-green-100" : "text-gray-500"
//                   }`}
//                 >
//                   {new Date(msg.createdAt).toLocaleTimeString()}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Champ de message */}
//         <div className="bg-white border-t border-gray-200 p-4">
//           <form
//             onSubmit={handleSendMessage}
//             className="flex items-center space-x-3"
//           >
//             <input
//               type="text"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Message..."
//               className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
//             />
//             <button
//               type="submit"
//               className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer"
//             >
//               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
//               </svg>
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { AppContext } from "../../context/AppContext";

export default function Message() {
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);
  const [message, setMessage] = useState("");
  const [teachers, setTeachers] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const { backendUrl } = useContext(AppContext);

  const userId = Cookies.get("id"); // ID de l'étudiant

  const getTeachers = async () => {
    try {
      const res = await axios.get(`${backendUrl}/enseignant/get`);
      setTeachers(res.data.data);
    } catch (error) {
      console.log("Erreur enseignants :", error);
    }
  };

  const getMessages = async () => {
    if (!selectedTeacherId || !userId) return;
    try {
      const res = await axios.get(
        `${backendUrl}/message/get/${selectedTeacherId}`,
        { withCredentials: true }
      );
      setChatMessages(res.data);
    } catch (error) {
      console.log("Erreur récupération messages :", error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      const res = await axios.post(
        `${backendUrl}/message/send`,
        {
          senderId: userId,
          receiverId: selectedTeacherId,
          text: message,
        },
        { withCredentials: true }
      );

      setChatMessages((prev) => [...prev, res.data]);
      setMessage("");
    } catch (error) {
      console.error("Erreur envoi message :", error);
    }
  };

  useEffect(() => {
    getTeachers();
  }, []);

  useEffect(() => {
    getMessages();
  }, [selectedTeacherId]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Liste des enseignants */}
      <div className="w-1/4 bg-white border-r border-gray-200 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {teachers &&
            teachers.map((teacher) => (
              <button
                key={teacher._id}
                onClick={() => setSelectedTeacherId(teacher._id)}
                className={`cursor-pointer w-full p-3 text-left border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  selectedTeacherId === teacher._id
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-white text-gray-900"
                }`}
              >
                <div className="text-sm mt-1">
                  {teacher.nom} {teacher.prenom}
                </div>
              </button>
            ))}
        </div>
      </div>

      {/* Chat */}
      <div className="w-3/4 flex flex-col">
        {/* En-tête */}
        <div className="bg-white border-b border-gray-200 p-4">
          {(() => {
            const selectedTeacher = teachers?.find(
              (t) => t._id === selectedTeacherId
            );
            return (
              <div className="font-semibold text-gray-900">
                {selectedTeacher
                  ? `${selectedTeacher.nom} ${selectedTeacher.prenom}`
                  : "Sélectionner un enseignant"}
              </div>
            );
          })()}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatMessages.map((msg, index) => {
            const isOutgoing = msg.senderId === userId;
            const time = new Date(msg.createdAt)
              .toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              })
              .replace(":", "h");

            return (
              <div
                key={msg._id || index}
                className={`flex ${
                  isOutgoing ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    isOutgoing
                      ? "bg-green-600 text-white"
                      : "bg-white text-gray-900 border border-gray-200"
                  }`}
                >
                  <div className="text-sm">{msg.text}</div>
                  <div
                    className={`text-xs mt-1 ${
                      isOutgoing ? "text-green-100" : "text-gray-500"
                    }`}
                  >
                    {time}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Saisie message */}
        <div className="bg-white border-t border-gray-200 p-4">
          <form
            onSubmit={handleSendMessage}
            className="flex items-center space-x-3"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
