import React, { useState } from "react";
import { Col, Form, message, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";

import "./Register.css";

import COUNTRIES from "../../constants/countries.json";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    identificationType: "",
    identificationNumber: "",
    address: "",
    password: "",
    confirmPassword: "",
    countryCode: "",
  });

  const handleFormChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onFinish = async (e) => {
    e.preventDefault();
    console.log("submitted");
    try {
      dispatch(ShowLoading());
      const response = await RegisterUser(formValues);
      console.log(response);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        message.error("Please fill out the form before submitting.");
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="flex justify-center m-5">
      <div className="register-container card" style={{ margin: "10px" }}>
        <div id="register-form-header" className="flex-col justify-between ">
          <h1>MUBSWALLET - REGISTER</h1>
        </div>
        <hr id="line" />
        <form
          id="registration-form"
          className="items-center justify-center flex-ol"
          onSubmit={onFinish}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item>
                <input
                  placeholder="First Name"
                  onChange={handleFormChange}
                  name="firstName"
                  type="text"
                  value={formValues.firstName}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <input
                  placeholder="Last Name"
                  onChange={handleFormChange}
                  name="lastName"
                  type="text"
                  value={formValues.lastName}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item>
                <input
                  placeholder="Email"
                  onChange={handleFormChange}
                  value={formValues.email}
                  name="email"
                  type="text"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <input
                  placeholder="Mobile Number"
                  onChange={handleFormChange}
                  value={formValues.phoneNumber}
                  name="phoneNumber"
                  type="number"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item>
                <select onChange={handleFormChange} name="identificationType">
                  <option value="" disabled selected>
                    Identification Type
                  </option>
                  <option value="NATIONAL ID">National ID</option>
                  <option value="PASSPORT">Passport</option>
                  <option value="DRIVING LICENSE">Driving License</option>
                  <option value="SOCIAL CARD">
                    Social Security Card (SSN)
                  </option>
                </select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item>
                <input
                  placeholder="Identification Number"
                  onChange={handleFormChange}
                  name="identificationNumber"
                  value={formValues.identificationNumber}
                  type="text"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item>
                <textarea
                  placeholder="Address"
                  rows={5}
                  onChange={handleFormChange}
                  value={formValues.address}
                  name="address"
                  type="text"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <select
                  placeholder="Country"
                  onChange={handleFormChange}
                  value={formValues.country}
                  name="country"
                  type="text"
                >
                  <option value="" disabled selected>
                    Country
                  </option>
                  {COUNTRIES.map((country) => (
                    <option value={country.countryCode}>{country.name}</option>
                  ))}
                </select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item>
                <input
                  placeholder="Password"
                  onChange={handleFormChange}
                  value={formValues.password}
                  name="password"
                  type="password"
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item>
                <input
                  placeholder="Confirm Password"
                  onChange={handleFormChange}
                  value={formValues.confirmPassword}
                  name="confirmPassword"
                  type="password"
                />
              </Form.Item>
            </Col>
          </Row>

          <div className="flex-col items-start">
            <button
              id="submit-btn"
              onClick={onFinish}
              className="primary-contained-btn"
              type="submit"
            >
              Register
            </button>
            <h1
              className="text-xl underline already-member"
              onClick={() => navigate("/login")}
            >
              Already a member? Log in
            </h1>
          </div>
        </form>
      </div>
      <div
        className="flex go-back flex-start"
        onClick={() => navigate("/display")}
      >
        <i class="ri-close-line"></i>
      </div>
    </div>
  );
}

export default Register;
