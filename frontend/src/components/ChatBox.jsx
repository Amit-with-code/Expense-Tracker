// src/components/ChatBox.jsx
import { useState } from "react";

export default function ChatBox() {
  const [messages, setMessages] = useState([
    { text: "Welcome to chat 👋", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = { text: input, sender: "user" };

    setMessages([...messages, newMessage]);

    // fake bot reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "Got it 👍", sender: "bot" },
      ]);
    }, 500);

    setInput("");
  };

  return (
    <div className="bg-white shadow rounded-xl p-4 flex flex-col h-[400px]">
      <h2 className="font-semibold mb-2">Chat</h2>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-2 mb-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded max-w-[70%] ${
              msg.sender === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-200"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          className="border flex-1 p-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />

        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}