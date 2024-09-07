import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import InfiniteScroll from 'react-infinite-scroll-component';

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const productsPerPage = 10; // Number of products to load per page

  useEffect(() => {
    // Fetch products from the API
    fetchProducts(page);
  }, [page]);

  const fetchProducts = (page) => {
    axios.get(`https://fakestoreapi.com/products?limit=${productsPerPage}&offset=${(page - 1) * productsPerPage}`)
      .then(response => {
        setProducts(prevProducts => [...prevProducts, ...response.data]);
        setLoading(false);
        // Check if we have loaded all products
        if (response.data.length < productsPerPage) {
          setHasMore(false);
        }
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  };

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container my-4">
      {/* Header with Search Bar */}
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2">Product List</h1>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-control w-50"
        />
      </header>

      {/* Infinite Scroll */}
      <InfiniteScroll
        dataLength={filteredProducts.length}
        next={() => setPage(prevPage => prevPage + 1)}
        hasMore={hasMore}
        loader={<div className="text-center mt-4">Loading more products...</div>}
        endMessage={<p className="text-center mt-4">No more products to show.</p>}
      >
        <div className="row">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="col-md-4 mb-4">
                <div className="card h-100">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="card-img-top"
                    style={{ height: '250px', objectFit: 'contain' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">${product.price}</p>
                    <p className="card-text text-muted small">{product.description}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center w-100">No products found for "{searchQuery}".</p>
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default App;
