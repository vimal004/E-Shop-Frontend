import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../Components/Card";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Button, Typography, Snackbar, Grid } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useDispatch } from "react-redux";
import { setsearch } from "../Redux/Slices/searchSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const [shimmer, setShimmer] = useState(true);
  const [data, setData] = useState([]);
  const email = localStorage.getItem("user");
  const [mail, setEmail] = useState("");
  const currmode = useSelector((state) => state.mode);
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  useEffect(() => {
    console.log("Location changed:", location.pathname); // Debug statement
    dispatch(setsearch("")); // Clear search value
  }, [location.pathname]);

  useEffect(() => {
    if (email) {
      setEmail(email);
      axios
        .post(
          "https://mern-project-backend-green.vercel.app/api/users/getcart",
          { email }
        )
        .then((res) => {
          setData(res.data);
          setShimmer(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setEmail("");
      setShimmer(false);
    }
  }, [email]);

  const handleDelete = () => {
    axios
      .delete(
        "https://mern-project-backend-green.vercel.app/api/users/deleteall",
        {
          data: { email: mail },
        }
      )
      .then((res) => {
        console.log(res);
        setData([]);
        setSnackbarOpen(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return mail.length < 5 ? (
    <div
      className={`min-h-screen flex flex-col ${
        currmode ? "bg-gray-700" : "bg-white"
      }`}
    >
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          //backgroundColor: currmode ? "#424242" : "#ffffff",
          color: currmode ? "#ffffff" : "#000000",
          padding: "16px",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          style={{ marginBottom: "16px" }}
        >
          Sign in to add items to the cart.
          hello
        </Typography>
      </div>
    </div>
  ) : (
    <div
      className={`min-h-screen flex flex-col ${
        currmode ? "bg-gray-700" : "bg-white"
      }`}
    >
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          //backgroundColor: currmode ? "#424242" : "#ffffff",
          color: currmode ? "#ffffff" : "#000000",
          padding: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <Typography
            variant="h3"
            style={{
              textAlign: "center",
              marginBottom: "16px",
            }}
          >
            Cart Items
          </Typography>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              style={{ marginBottom: "16px", minWidth: "150px" }}
            >
              Clear Cart
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/checkout")}
              style={{ minWidth: "150px" }}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </div>

        <Grid container spacing={3} justifyContent="center">
          {data.length === 0 ? (
            <Grid item xs={12}>
              <Typography
                variant="h5"
                align="center"
                style={{ marginTop: "16px" }}
              >
                Cart is empty
              </Typography>
            </Grid>
          ) : (
            data.map((item, index) => (
              <Grid item key={index}>
                <Link
                  to={`https://e-shop-gamma-sepia.vercel.app/cart/${item.product_name}`}
                >
                  <Card
                    name={item.product_name}
                    rating={item.rating}
                    price={item.price}
                    imageLink={item.image_link}
                    mode={currmode}
                  />
                </Link>
              </Grid>
            ))
          )}
        </Grid>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleCloseSnackbar}
            severity="success"
          >
            Cart cleared successfully!
          </MuiAlert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Cart;
