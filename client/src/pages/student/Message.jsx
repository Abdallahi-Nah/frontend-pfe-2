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
        `${backendUrl}/message/create`,
        {
          senderId: userId,
          senderType: "Etudiant",
          receiverId: selectedTeacherId,
          receiverType: "Enseignant",
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
              .replace(":", "h:");

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
