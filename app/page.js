"use client";

import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();

    setMessages([
      ...newMessages,
      { role: "assistant", content: data.reply }
    ]);

    setInput("");
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">

      {/* Sidebar */}
      <div className="w-64 bg-gray-950 p-4">
        <h1 className="text-xl font-bold">Procudan</h1>
        <p className="text-sm text-gray-400">AI Chatbot</p>
      </div>

      {/* Chat area */}
      <div className="flex flex-col flex-1">

        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg, i) => (
            <div key={i} className="mb-2">
              <b>{msg.role === "user" ? "Du" : "Procudan"}:</b> {msg.content}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-700 flex">
          <input
            className="flex-1 p-2 rounded bg-gray-800"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Skriv din besked..."
          />
          <button
            onClick={sendMessage}
            className="ml-2 px-4 bg-blue-600 rounded"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
}
