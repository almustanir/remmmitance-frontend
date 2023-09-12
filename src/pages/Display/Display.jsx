import React from "react";
import { useNavigate } from "react-router-dom";
import "./Display.css";

export default function () {
  const navigate = useNavigate();

  return (
    <div className="display-page">
      <nav className="nav-display flex items-center justify-between p-1">
        <section className="nav-header-display">
          <i
            className="ri-wallet-3-fill"
            style={{ fontSize: "rem", paddingRight: "20px" }}
          ></i>
          <span>MUBSWALLET</span>
        </section>
        <section className="btns-container justify-end">
          <button
            id="to-login-btn"
            className="primary-contained-btn w-20"
            type="submit"
            onClick={() => navigate("/login")}
          >
            {" "}
            Login{" "}
          </button>
        </section>
      </nav>
      <section
        className="download flex justify-center items-center"
        style={{
          backgroundColor: "black",
          color: "white !important",
          margin: "30px auto 0 auto",
          gap: "20px",
          padding: "20px",
        }}
      >
        <p>
          <i
            style={{ color: "white", fontSize: "1.5rem" }}
            className="ri-google-play-line"
          ></i>
        </p>
        <p style={{ color: "white" }}>
          Download the App from Google Play Store{" "}
        </p>
      </section>
      <section className="dealings-bg">
        <span>Security Ensured</span>
      </section>
      <section className="text-sec">
        <span>
          Wherever you shop online worldwide, a Mubswallet account lets you
          check out safer, faster and easier. That’s why we are accepted in over
          200 markets and trusted by over 346 million accounts.​
        </span>
      </section>
      <button
        type="button"
        onClick={() => navigate("/register")}
        className="primary-contained-btn signup-btn"
      >
        Sign Up For Free
      </button>
      <section className="features flex-col items-center">
        <div className="feature feature1 flex-col justify-between items-center p-2">
          <i className="ri-global-line feature-img"></i>
          <span className="feature-text">
            Access your money from anywhere in the world.
          </span>
        </div>
        <div className="feature feature2 flex-col justify-between items-center p-2">
          <i class="ri-secure-payment-line feature-img"></i>
          <span className="feature-text">Money security is ensured!</span>
        </div>
      </section>
      <section className="coins flex-col justify-center items-center">
        <p>Trusted by over 20 Million People With their Decentralised Coins</p>
        <img
          src="https://www.newsbtc.com/wp-content/uploads/2020/09/okex-8-DeFi-Tokens.jpg"
          alt=""
          srcset=""
          width="80%"
        />
      </section>
      <footer className="display-footer">
        <a target="_blank" href="mailto:olajidemubarak01@gmail.com">
          <i className="ri-mail-line"></i>
        </a>
        <a
          target="_blank"
          href="https://instagram.com/inyassolajidemubarak01?utm_source=qr&igshid=ZDc4ODBmNjlmNQ%3D%3D"
          className="socials"
        >
          <i className="ri-instagram-line"></i>
        </a>
        <a
          target="_blank"
          href="https://www.facebook.com/mubarak.inyass.73?mibextid=ZbWKwL"
          className="socials"
        >
          <i class="ri-facebook-fill"></i>
        </a>
        <a target="_blank" href="https://www.google.com" className="socials">
          <i class="ri-linkedin-box-fill"></i>
        </a>
        <a
          target="_blank"
          href="https://twitter.com/Almustanurbilla?t=wZ2O9kw9GhjBW3awrMhKqA&s=09"
          className="socials"
        >
          <i class="ri-twitter-line"></i>
        </a>
        <hr />
        <p>MubsWallet @2023 Inc.</p>
        <p>All rights reserved.</p>
      </footer>
      {/* <img src="https://w7.pngwing.com/pngs/186/207/png-transparent-blockchain-cryptocurrency-initial-coin-offering-computer-icons-decentralization-blockchain-miscellaneous-purple-angle.png" alt="" height='100px' width='100px'/> */}
    </div>
  );
}
