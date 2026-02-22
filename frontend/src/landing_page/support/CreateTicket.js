import React from "react";

function CreateTicket() {
  const linkStyle = {
    textDecoration: "none",
    lineHeight: "2.2",
    display: "block",
    color: "#387ed1",
    fontSize: "15px",
  };

  return (
    <div className="container">
      <div className="row p-5 mt-5 mb-5">
        <h2 className="mb-4">To create a ticket, select a relevant topic</h2>

        {/* 1. Account Opening */}
        <div className="col-12 col-md-4 mb-5">
          <h5>
            <i className="fa fa-plus-circle me-2"></i>
            Account Opening
          </h5>

          <a href="#" style={linkStyle}>
            Online Account Opening
          </a>
          <a href="#" style={linkStyle}>
            Offline Account Opening
          </a>
          <a href="#" style={linkStyle}>
            Company, Partnership and HUF Account Opening
          </a>
          <a href="#" style={linkStyle}>
            NRI Account Opening
          </a>
          <a href="#" style={linkStyle}>
            Charges at TradeSphere
          </a>
          <a href="#" style={linkStyle}>
            TradeSphere IDFC FIRST Bank 3-in-1 Account
          </a>
          <a href="#" style={linkStyle}>
            Getting Started
          </a>
        </div>

        {/* 2. Your Zerodha Account */}
        <div className="col-12 col-md-4 mb-5">
          <h5>
            <i className="fa fa-user me-2"></i>
            Your TradeSphere Account
          </h5>

          <a href="#" style={linkStyle}>
            Login Credentials
          </a>
          <a href="#" style={linkStyle}>
            Account Modification and Segment Addition
          </a>
          <a href="#" style={linkStyle}>
            DP ID and bank details
          </a>
          <a href="#" style={linkStyle}>
            Your Profile
          </a>
          <a href="#" style={linkStyle}>
            Transfer and conversion of shares
          </a>
        </div>

        {/* 3. Trading and Markets */}
        <div className="col-12 col-md-4 mb-5">
          <h5>
            <i className="fa fa-bar-chart me-2"></i>
            Trading and Markets
          </h5>

          <a href="#" style={linkStyle}>
            Margin/leverage, Product and Order types
          </a>
          <a href="#" style={linkStyle}>
            Kite Web and Mobile
          </a>
          <a href="#" style={linkStyle}>
            Trading FAQs
          </a>
          <a href="#" style={linkStyle}>
            Corporate Actions
          </a>
          <a href="#" style={linkStyle}>
            Sentinel
          </a>
          <a href="#" style={linkStyle}>
            Kite API
          </a>
          <a href="#" style={linkStyle}>
            Pi and other platforms
          </a>
          <a href="#" style={linkStyle}>
            Stockreports+
          </a>
          <a href="#" style={linkStyle}>
            GTT
          </a>
        </div>

        {/* 4. Funds */}
        <div className="col-12 col-md-4 mb-5">
          <h5>
            <i className="fa fa-credit-card me-2"></i>
            Funds
          </h5>

          <a href="#" style={linkStyle}>
            Adding Funds
          </a>
          <a href="#" style={linkStyle}>
            Fund Withdrawal
          </a>
          <a href="#" style={linkStyle}>
            eMandates
          </a>
          <a href="#" style={linkStyle}>
            Adding Bank Accounts
          </a>
        </div>

        {/* 5. Console */}
        <div className="col-12 col-md-4 mb-5">
          <h5>
            <i className="fa fa-desktop me-2"></i>
            Console
          </h5>

          <a href="#" style={linkStyle}>
            Reports
          </a>
          <a href="#" style={linkStyle}>
            Ledger
          </a>
          <a href="#" style={linkStyle}>
            Portfolio
          </a>
          <a href="#" style={linkStyle}>
            60 Day Challenge
          </a>
          <a href="#" style={linkStyle}>
            IPO
          </a>
          <a href="#" style={linkStyle}>
            Referral Program
          </a>
        </div>

        {/* 6. Coin */}
        <div className="col-12 col-md-4 mb-5">
          <h5>
            <i className="fa fa-circle me-2"></i>
            Coin
          </h5>

          <a href="#" style={linkStyle}>
            Understanding Mutual Funds
          </a>
          <a href="#" style={linkStyle}>
            About Coin
          </a>
          <a href="#" style={linkStyle}>
            Buying and Selling through Coin
          </a>
          <a href="#" style={linkStyle}>
            Starting an SIP
          </a>
          <a href="#" style={linkStyle}>
            Managing your Portfolio
          </a>
          <a href="#" style={linkStyle}>
            Coin App
          </a>
          <a href="#" style={linkStyle}>
            Moving to Coin
          </a>
          <a href="#" style={linkStyle}>
            Government Securities
          </a>
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;
