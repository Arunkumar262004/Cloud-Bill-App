import axios from "axios";
import React from "react";
import { Outlet } from "react-router-dom";

const CompactSidebar = ({ base_url }) => {

  function Log_out_session(e) {
    e.preventDefault();
    axios.post(base_url + '/logout').then((res) => {
      if (res.data.status == "logged_out") {
        window.location.href = "/login";
      }
    })
  }
  return (
    <div>
      {/* Top Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
        <div className="container-fluid">
          <a className="navbar-brand fs-6" href="#">
            {/* {{ Auth ::user()->usertype()}} */}
            Cloud-Bill
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  <i className="bi bi-person-circle"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Sidebar + Main Content */}
      <div className="d-flex" style={{ minHeight: "calc(100vh - 56px)" }}>
        {/* Sidebar */}
        <aside
          className="bg-dark text-white d-flex flex-column align-items-center py-3"
          style={{ width: "40px" }}
        >
          <a href="/" className="text-white mb-3 fs-5">
            <i className="bi bi-pie-chart-fill"></i>
          </a>
          <a href="/Bill" className="text-white mb-3 fs-5">
            <i className="bi bi-cart-check"></i>
          </a>
          <a href="#" className="text-white mb-3 fs-5">
            <i className="bi bi-people"></i>
          </a>
          <a href="#" className="text-white mb-3 fs-5">
            <i className="bi bi-bar-chart-fill"></i>
          </a>

          {/* Logout at bottom */}
          <a href="" onClick={Log_out_session} className="text-white mt-auto mb-3 fs-5">
            <i className="bi bi-box-arrow-right"></i>
          </a>
        </aside>
        <Outlet />
        {/* Main Content */}

      </div>
    </div>
  );
};

export default CompactSidebar;
