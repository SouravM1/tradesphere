import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="container p-5 mb-5 hero-section">
      <div className="row text-center">
        <img
          src="media/images/homeHero.png"
          alt="Hero Image"
          className="mb-5 hero-img"
        />
        <h1 className="mt-5">Invest in everything</h1>
        <p>
          Online platform to invest in stocks, derivatives, mutual funds, and
          more
        </p>
        <Link
          to="/signup"
          className="p-2 btn btn-primary fs-5 mb-5 hero-signup-btn"
          style={{ width: "100%", maxWidth: "320px", margin: "0 auto" }}
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default Hero;
