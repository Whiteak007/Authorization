import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleSuccess, handleError } from "../utils";

// Dummy product data, moved from the backend
const dummyProducts = [
  {
    name: "Samsung Galaxy S24",
    price: 500000,
  },
  {
    name: "Vivo S1 Pro",
    price: 230000,
  },
];

function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Set the logged-in user from localStorage when the component mounts
  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  // Function to handle user logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User logged out successfully");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  // Function to get products from the local dummy data
  const getProducts = () => {
    // We now set the products state directly with the local data
    setProducts(dummyProducts);
    handleSuccess("Products loaded successfully!");
  };

  // Function to clear the products and hide them
  const hideProducts = () => {
    setProducts([]);
    handleSuccess("Products hidden successfully!");
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Welcome, {loggedInUser}</h1>
        {/* The logout button is now placed on its own line within the home-header, thanks to flex-direction: column */}
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <div className="products-section">
        {/* Buttons to get and hide products */}
        <div className="button-group">
          <button onClick={getProducts} className="get-products-button">
            Get Products
          </button>
          <button onClick={hideProducts} className="hide-products-button">
            Hide Products
          </button>
        </div>

        {/* Conditional rendering of products */}
        {products.length > 0 && (
          <div className="products-list">
            <h2>Available Products</h2>
            <div className="products-grid">
              {products.map((item, index) => (
                <div key={index} className="product-card">
                  <h3>{item.name}</h3>
                  <p>Price: ${item.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;