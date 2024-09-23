import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Fade,
} from "@mui/material";
import { Routes, Route, Link } from "react-router-dom";
import Clothing from "../assets/Clothing.jpg";
import Kitchen from "../assets/Kitchen.jpg";
import Sports from "../assets/Sports.jpg";
import Electronics from "../assets/Electronics.avif";
import ShimmerCard from "../Components/ShimmerCard";
import Product from "./Product"; // Assuming Product component exists
import { useDispatch } from "react-redux";
import { setsearch } from "../Redux/Slices/searchSlice";
import ChatBox from "../Components/ChatBox";

const Home = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.mode);
  const [shimmer, setShimmer] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShimmer(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const cardItems = [
    {
      title: "Clothing",
      description: "Discover the latest trends in fashion.",
      image: Clothing,
      path: "clothing",
    },
    {
      title: "Electronic Gadgets",
      description: "Explore a wide range of electronic gadgets.",
      image: Electronics,
      path: "electronics",
    },
    {
      title: "Kitchen",
      description: "Find kitchen essentials and appliances.",
      image: Kitchen,
      path: "kitchen",
    },
    {
      title: "Sport Kits",
      description: "Get ready for your favorite sports activities.",
      image: Sports,
      path: "sports",
    },
  ];

  useEffect(() => {
    console.log("Location changed:", location.pathname); // Debug statement
    dispatch(setsearch("")); // Clear search value
  }, [location.pathname]);

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? "bg-gray-700" : "bg-white"
      }`}
    >
      
      <Box
        sx={{
          minHeight: "100vh",
          color: darkMode ? "white" : "black",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: 7,
          pb: 4,
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          Shop Now!
        </Typography>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            p: 2,
            width: "100%",
            maxWidth: 1200, // Adjust max width as needed
          }}
        >
          {shimmer && (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 3,
                p: 2,
                transition: "opacity 0.5s",
                opacity: shimmer ? 1 : 0,
              }}
            >
              {[...Array(3)].map((_, index) => (
                <ShimmerCard key={index} />
              ))}
            </Box>
          )}
          <Fade in={!shimmer} timeout={1000}>
            <Grid
              container
              spacing={3}
              sx={{
                opacity: shimmer ? 0 : 1,
                transition: "opacity 0.5s",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {cardItems.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Link to={`/${item.path}`} style={{ textDecoration: "none" }}>
                    <Card
                      sx={{
                        maxWidth: 345,
                        bgcolor: darkMode ? "grey.900" : "white",
                        color: darkMode ? "white" : "black",
                        transition: "transform 0.3s, box-shadow 0.3s",
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: darkMode ? 24 : 6,
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="140"
                        image={item.image}
                        alt={item.title}
                      />
                      <CardContent>
                        <Typography
                          variant="h5"
                          component="div"
                          sx={{ color: darkMode ? "white" : "black" }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: darkMode ? "grey.300" : "text.secondary",
                          }}
                        >
                          {item.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Fade>
        </Box>
      </Box>

      {/* Define routes for each product category */}
      <Routes>
        {cardItems.map((item, index) => (
          <Route
            key={index}
            path={`/${item.path}`}
            element={<Product product={item.path} />}
          />
        ))}
      </Routes>
      <ChatBox /> 
    </div>
  );
};

export default Home;
