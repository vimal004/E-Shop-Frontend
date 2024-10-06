import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  TextField,
  Rating,
  Box,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  Slide,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { styled } from "@mui/system";

// Styled components
const StyledButton = styled(Button)(({ theme }) => ({
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  borderRadius: "15px", // Curved edges
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.02)",
  },
}));

const Item = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const currmode = useSelector((state) => state.mode);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(false);
  const [inStock] = useState(true);
  const [reviews, setReviews] = useState([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [reviewName, setReviewName] = useState("");
  const [reviewComments, setReviewComments] = useState("");
  const [reviewRating, setReviewRating] = useState(0);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  useEffect(() => {
    axios
      .get("https://mern-project-backend-green.vercel.app/api/users/data")
      .then((res) => {
        const itemData = res.data.find((d) => d.product_name === id);
        if (itemData) {
          setData({ ...itemData, email: localStorage.getItem("user") });
        }
        setLoading(false);
      })
      .catch(() => {
        console.log("error fetching data");
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    axios
      .post(
        "https://mern-project-backend-green.vercel.app/api/users/getreview",
        {
          product_name: id,
        }
      )
      .then((res) => {
        if (res.data && res.data.reviews && res.data.reviews.length > 0) {
          setReviews(res.data.reviews);
        }
      })
      .catch(() => {
        console.log("error fetching reviews");
      });
  }, [id]);

  useEffect(() => {
    if (data) {
      axios
        .post(
          "https://mern-project-backend-green.vercel.app/api/users/itemexists",
          {
            email: data.email,
            product_name: data.product_name,
          }
        )
        .then(() => {
          setCart(true);
        })
        .catch(() => {
          setCart(false);
        });
    }
  }, [data]);

  const handleQtyChange = (event) => {
    const newQty = event.target.value;
    data.qty = parseInt(newQty);
    axios.put("https://mern-project-backend-green.vercel.app/api/users/qty", {
      email: data.email,
      product_name: data.product_name,
      qty: data.qty,
    });
  };

  const handleAddToCart = () => {
    axios
      .post(
        "https://mern-project-backend-green.vercel.app/api/users/addcart",
        data
      )
      .then(() => {
        setCart(true);
        handleSnackbarOpen("Added to Cart");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteCart = () => {
    axios
      .delete(
        "https://mern-project-backend-green.vercel.app/api/users/deletecart",
        {
          data: {
            email: localStorage.getItem("user"),
            product_name: data.product_name,
          },
        }
      )
      .then(() => {
        setCart(false);
        handleSnackbarOpen("Removed from Cart");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleReviewSubmit = () => {
    if (reviewName && reviewComments && reviewRating) {
      axios
        .post(
          "https://mern-project-backend-green.vercel.app/api/users/review",
          {
            product_name: id,
            name: reviewName,
            comments: reviewComments,
            rating: reviewRating,
          }
        )
        .then(() => {
          setReviews([
            ...reviews,
            {
              name: reviewName,
              comments: reviewComments,
              rating: reviewRating,
            },
          ]);
          handleSnackbarOpen("Review added successfully");
          setReviewName("");
          setReviewComments("");
          setReviewRating(0);
        })
        .catch(() => {
          handleSnackbarOpen("Failed to add review");
        });
    } else {
      handleSnackbarOpen("Please fill all fields");
    }
  };

  // Calculate the average rating
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length
        ).toFixed(1)
      : 0;

  if (loading) {
    return (
      <Box
        className={`min-h-screen flex justify-center items-center ${
          currmode ? "bg-gray-700 text-white" : "bg-white text-black"
        }`}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Grid
      container
      className={`p-6 ${
        currmode ? "bg-gray-700 text-white" : "bg-white text-black"
      }`}
      spacing={4}
    >
      <Grid item xs={12} md={6}>
        <img
          className="w-full h-auto object-cover rounded-lg"
          src={data.image_link}
          alt={data.product_name}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Typography variant="h4" gutterBottom>
          {data.product_name}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {data.price}
        </Typography>
        <Box display="flex" alignItems="center" mb={2}>
          <Typography variant="body1" gutterBottom>
            Rating:{" "}
          </Typography>
          <Rating value={parseFloat(averageRating)} readOnly />
          <Typography variant="body1" ml={2}>
            ({averageRating}/5 from {reviews.length} reviews)
          </Typography>
        </Box>
        <Typography variant="body1" gutterBottom>
          Features:
        </Typography>
        <ul className="list-disc list-inside mb-6">
          {data.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>

        <div className="mb-6">
          {inStock ? (
            <Typography variant="body1" color="success.main">
              In Stock
            </Typography>
          ) : (
            <Typography variant="body1" color="error.main">
              Out of Stock
            </Typography>
          )}
        </div>

        <Box display="flex" gap={2} alignItems="center" mb={4}>
          <StyledButton
            variant="contained"
            color={cart ? "error" : "primary"}
            onClick={() => (cart ? handleDeleteCart() : handleAddToCart())}
          >
            {cart ? "Remove from Cart" : "Add to Cart"}
          </StyledButton>
          <StyledButton
            variant="contained"
            color="success"
            onClick={() => {
              handleAddToCart();
              navigate("/checkout");
            }}
          >
            Buy Now
          </StyledButton>
          <FormControl variant="outlined" className="w-24">
            <InputLabel>Qty</InputLabel>
            <Select
              value={data.qty}
              onChange={handleQtyChange}
              label="Qty"
              className={`${currmode ? "text-white" : "text-black"}`}
            >
              {[...Array(10).keys()].map((val) => (
                <MenuItem key={val + 1} value={val + 1}>
                  {val + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Reviews
        </Typography>
        <Box mb={2}>
          <Typography variant="body1">
            Average Rating: {averageRating}/5
          </Typography>
          <Rating value={parseFloat(averageRating)} readOnly />
        </Box>
        {reviews.map((review, index) => (
          <StyledCard key={index}>
            <CardContent>
              <Typography variant="h6">{review.name}</Typography>
              <Rating value={review.rating} readOnly />
              <Typography variant="body2" color="text.secondary">
                {review.comments}
              </Typography>
            </CardContent>
          </StyledCard>
        ))}

        <Box
          mt={4}
          sx={{
            backgroundColor: currmode ? "#3030" : "white", // Dark gray for dark mode, light gray for light mode
            padding: "16px",
            borderRadius: "8px",
            border: currmode ? "1px solid #fff" : "1px solid #000", // White border for dark mode, black for light mode
          }}
        >
          <Typography variant="h6" sx={{ color: currmode ? "#fff" : "#000" }}>
            Add a Review
          </Typography>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={reviewName}
            onChange={(e) => setReviewName(e.target.value)}
            margin="normal"
            InputProps={{
              style: {
                color: currmode ? "#fff" : "#000", // White text in dark mode, black in light mode
              },
            }}
            InputLabelProps={{
              style: {
                color: currmode ? "#fff" : "#000", // White label in dark mode, black in light mode
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: currmode ? "#fff" : "#000", // White outline in dark mode, black in light mode
                },
                "&:hover fieldset": {
                  borderColor: currmode ? "#fff" : "#000",
                },
                "&.Mui-focused fieldset": {
                  borderColor: currmode ? "#fff" : "#000",
                },
              },
            }}
          />
          <TextField
            label="Comments"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={reviewComments}
            onChange={(e) => setReviewComments(e.target.value)}
            margin="normal"
            InputProps={{
              style: {
                color: currmode ? "#fff" : "#000",
              },
            }}
            InputLabelProps={{
              style: {
                color: currmode ? "#fff" : "#000",
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: currmode ? "#fff" : "#000",
                },
                "&:hover fieldset": {
                  borderColor: currmode ? "#fff" : "#000",
                },
                "&.Mui-focused fieldset": {
                  borderColor: currmode ? "#fff" : "#000",
                },
              },
            }}
          />
          {/* Add the Rating component here if needed */}
          <Button
            onClick={handleReviewSubmit}
            variant="contained"
            color="primary"
          >
            Submit Review
          </Button>
        </Box>
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        TransitionComponent={(props) => <Slide {...props} direction="up" />}
      >
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Grid>
  );
};

export default Item;
