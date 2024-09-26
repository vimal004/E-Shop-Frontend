import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoggedIn, setUser } from "../Redux/Slices/userSlice";
import axios from "axios";
import { auth } from "../Firebase/firebaseConfig";
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
  Stack,
} from "@mui/material";
import { Close as CloseIcon, Google as GoogleIcon } from "@mui/icons-material";
import MuiAlert from "@mui/material/Alert";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

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

  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("https://mern-project-backend-green.vercel.app/api/users/login", {
        email,
        password,
      })
      .then((res) => {
        dispatch(setUser(res?.data));
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

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      dispatch(setUser(user));
      localStorage.setItem("user", user.email);
      dispatch(setLoggedIn());
      onClose();
      setSnackbarMessage("Google Login Successful!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Google Login Failed!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
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
            padding: "20px",
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "#000",
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
              ? "Create an account to get started."
              : "Please login to your account."}
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
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: 2 }}
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
            />
          )}
        </DialogContent>
        <DialogActions>
          <Stack
            direction="column"
            spacing={2}
            sx={{ width: "100%", padding: "0 20px" }}
          >
            <Button
              onClick={isRegister ? handleRegister : handleLogin}
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                borderRadius: 30,
                padding: "10px 20px",
                textTransform: "none",
                boxShadow: 3,
              }}
            >
              {isRegister ? "Register" : "Login"}
            </Button>

            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleLogin}
              fullWidth
              sx={{
                borderRadius: 30,
                padding: "10px 20px",
                textTransform: "none",
                boxShadow: 1,
                borderColor: theme.palette.grey[500],
              }}
            >
              Sign In with Google
            </Button>

            <Button
              onClick={handleToggleMode}
              fullWidth
              sx={{
                textTransform: "none",
                color: theme.palette.primary.main,
              }}
            >
              {isRegister
                ? "Already have an account? Sign In"
                : "Don't have an account? Register"}
            </Button>
          </Stack>
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
