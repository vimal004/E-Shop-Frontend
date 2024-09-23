import React, { useState, useEffect } from "react";
import Card from "../Components/Card";
import ShimmerCard from "../Components/ShimmerCard";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import searchSlice, { setsearch } from "../Redux/Slices/searchSlice";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Location changed:", location.pathname); // Debug statement
    dispatch(setsearch("")); // Clear search value
  }, [location.pathname]); // Trigger effect on location pathname change

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [shimmer, setShimmer] = useState(true);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [priceFilter, setPriceFilter] = useState(Infinity);
  const currmode = useSelector((state) => state.mode);
  const searchtext = useSelector((state) => state.search.text);

  useEffect(() => {
    axios
      .get("https://mern-project-backend-green.vercel.app/api/users/data")
      .then((res) => {
        const formattedData = res.data.map((item) => ({
          ...item,
          price: parseFloat(item.price.replace("$", "")),
          rating: parseFloat(item.rating),
        }));
        setData(formattedData);
        setFilteredData(formattedData); // Load all products by default
        setShimmer(false);
      })
      .catch(() => {
        console.log("error fetching data");
      });
  }, []);

  useEffect(() => {
    // Reset filters when product prop changes
    setRatingFilter(0);
    setPriceFilter(Infinity);
    setFilteredData(data);
  }, [product, data]);

  const handleRatingChange = (e) => {
    setRatingFilter(parseFloat(e.target.value));
  };

  const handlePriceChange = (e) => {
    setPriceFilter(parseFloat(e.target.value));
  };

  const handleFilterSubmit = () => {
    const filtered = data.filter(
      (d) =>
        d.category === product &&
        d.product_name.toLowerCase().includes(searchtext.toLowerCase()) &&
        d.rating >= ratingFilter &&
        d.price <= priceFilter
    );
    setFilteredData(filtered);
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        currmode ? "bg-gray-700" : "bg-white"
      }`}
    >
      <h1
        className={`text-center text-3xl font-bold mt-7 mb-4 ${
          currmode ? "text-white" : "text-black"
        }`}
      >
        {product.charAt(0).toUpperCase() + product.slice(1).toLowerCase()}
      </h1>

      <div className="flex flex-col items-center mb-4">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div>
            <label
              className={`block mb-1 ${currmode ? "text-white" : "text-black"}`}
            >
              Filter by Rating:
            </label>
            <select
              className="p-2 border rounded"
              value={ratingFilter}
              onChange={handleRatingChange}
            >
              <option value={0}>All</option>
              <option value={1}>1 Star & Up</option>
              <option value={2}>2 Stars & Up</option>
              <option value={3}>3 Stars & Up</option>
              <option value={4}>4 Stars & Up</option>
              <option value={5}>5 Stars</option>
            </select>
          </div>

          <div>
            <label
              className={`block mb-1 ${currmode ? "text-white" : "text-black"}`}
            >
              Filter by Price:
            </label>
            <input
              type="number"
              className="p-2 border rounded"
              value={priceFilter === Infinity ? "" : priceFilter}
              onChange={handlePriceChange}
              placeholder="Max Price"
            />
          </div>
        </div>
        <Button onClick={handleFilterSubmit}>Filter</Button>
      </div>

      <div className="flex-grow flex flex-wrap justify-center items-center gap-6 p-2 relative">
        <div
          className={`absolute inset-x-0 top-6 flex flex-wrap justify-center items-center gap-6 p-2 transition-opacity duration-500 ${
            shimmer ? "opacity-100" : "opacity-0"
          }`}
        >
          <ShimmerCard />
          <ShimmerCard />
          <ShimmerCard />
          <ShimmerCard />
        </div>
        <div
          className={`transition-opacity duration-500 ${
            shimmer ? "opacity-0" : "opacity-100"
          } flex flex-wrap justify-center items-center gap-6 p-2`}
        >
          {filteredData.map(
            (d) =>
              d.product_name.toLowerCase().includes(searchtext.toLowerCase()) &&
              d.category === product && (
                <Link to={d.product_name} key={d._id}>
                  <Card
                    key={d.product_name}
                    name={d.product_name}
                    rating={d.rating}
                    price={d.price}
                    imageLink={d.image_link}
                    mode={currmode}
                  />
                </Link>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
