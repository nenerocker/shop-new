import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, Box, Paper, styled, Card, CardHeader, AppBar, Toolbar, Typography, Button, IconButton, BottomNavigation } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { IoArrowBack } from "react-icons/io5";


const AddCart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart data from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart).map((item) => ({
        ...item,
        quantity: item.quantity || 1, // ให้ quantity เริ่มต้นเป็น 1
        price: item.price || 0, // ให้ price เริ่มต้นเป็น 0
      }));
      setCartItems(parsedCart);
    }
  }, []);

  // add and reduce
  const updateQuantity = (id, action) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: action === "add" ? item.quantity + 1 : Math.max(item.quantity - 1, 1),
          }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Remove item from the cart
  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toLocaleString("en-US");
  };

  return (
    <div className="container mx-auto p-4">
      <Box sx={{flexGrow:1}}>
        <AppBar position="fixed" style={{backgroundColor:"black"}}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{mr:2}}
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" component="div" sx={{flexGrow:1}}>
              Your cart
            </Typography>
            
            <p>
              <strong>Total Price: {calculateTotalPrice()}$</strong>
            </p>
            <Link to={`/`}>
        <button className="rounded bg-green-500 px-3 py-1 text-white ml-2"><IoArrowBack />Back</button>
      </Link>
          </Toolbar>
        </AppBar>
      </Box>
      

      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="items-center justify-between border-b py-2" style={{marginTop:"50px"}}>
              <div className="Cart">
                <img src={item.image} alt={item.title} width="150px" height="150px" />
                <p style={{ fontSize: "20px" }}>{item.title}</p>
                <p style={{ fontSize: "14px" }}>Price: {item.price}$</p>
                <div className="flex items-center">
                  <button
                    className="rounded bg-red-500 px-3 py-1 text-white mr-2"
                    onClick={() => updateQuantity(item.id, "reduce")}
                  >
                    -
                  </button>
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}>{item.quantity}</p>
                  <button
                    className="rounded bg-green-500 px-3 py-1 text-white ml-2"
                    onClick={() => updateQuantity(item.id, "add")}
                  >
                    +
                  </button>
                  
                  <button
                    className="rounded bg-red-500 px-3 py-1 text-white ml-2"
                    onClick={() => handleRemove(item.id)}>
                    Delete
                  </button>
                </div>
              </div>
              
            </div>
          ))}
          <div style={{ marginTop: "20px", fontSize: "20px" }}>
            
          </div>
        </>
      ) : (
        <p style={{ fontSize: "20px", marginTop: "80px" }}>Your cart is empty.</p>
      )}
    </div>
  );
};

export default AddCart;