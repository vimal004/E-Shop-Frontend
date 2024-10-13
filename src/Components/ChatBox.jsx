import React, { useEffect, useState, useRef } from "react";
import { Box, Typography, Button, TextField, IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { motion } from "framer-motion";
import io from "socket.io-client";

const socket = io("https://e-shop-ws.onrender.com");

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const messageEndRef = useRef(null);

  useEffect(() => {
    socket.emit("registerClient");

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChatBox = () => {
    setOpen(!open);
  };

  const sendMessage = () => {
    if (input.trim()) {
      const userMessage = { role: "user", content: input };
      setMessages((prev) => [...prev, userMessage]);
      socket.emit("message", userMessage);
      setInput("");
    }
  };

  return (
    <Box sx={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <IconButton
          onClick={toggleChatBox}
          sx={{ bgcolor: "#4CAF50", color: "white", p: 2, boxShadow: 4 }}
        >
          <ChatIcon />
        </IconButton>
      </motion.div>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Box
            sx={{
              width: 320,
              height: 400,
              bgcolor: "white",
              boxShadow: 6,
              borderRadius: 4,
              p: 2,
              position: "absolute",
              right: 0,
              bottom: 60,
              zIndex: 1000,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Customer Support
              </Typography>
              <IconButton onClick={toggleChatBox} sx={{ color: "#FF3D00" }}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1, overflowY: "auto", p: 1, mt: 2 }}>
              {messages.map((msg, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent:
                      msg.role === "user" ? "flex-end" : "flex-start",
                    mb: 1,
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "75%",
                      p: 1.5,
                      bgcolor: msg.role === "user" ? "#4CAF50" : "#E0E0E0",
                      color: msg.role === "user" ? "white" : "black",
                      borderRadius: 2,
                      boxShadow: 3,
                    }}
                  >
                    <Typography variant="body2">
                      <strong>
                        {msg.role === "user" ? "You" : "Support"}:{" "}
                      </strong>
                      {msg.content}
                    </Typography>
                  </Box>
                </Box>
              ))}
              <div ref={messageEndRef} />
            </Box>
            <TextField
              fullWidth
              variant="outlined"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              sx={{ mb: 1 }}
            />
            <Button
              onClick={sendMessage}
              variant="contained"
              sx={{
                bgcolor: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                color: "white",
              }}
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </Box>
        </motion.div>
      )}
    </Box>
  );
};

export default ChatBox;
