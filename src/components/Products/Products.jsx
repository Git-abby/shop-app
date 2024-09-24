import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate } from "react-router-dom";

function Products() {
  const location = useLocation();
  const user = location.state?.user;
  // console.log(user);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const fetchProducts = useCallback((e) => {
    axios
      .get(`https://fakestoreapi.com/products`)
      .then((response) => {
        setProducts([...response.data]);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch products from the API
    fetchProducts();
  }, [fetchProducts]);

  const onSubmitToProduct = (id) => {
    console.info("onSubmitToProduct called with id:", id);
    navigate(`/product/${id}`, { state: { user } });
    console.info(`User redirected to /product/${id}`);
  };

  return (
    <div className="border p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer hover:peer-hover:scale-105">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover scale-90 hover:scale-100 transition"
            />
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-4 peer">
              <h5 className="text-lg font-semibold text-white mb-1">
                <button onClick={() => onSubmitToProduct(product.id)}>
                  {product.title}
                </button>
              </h5>
              <p className="text-white font-medium mb-2">${product.price}</p>
              <p className="text-sm text-gray-200">
                {product.description.length > 80
                  ? `${product.description.slice(0, 80)}...`
                  : product.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
