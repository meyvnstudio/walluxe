import React from "react";

import { FaXTwitter } from "react-icons/fa6";
import { TfiYoutube } from "react-icons/tfi";
import { LuInstagram, LuFacebook } from "react-icons/lu";

import "./../style/component.scss";
import img1 from "/image/portrait/1.webp";
import img2 from "/image/portrait/2.webp";
import img3 from "/image/portrait/3.webp";
import img4 from "/image/portrait/4.webp";
import { Link } from "react-router-dom";

const contacts = [
  {
    title: "Marketers",
    thumbnail: img1,
  },
  {
    title: "Developers",
    thumbnail: img2,
  },
  {
    title: "Manager",
    thumbnail: img3,
  },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <div className="footer">
        <div className="container">
          <div className="content">
            <div className="top">
              <div className="company">
                <ul>
                  <li>
                    <Link to={""}>Movies</Link>
                  </li>
                  <li>
                    <Link to={""}>Series</Link>
                  </li>
                  <li>
                    <Link to={""}>Podcast</Link>
                  </li>
                  <li className="op">
                    <Link to={""}>Who we are?</Link>
                  </li>
                  <li className="op">
                    <Link to={""}>Reach out.</Link>
                  </li>
                  <li className="op">
                    <Link to={""}>Terms of Use</Link>
                  </li>
                </ul>
              </div>
              <div className="help">
                <div className="left">
                  <h2>
                    OOoh! Wanna talk with us? <br />
                    we've got you.
                  </h2>
                  {contacts.map((who, index) => (
                    <div className="box" key={index}>
                      <div className="img">
                        <img src={who.thumbnail} alt={who.title} />
                      </div>
                      <div className="name">{who.title}</div>
                      <div className="select"></div>
                    </div>
                  ))}
                </div>
                <div className="right">
                  <div className="card">
                    <p>
                      We took care of the boring stuff, from ui design,
                      deployment, to DevOps so tht you can focus on the fun and
                      impactful work.
                    </p>
                    <div className="user">
                      <img src={img4} alt="" />
                      <p>CEO of Meyvn Agency</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom">
          <div className="container">
            <div className="content">
              <div className="copy">
                <p>walluxe • &copy; {year}</p>
              </div>
              <div className="social">
                <ul>
                  <li>
                    <a href="">
                      <TfiYoutube />
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <LuInstagram />
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <LuFacebook />
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <FaXTwitter />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
