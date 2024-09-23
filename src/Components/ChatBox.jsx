import React, { useEffect, useState } from "react";
import { Box, Typography, Button, TextField, IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const toggleChatBox = () => {
    setOpen(!open);
  };

  const sendMessage = async () => {
    if (input.trim()) {
      const userMessage = { role: "user", content: input };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");

      try {
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: [...messages, userMessage],
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        const botMessage = {
          role: "assistant",
          content: response.data.choices[0].message.content,
        };
        setMessages((prev) => [...prev, userMessage, botMessage]);
      } catch (error) {
        console.error("Error fetching response:", error);
      }
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
                <strong>{msg.role === "user" ? "You:" : "Bot:"} </strong>
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
