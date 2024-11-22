import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {  editItem, fetchItem } from "../reducers/itemSlice";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { current } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { Grid, Box, Paper, styled, Card, CardHeader, AppBar, Toolbar, Typography, Button, IconButton, BottomNavigation, CardMedia, CardContent } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { IoArrowBack } from "react-icons/io5";

const ItemEdit = () => {
  const [itemData, setItemData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image:"",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentItem = useSelector((state) => state.item.currentItem);

  useEffect(() => {
    if (id) {
      dispatch(fetchItem(id));
    }
  }, [id, dispatch]);
  useEffect(()=>{
    if(currentItem){
      setItemData(currentItem);
    }
    },[currentItem]);
  
  
  const handleSave = async () => {
    const result = itemData.id
       await dispatch(editItem (itemData))

    if (result.success) {
      setMessage("User saved successfully.");
      setIsError(false);
      history.push("/"); // Redirect after successful save
    } else {
      setMessage(result.message || "An error occurred.");
      setIsError(true);
    }
  };

  const handleChange = (e) => {
    setItemData({ ...itemData, [e.target.name]: e.target.value });
  };

  return (
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
            Product Details
            </Typography>
            
            
            <Link to={`/`}>
        <button className="rounded bg-green-500 px-3 py-1 text-white ml-2"><IoArrowBack />Back</button>
      </Link>
          </Toolbar>
        </AppBar>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          
        >
        <Box sx={{margin:"80px", position:"center"}}>
        <Card sx={{ maxWidth: 800}}>
          <CardMedia
            sx={{ height:450}}
            image={itemData.image}
            title="img"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {itemData.title}
            </Typography>
            <Typography variant="body2" sx={{ color:'text.secondary'}}>
            <p style={{fontSize:"20px", marginBottom:"10px"}}>Category : {itemData.category}</p>
            description : {itemData.description}
              
            <p style={{fontSize:"20px",marginTop:"10px"}}>Price : {itemData.price}$</p>
              
            </Typography>
          </CardContent>
      </Card>
      </Box>
      </Grid>
      </Box>
      
  );
};

export default ItemEdit;