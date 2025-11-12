import axios from "axios";
import React from "react";
import { Outlet, Link } from "react-router-dom";

const CompactSidebar = ({ base_url }) => {

  function Log_out_session(e) {
    e.preventDefault();
    axios.post(base_url + '/logout').then((res) => {
      console.log(res.data);
      if (res.data.status === "logged_out") {
        window.location.href = "/login";
      }
    }).catch((err) => {
      console.error(err.response.data);
    });
  }

  return (
    <div>
      {/* Top Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand fs-6" href="#">Cloud-Bill</a>
        </div>
      </nav>

      {/* Sidebar + Main Content */}
      <div className="d-flex" style={{ minHeight: "calc(100vh - 50px)" }}>
        {/* Sidebar */}
        <aside className="bg-dark text-white d-flex flex-column align-items-center py-3" style={{ width: "40px" }}>
          <Link to="/dashboard" className="text-white mb-3 fs-5">
            <i className="bi bi-pie-chart-fill"></i>
          </Link>
          <Link to="/Bill" className="text-white mb-3 fs-5">
            <i className="bi bi-cart-check"></i>
          </Link>
          <Link to="#" className="text-white mb-3 fs-5">
            <i className="bi bi-people"></i>
          </Link>
          <Link to="#" className="text-white mb-3 fs-5">
            <i className="bi bi-bar-chart-fill"></i>
          </Link>

          {/* Logout */}
          <a href="" onClick={Log_out_session} className="text-white mt-auto mb-3 fs-5">
            <i className="bi bi-box-arrow-right"></i>
          </a>
        </aside>

        {/* Main Content */}
        <div className="flex-grow-1 p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CompactSidebar;
