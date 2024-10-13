import React, { useEffect, useState } from "react";
import { Box, Typography, Button, TextField, IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import io from "socket.io-client"; // Import socket.io-client

const socket = io("https://e-shop-ws.onrender.com");

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    socket.emit("registerClient"); // Register as a client
    // Listen for incoming messages from the WebSocket server
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup on component unmount
    return () => {
      socket.off("message");
    };
  }, []);

  const toggleChatBox = () => {
    setOpen(!open);
  };

  const sendMessage = () => {
    if (input.trim()) {
      const userMessage = { role: "user", content: input };
      setMessages((prev) => [...prev, userMessage]);
      console.log(userMessage);
      socket.emit("message", userMessage); // Send message to the WebSocket server
      setInput("");
    }
  };

  return (
    <Box sx={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
      <IconButton onClick={toggleChatBox}>
        <ChatIcon />
      </IconButton>
      {open && (
        <Box
          sx={{
            width: 300,
            bgcolor: "white",
            boxShadow: 3,
            borderRadius: 2,
            p: 2,
            position: "absolute",
            right: 0,
            bottom: 60,
            zIndex: 1000,
          }}
        >
          <IconButton onClick={toggleChatBox} sx={{ float: "right" }}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">Customer Support</Typography>
          <Box sx={{ maxHeight: 200, overflowY: "auto", mb: 1 }}>
            {messages.map((msg, index) => (
              <Typography
                key={index}
                sx={{
                  margin: "5px 0",
                  textAlign: msg.role === "user" ? "right" : "left",
                }}
              >
                <strong>{msg.role === "user" ? "You:" : "Support:"} </strong>
                {msg.content}
              </Typography>
            ))}
          </Box>
          <TextField
            fullWidth
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
          />
          <Button onClick={sendMessage} variant="contained" sx={{ mt: 1 }}>
            Send
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ChatBox;
