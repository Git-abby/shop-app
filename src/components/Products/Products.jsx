import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import InfiniteScroll from "react-infinite-scroll-component";
import Header from "../Header/Header";
import { useLocation } from "react-router-dom";

function Products() {
  const location = useLocation();
  const user = location.state?.user;
//   console.log("uid", user);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const productsPerPage = 10; // Number of products to load per page

  //   console.log("user, > ", uid);
  useEffect(() => {
    // Fetch products from the API
    fetchProducts(page);
  }, [page]);


  const fetchProducts = (page) => {
    axios
      .get(
        `https://fakestoreapi.com/products?limit=${productsPerPage}&offset=${
          (page - 1) * productsPerPage
        }`
      )
      .then((response) => {
        setProducts((prevProducts) => [...prevProducts, ...response.data]);
        setLoading(false);
        // Check if we have loaded all products
        if (response.data.length < productsPerPage) {
          setHasMore(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="border p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
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
                  {product.title}
                </h5>
                <p className="text-white font-medium mb-2">${product.price}</p>
                <p className="text-sm text-gray-200">
                  {product.description.length > 80
                    ? `${product.description.slice(0, 80)}...`
                    : product.description}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-600">
            No products found for "{searchQuery}".
          </p>
        )}
      </div>
    </div>
  );
}

export default Products;
