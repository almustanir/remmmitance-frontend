import React, {useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Form, message, Row } from "antd";
import { LoginUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";

import './login.css'

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    email:'',
    password:'',
  })

  const handleFormChange = (e) => {
    setFormValues((prev) => ({...prev, [e.target.name]: e.target.value}));
  }
  const onFinish = async (e) => {
    e.preventDefault();

    try {
      dispatch(ShowLoading());
      const response = await LoginUser(formValues);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = "/home";
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div id="fullscreen-login" className="bg-primary flex items-center justify-center h-screen">
      <div className="cards-container card flex justify-center items-center">
      <div className="card card-attached">
        <h1 className="attac-header">Welcome Back!</h1>
        <h2>Your MubsWallet Was Waiting For You.</h2>
      </div>
      <div id='login-form-container' className="card p-3">
        <div className="card-form flex-col items-center justify-evenly">
          <h1 class='form-header h-large'>MUBSWALLET - LOGIN</h1>
          <hr id='line'/>
          <form id='login-form' layout="vertical" onSubmit={onFinish}>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item >
                  <input placeholder='Your Email' onChange={handleFormChange} type="text" name="email" value={formValues.email} />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item id='input-field'>
                  <input placeholder="Your Password" onChange={handleFormChange} name="password" type="password" value={formValues.password} />
                </Form.Item>
              </Col>
            </Row>

            <button id='submit-btn' className="primary-contained-btn w-20" type="submit">
              Login
            </button>
            <h1
              className="text-sm underline mt-2"
              onClick={() => navigate("/register")}
            >
              Not a member , Click Here To Register
            </h1>
          </form>
        </div>
      </div>
      <div className="go-back" onClick={()=>navigate('/display')}><i class="ri-close-line"></i></div>
      </div>
    </div>
  );
}

export default Login;
