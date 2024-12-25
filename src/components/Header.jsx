import React from "react";
import { Link } from "react-router-dom";

import { IoIosSearch } from "react-icons/io";
import { LuSettings2 } from "react-icons/lu";
import { RiMessage3Line } from "react-icons/ri";
import { CiBellOn } from "react-icons/ci";
import { CgMenuRight } from "react-icons/cg";

import "./../style/component.scss";
import logo from "/image/brand/logo.svg";
import profile from "/image/brand/profile.webp";

function Header() {
  return (
    <>
      <div className="header">
        <div className="container">
          <div className="content">
            <Link to={"/"} className="logo">
              <img src={logo} alt="Walluxe" />
            </Link>
            <div className="search">
              <button className="search-btn">
                <IoIosSearch />
              </button>
              <input type="text" placeholder="Search" />
              <button className="filter-search">
                <LuSettings2 />
              </button>
            </div>
            <div className="action">
              <ul>
                <li>
                  <RiMessage3Line />
                </li>
                <li>
                  <CiBellOn />
                </li>
                <li className="profile">
                  <img src={profile} alt="Profile Pic" />
                </li>
              </ul>
            </div>
            <div className="menu">
              <button>
                <CgMenuRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
