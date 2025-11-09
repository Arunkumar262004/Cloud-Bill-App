import React, { useEffect, useState } from "react";
import "./Login-with-otp.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Login_with_otp = ({ base_url }) => {

const styled_css = {
  body: {
    background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
   
  }
}
const location = useLocation();
  const navigate = useNavigate();
  const [input, setIput] = useState({
    email: ''
  })


  function onsubmithandler(e) {
    e.preventDefault();

    const email_value = {
      "email": input.email
    }


    axios.post(base_url + '/send-otp', email_value).then((res) => {
      if (res.data.status == "success") {
        navigate('/Confirm-otp', { state: { message: "OTP Send Your Registered E-Mail Successfully" , type:"true" } })
      } else {
        navigate('/Login-with-otp', { state: { message: "EMail Not Registered" } })
      }
    });
  }

  function onchangehandler(e) {
    setIput({ ...input, [e.target.name]: e.target.value });
  }


  useEffect(()=>{
      if (!location.state) return; // 👈 safely exit if null

    if(location.state?.type === "otp_failed"){
      toast.success(location.state.message);
    }else{
      toast.error(location.state.message)
    }
  },[location.state])

  return (
    <div className="otp-wrapper" style={styled_css}>
      <div className="otp-card">
        <h3>OTP Verification</h3>
        <p>Enter your registered email to receive a one-time password.</p>

        <form method="POST" onSubmit={onsubmithandler}>
          <div className="otp-form-group text-start">
            <label htmlFor="email" className="otp-label fw-semibold">
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="otp-input"
              placeholder="Enter your email"
              onChange={onchangehandler}
              required
            />
          </div>

          <button type="submit" className="otp-btn mt-3">
            Send OTP
          </button>
        </form>
      </div>
       <div>
                <ToastContainer
                    pauseOnHover
                    autoClose={3000}
                    position="top-right"
                />
            </div>
    </div>
  );
};

export default Login_with_otp;
