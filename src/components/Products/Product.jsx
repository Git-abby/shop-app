import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

function Product({ props }) {
  const [product, setProduct] = useState("");
  const param = useParams();
  const id = param.id;
  const location = useLocation();
  const user = location.state?.user;
  console.log(user);

  const fetchProducts = useCallback(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        console.log(response.data);
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [id]);
  useEffect(() => {
    // Fetch products from the API
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="flex justify-center px-5 mt-4">
      <div
        key={product.id}
        className="relative bg-white border flex items-center justify-center rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer hover:peer-hover:scale-105 sm:flex-col">
        <img
          src={product.image}
          alt={product.title}
          className="w-[400px] h-[500px] object-cover scale-90 hover:scale-100 transition"
        />
        <div className="h-full w-full bg-gradient-to-t from-slate-800 to-transparent p-4 peer">
          <h5 className="text-4xl font-semibold text-slate-900 mb-5">
            {product.title}
          </h5>
          <p className="text-slate-700 font-medium text-2xl mb-2">
            ${product.price}
          </p>
          <p className="text-slate-600 font-medium text-xl mb-2">
            ${product.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Product;
