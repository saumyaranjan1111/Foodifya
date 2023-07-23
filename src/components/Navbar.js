import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";


export default function Navbar() {
  let data = useCart();
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-teal-darken-4">
        <div className="container-fluid">
          <Link className="fs-1 fst-italic navbar-brand" to="#">
            FoodiFya
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link
                  className="nav-link text-white text-decoration-none fs-5"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>

              {/* if authtoken is stored in the local storage, then the user is signed in, so we need to display the navbar based on this condition */}
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/myOrder"
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>

            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link className="btn bg-white text-primary mx-1" to="/login">
                  Login
                </Link>

                <Link
                  className="btn bg-white text-primary mx-1"
                  to="/createuser"
                >
                  SignUp
                </Link>
              </div>
            ) : (
              <div>
                <div 
                className="btn bg-white text-primary mx-1"
                onClick={()=>{setCartView(true)}}
                >
                  My Cart {"  "}
                  <Badge pill bg="danger">
                    {" "}
                    {data.length}{" "}
                  </Badge>
                </div>
                {/* if cartiview is true then render the Modal else dont render anything */}
                {cartView ? <Modal onClose={()=>setCartView(false)}>
                  <Cart/>
                </Modal> : null}
                <div
                  className="btn btn-danger text-white mx-1"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
