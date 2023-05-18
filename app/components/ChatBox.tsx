"use client";

import React, { useState, useEffect } from "react";
import { Socket, io } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
// let socket: Socket<DefaultEventsMap, DefaultEventsMap>;
let socket = io("http://localhost:3000/api/socket");

interface Message {
  id: number;
  text: string;
  sender: string;
}

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socketInitializer();
  }, []);

  //   useEffect(() => {
  //     socket.on("newMessage", (data) => {
  //       setMessages((prevMessages) => [...prevMessages, data]);
  //     });
  //     return () => {
  //       socket.disconnect();
  //     };
  //   }, []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("update-message", (msg) => {
      //   setNewMessage(msg);
      console.log("update-message:", msg);
      const message: Message = {
        id: Date.now(),
        text: msg,
        sender: "user",
      };
      setMessages([...messages, message]);
      //   setNewMessage("");
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
    console.log("handleInputChange called");

    // socket.emit("newMessage", event.target.value);

    // socket.emit("input-change", event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    socket.emit("newMessage", newMessage);
    const message: Message = {
      id: Date.now(),
      text: newMessage,
      sender: "user",
    };
    setMessages([...messages, message]);
    setNewMessage("");

    if (newMessage.trim() === "") {
      return;
    }
  };

  return (
    <div className="chatbox">
      <div className="message-container">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="input-container">
        <input
          type="text"
          value={newMessage}
          onChange={handleInputChange}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatBox;
