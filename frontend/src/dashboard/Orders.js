import React from "react";
import { Link } from "react-router-dom";

const Orders = () => {
  return (
    <div className="orders">
      <h3 className="title">Orders</h3>
      <div className="no-orders">
        <p>You haven&apos;t placed any orders today.</p>
        <Link to="/dashboard" className="btn btn-zerodha btn-sm">Get started</Link>
      </div>
    </div>
  );
};

export default Orders;
