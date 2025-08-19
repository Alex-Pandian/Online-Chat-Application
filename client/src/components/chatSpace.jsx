import React, { useEffect, useState, useRef } from "react";
import { getMessages } from "../services/chatService";
import InputField from "./inputField";
import { socket } from "../services/socket";

const ChatSpace = ({ chatId, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const chatIdRef = useRef(chatId);
  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  const [autoScroll, setAutoScroll] = useState(true);

  // Scroll to bottom only if autoScroll is enabled
  useEffect(() => {
    if (!bottomRef.current || !autoScroll) return;

    const timeout = setTimeout(() => {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }, 30);

    return () => clearTimeout(timeout);
  }, [messages, autoScroll]);

  // Keep chatIdRef updated
  useEffect(() => {
    chatIdRef.current = chatId;
  }, [chatId]);

  // Fetch messages when chatId changes
  useEffect(() => {
    if (!chatId) return;

    const fetchMessages = async () => {
      try {
        const data = await getMessages(chatId);
        setMessages(data);
        socket.emit("joinChat", chatId);
        console.log("🔗 Joined chat room:", chatId);
      } catch (err) {
        console.error("Fetch failed:", err);
      }
    };

    fetchMessages();
  }, [chatId]);

  // ✅ Socket listener once
  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
    });

    const handleNewMessage = (msg) => {
      const isSameChat = String(msg.chat) === String(chatIdRef.current);
      if (isSameChat) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("connect");
    };
  }, []);

  // Detect if user is near bottom (like WhatsApp)
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    // if user is within 100px of bottom, enable autoScroll
    setAutoScroll(scrollHeight - (scrollTop + clientHeight) < 100);
  };

  return (
    <div className="flex-1 bg-gray-900 text-white shadow-lg pl-2 flex flex-col justify-between">
      {/* Messages container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto w-full space-y-2 p-2 scroll-container"
      >
        {messages.map((msg) => {
          const isSender =
            String(msg.sender?._id || msg.sender) === String(currentUser._id);

          return (
            <div
              key={msg._id || Math.random()}
              className={`px-3 py-2 w-fit max-w-[70%] break-words shadow-md text-sm leading-relaxed ${
                isSender
                  ? "bg-green-500 text-white ml-auto rounded-2xl rounded-br-none"
                  : "bg-gray-700 text-gray-100 mr-auto rounded-2xl rounded-bl-none"
              }`}
            >
              {/* Sender name */}
              <div className="text-[10px] opacity-70 mb-1">
                {isSender ? "You" : msg.sender?.fullName || "User"}
              </div>

              {/* Message */}
              <div>{msg.content}</div>
            </div>
          );
        })}

        {/* 👇 Dummy element at the bottom */}
        <div ref={bottomRef} className="h-1" />
      </div>

      {/* Input field at bottom */}
      <InputField chatId={chatId} />
    </div>
  );
};

export default ChatSpace;
