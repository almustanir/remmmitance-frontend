import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./profile.css";
import PageTitle from "../../components/PageTitle";
import { Link } from "react-router-dom";

import COUNTRIES from "../../constants/countries.json";

function Profile() {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const userCountry = user.countryInfo;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1
          className="p-2 m-0 text-3xl uppercase"
          style={{ textAlign: "center", color: "black" }}
        >
          Profile
        </h1>
        <div className="link-home-page">
          <Link to="/home">
            <button>Home Page</button>
          </Link>
        </div>
      </div>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrJAH_Ug2f67FkrmwBJKZvzqzd-ZLnTeK6Rp6jYAw&s"
        alt="Girl in a jacket"
      />
      <div className="profile">
        <div class="input-group">
          <label class="label">Last Name : </label>
          <input
            autocomplete="off"
            name="Email"
            id="Email"
            class="input"
            value={user.lastName}
          />
        </div>
        <div class="input-group">
          <label class="label">First Name : </label>
          <input
            autocomplete="off"
            name="Email"
            id="Email"
            class="input"
            value={user.firstName}
          />
        </div>
        <div class="input-group">
          <label class="label">Phone Number : </label>
          <input
            autocomplete="off"
            name="Email"
            id="Email"
            class="input"
            value={user.phoneNumber}
          />
        </div>

        <div class="input-group">
          <label class="label">Email Address : </label>
          <input
            autocomplete="off"
            name="Email"
            id="Email"
            class="input"
            type="email"
            value={user.email}
          />
        </div>
        <div class="input-group">
          <label class="label">Identification Type : </label>
          <input
            autocomplete="off"
            name="Email"
            id="Email"
            class="input"
            type="email"
            value={user.identificationType}
          />
        </div>
        <div class="input-group">
          <label class="label">Identification Number : </label>
          <input
            autocomplete="off"
            name="Email"
            id="Email"
            class="input"
            type="email"
            value={user.identificationNumber}
          />
        </div>
        <div class="input-group">
          <label class="label">Country : </label>
          <input
            autocomplete="off"
            name="Country"
            id="Country"
            class="input"
            type="text"
            readOnly
            value={`${userCountry.flag} ${userCountry.name}`}
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
