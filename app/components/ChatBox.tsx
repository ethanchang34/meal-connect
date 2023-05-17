"use client";

import React, { useState } from "react";

interface Message {
  id: number;
  text: string;
  sender: string;
}

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newMessage.trim() === "") {
      return;
    }

    const message: Message = {
      id: Date.now(),
      text: newMessage,
      sender: "user",
    };

    setMessages([...messages, message]);
    setNewMessage("");
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
