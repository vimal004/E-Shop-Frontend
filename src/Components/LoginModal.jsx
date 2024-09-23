import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoggedIn, setUser } from "../Redux/Slices/userSlice";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Slide,
  IconButton,
  Snackbar,
  useTheme,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import MuiAlert from "@mui/material/Alert";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LoginModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const theme = useTheme();

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("https://mern-project-backend-green.vercel.app/api/users/login", {
        email,
        password,
      })
      .then((res) => {
        dispatch(setUser(res?.data));
        console.log(res?.data?.email);
        localStorage.setItem("user", res?.data?.email);
        dispatch(setLoggedIn());
        onClose();
        setSnackbarMessage("Login Successful!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      })
      .catch(() => {
        setSnackbarMessage("Login Failed! Please check your credentials.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setSnackbarMessage("Passwords do not match!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    axios
      .post(
        "https://mern-project-backend-green.vercel.app/api/users/register",
        {
          email,
          password,
        }
      )
      .then(() => {
        onClose();
        setSnackbarMessage("Registration Successful!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      })
      .catch(() => {
        setSnackbarMessage("Registration Failed! Please try again.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleToggleMode = () => {
    setIsRegister(!isRegister);
    setError("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
        keepMounted
        PaperProps={{
          style: {
            borderRadius: 15,
            padding: "10px 20px",
            backgroundColor:
              theme.palette.mode === "dark"
                ? theme.palette.background.default
                : "white",
            color: theme.palette.mode === "dark" ? "white" : "black",
          },
        }}
      >
        <DialogTitle>
          {isRegister ? "Register" : "Login"}
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isRegister
              ? "Please enter your details to register."
              : "Please enter your email and password."}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: 2 }}
            InputProps={{
              style: {
                color: theme.palette.mode === "dark" ? "white" : "black",
              },
            }}
            InputLabelProps={{
              style: {
                color: theme.palette.mode === "dark" ? "white" : "black",
              },
            }}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error !== ""}
            helperText={error}
            sx={{ marginBottom: 2 }}
            InputProps={{
              style: {
                color: theme.palette.mode === "dark" ? "white" : "black",
              },
            }}
            InputLabelProps={{
              style: {
                color: theme.palette.mode === "dark" ? "white" : "black",
              },
            }}
          />
          {isRegister && (
            <TextField
              margin="dense"
              label="Confirm Password"
              type="password"
              fullWidth
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ marginBottom: 2 }}
              InputProps={{
                style: {
                  color: theme.palette.mode === "dark" ? "white" : "black",
                },
              }}
              InputLabelProps={{
                style: {
                  color: theme.palette.mode === "dark" ? "white" : "black",
                },
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToggleMode} sx={{ borderRadius: 50 }}>
            {isRegister
              ? "Already have an account? Sign In"
              : "Don't have an account? Register"}
          </Button>
          <Button onClick={onClose} sx={{ borderRadius: 50 }}>
            Cancel
          </Button>
          <Button
            onClick={isRegister ? handleRegister : handleLogin}
            variant="contained"
            color="primary"
            sx={{ borderRadius: 50, boxShadow: 3 }}
          >
            {isRegister ? "Register" : "Login"}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={snackbarSeverity}
          onClose={handleCloseSnackbar}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default LoginModal;
