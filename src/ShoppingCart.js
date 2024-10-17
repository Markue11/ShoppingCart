import React, { useState } from 'react';
import { Container, TextField, Button, Typography, List, ListItem, ListItemText, Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './App.css';

function ShoppingCart() {
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  const [cart, setCart] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const addItem = () => {
    if (!item || !price) {
      setSnackbarMessage('Please enter both item and price.');
      setSnackbarOpen(true);
      return;
    }
    setCart([...cart, { item, price: parseFloat(price) }]);
    setItem('');
    setPrice('');
    setSnackbarMessage('Item added to cart!');
    setSnackbarOpen(true);
  };

  const removeItem = (index) => {
    setCart(cart.filter((_, i) => i !== index));
    setSnackbarMessage('Item removed.');
    setSnackbarOpen(true);
  };

  const totalPrice = cart.reduce((total, current) => total + current.price, 0);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container className="container">
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <TextField
        className="textField"
        label="Item"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        variant="outlined"
        fullWidth
      />
      <TextField
        className="textField"
        label="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        type="number"
        variant="outlined"
        fullWidth
      />
      <Button className="button" variant="contained" onClick={addItem}>
        Add Item
      </Button>

      {cart.length > 0 ? (
        <List style={{ marginTop: '20px' }}>
          {cart.map((cartItem, index) => (
            <ListItem key={index} className="listItem">
              <ListItemText className="listItemText" primary={`${cartItem.item}: $${cartItem.price.toFixed(2)}`} />
              <Button variant="outlined" color="secondary" onClick={() => removeItem(index)}>
                Remove
              </Button>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="h6" color="error" style={{ marginTop: '20px' }}>
          Your cart is empty.
        </Typography>
      )}

      <Typography className="totalPrice" variant="h5">
        Total Price: ${totalPrice.toFixed(2)}
      </Typography>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        className="snackbar"
      />
    </Container>
  );
}

export default ShoppingCart;
