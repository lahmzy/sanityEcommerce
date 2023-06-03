import React from "react";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";

import Cart from "./Cart";
import { useStateContext } from "../context/stateContext";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Ultra Modern eCommerce</Link>
      </p>

      <button className="cart-icon" onClick={() => setShowCart(prev =>!prev)}>
        <AiOutlineShoppingCart />
        <span className="cart-item-qty">
          {totalQuantities}
        </span>
      </button>
      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
