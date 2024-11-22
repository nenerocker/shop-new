import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchItems, deleteItem } from "../reducers/itemSlice";
import { Grid, Box, Paper, styled, Card, CardHeader, AppBar, Toolbar, Typography, Button, IconButton, CardMedia, CardActionArea } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { FaCartArrowDown } from "react-icons/fa";//cart icon
import { CiCircleMore } from "react-icons/ci";//more info icon
import { MdDelete } from "react-icons/md";//delete icon




const ItemList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.item.items);

  // State for cart items
  const [cart, setCart] = useState([]);

  // Load cart data from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    try {
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage:", error);
      setCart([]); // เซ็ต cart ให้เป็น array ว่างถ้าการ parse ล้มเหลว
    }
  }, []);

  // Save cart data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(1234);
    
  }, [cart]);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  
  // Add item to the cart
  const addToCart = (cart) => {
    setCart((prevCart) => {
      // Prevent duplicates
      const isAlreadyInCart = prevCart.some((cartItem) => cartItem.id === cart.id);
      if (isAlreadyInCart) {
        return prevCart;
      }
      return [...prevCart, cart];
    });
  };

//header
  return (
    <div style={{}}>
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
              Product List
            </Typography>
            <Link to="/cart">
        <button className="rounded bg-green-500 px-3 py-1 text-white ml-2"><FaCartArrowDown />Your Cart ({cart.length})</button>
      </Link>
          </Toolbar>
        </AppBar>
      <Paper sx={(theme)=>({
        p:2,
        margin:'auto',
        maxWidth:'auto',
        flexGrow:1,
        backgroundColor:'#fff',
        ...theme.applyStyles('dark',{backgroundColor:'#1A2027',
        }),
      })}>

    <Grid 
    container 
    spacing={2} 
    direction="row" 
    alignItems="center"
    sx={{alignItems:"flex-end", width:"100%",marginTop:"50px",backgroundColor:"white"}}
    >
      {items.map((item) => (
        <Grid item xs={3} >
          <Card className={"MuiElevatedCard--01"} style={{height:"100%",backgroundColor:"#d1d1d1"}} >
            <CardMedia 
              style={{display:"flex",justifyContent:"center"}}
              sx={{height:400}}
              image={item.image}
              title={item.title}/>
              <Typography style={{margin: "0 15px"}}>
                <p style={{fontSize:"12px",marginTop:"15pxS"}}>{item.title}</p>
              </Typography>
              <p style={{margin: "0 15px",fontSize:"10px"}}>Category : {item.category}</p>
              <p style={{margin: "0 15px" , fontStyle:"italic"}}>Price : {item.price}$</p>
              
                <Grid style={{ display: "flex",marginBottom:"15px",marginTop:"15px",justifyContent:"flex-end",margin:"15px"}}> 
                  
                <button
                  
                  className=" rounded-full bg-red-500 px-3 py-1 ml-3 text-white"
                  style={{height:"40px"}}
                  onClick={() => dispatch(deleteItem(item.id))}
                >
                  <MdDelete />
                </button>
                <Link to={`/edit/${item.id}`}>
              <button className="rounded-full bg-blue-500 px-3 py-1 ml-2 text-white" style={{height:"40px"}}><CiCircleMore/></button>
            </Link>
                <button
                  className="rounded-full bg-green-500 px-3 py-1 ml-3 text-white"
                  style={{height:"40px"}}
                  onClick={() => addToCart(item)}
                >
                  <FaCartArrowDown />
                  
                </button>
                </Grid>
          </Card>
        </Grid>

        
        
      ))}
      </Grid>
      
      </Paper>
      </Box>

      
    </div>
  );
};

export default ItemList;
