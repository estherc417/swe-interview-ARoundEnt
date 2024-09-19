import React from 'react';
import axios from 'axios';  
import { useEffect, useState } from "react";
import { Container, Grid, Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


const ProductList = () => {
  const [products, setProducts] = useState([]);
  
  //implement the get products function with backend call
  const fetchProducts =  () => {
      axios.get(`http://localhost:5000/api/products/`)
      .then((response) => {
        //console.log(response.data);
        setProducts(response.data); 
        //console.log(response.data);
      })
      .catch((error) => {
        console.log('Could not fetch products', error );
  })  
 
  };

  //implement the delete function for every product id that matches param id
  const handleDelete = (id) => {
      axios.delete(`http://localhost:5000/api/products/${id}/`)
      .then((response) => {
        console.log(response.data);
        setProducts(products.filter((product) => product.id !== id)); 
      })
      .catch((error) => {
        console.log('Could not delete products', error );
  })  
    
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  
  const imageTest = 'https://picsum.photos/200/200';

  return (
    <Container>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={product.imageUrl || imageTest}
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {product.description}
                </Typography>
                <Typography variant="h6" color="textPrimary">
                  ${product.price}
                </Typography>
                <IconButton onClick={() => handleDelete(product.id)} color="secondary">
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;