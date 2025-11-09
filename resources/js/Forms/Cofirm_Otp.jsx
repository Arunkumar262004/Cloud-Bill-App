import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import axios from "axios";
const Confirm_otp = ({base_url}) => {


    const location = useLocation();
    const navigate = useNavigate();
    const [input, setIput] = useState({
        email: '',
        otp: ''
    })
    function onchangehandler(e) {
        setIput({ ...input, [e.target.name]: e.target.value });
    }

    
  function onsubmithandler(e) {
    e.preventDefault();

    const email_value = {
      "email": input.email,
      "otp": input.otp

    }


    axios.post(base_url + '/confirm-otp', email_value).then((res) => {
      if (res.data.status == "success") {
        navigate('/dashboard');
      } else {
        navigate('/Login-with-otp', { state: { message: "Something Went Wrong" , type:"otp_failed"} })
      }
    });
  }

    useEffect(() => {
        if (!location.state) return; // 👈 safely exit if null

        if (location.state?.type === "true") {
            toast.success(location.state.message);
        } else {
            toast.error(location.state.message)
        }
    }, [location.state])

    return (

        <div className="otp-card">
            <form method="POST" onSubmit={onsubmithandler}>
                <div className=" " style={{alignItems: ""}}>
                    <label for="" className="">E-Mail</label>
                    <input className="form-control" type="email" name="email"
                        onChange={onchangehandler} required
                    />
                </div>
                <div className="">
                    <label for="" className="">Otp</label>
                    <input className="form-control" type="text" 
                        onChange={onchangehandler} name="otp" required
                     />
                </div>

                <div className=" mt-2">
                    <button type="submit" className="otp-btn mt-3" >Login</button>
                </div>
            </form>
            <div>
                <ToastContainer
                    pauseOnHover
                    autoClose={3000}
                    position="top-right"
                />
            </div>
        </div>
    );
}

export default Confirm_otp;