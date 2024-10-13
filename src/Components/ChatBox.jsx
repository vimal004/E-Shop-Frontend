import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Fade,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
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
      <IconButton
        onClick={toggleChatBox}
        sx={{
          bgcolor: "primary.main",
          color: "white",
          "&:hover": {
            bgcolor: "primary.dark",
          },
        }}
      >
        <ChatIcon />
      </IconButton>

      <Fade in={open}>
        <Box
          sx={{
            width: 300,
            bgcolor: "background.paper",
            boxShadow: 3,
            borderRadius: 2,
            p: 2,
            position: "absolute",
            right: 0,
            bottom: 60,
            display: "flex",
            flexDirection: "column",
            transition: "0.3s",
            zIndex: 1000,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography variant="h6">Customer Support</Typography>
            <IconButton
              onClick={toggleChatBox}
              sx={{ color: "text.secondary" }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              mb: 1,
              maxHeight: 200,
              padding: 1,
              border: "1px solid #e0e0e0",
              borderRadius: 1,
              backgroundColor: "#f9f9f9",
            }}
          >
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  mb: 1,
                  display: "flex",
                  justifyContent:
                    msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <Box
                  sx={{
                    maxWidth: "70%",
                    bgcolor: msg.role === "user" ? "primary.main" : "grey.300",
                    color: msg.role === "user" ? "white" : "black",
                    borderRadius: 2,
                    padding: 1,
                    boxShadow: 1,
                    transition: "background-color 0.3s",
                  }}
                >
                  <Typography variant="body2">
                    <strong>{msg.role === "user" ? "You" : "Support"}:</strong>{" "}
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
              bgcolor: "primary.main",
              color: "white",
              "&:hover": { bgcolor: "primary.dark" },
            }}
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </Box>
      </Fade>
    </Box>
  );
};

export default ChatBox;
