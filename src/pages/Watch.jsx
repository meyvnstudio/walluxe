import React, { useState, useEffect } from "react";
import { GiBleedingEye } from "react-icons/gi";
import { TbDownload, TbShare } from "react-icons/tb";
import { LuThumbsDown, LuThumbsUp } from "react-icons/lu";

import "./../style/watch.scss";
import giti from "/image/abasobanuzi/giti.jpg";
import saga from "/image/abasobanuzi/saga.jpeg";
import rocky from "/image/abasobanuzi/rocky.jpg";
import didier from "/image/abasobanuzi/didier.jpg";
import gaheza from "/image/abasobanuzi/gaheza.jpeg";
import sankara from "/image/abasobanuzi/sankara.jpg";

import cover1 from "/image/mvz/01.jpg";
import cover2 from "/image/mvz/02.jpg";
import cover3 from "/image/mvz/03.jpg";
import cover4 from "/image/mvz/04.jpg";
import cover5 from "/image/mvz/05.jpg";
import cover6 from "/image/mvz/06.jpg";
import cover7 from "/image/mvz/07.jpg";
import cover8 from "/image/mvz/08.jpg";
import cover9 from "/image/mvz/09.jpg";

const movie = [
  {
    title: "Jumong EP 1",
    link: "https://iplayerhls.com/e/ycaohn0wypsn",
    download: "https://iplayerhls.com/f/ws8muzqi7xcr_n",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt dolorum debitis sit nulla saepe molestias, iusto odio, dignissimos autem dolor qui laudantium maxime recusandae doloremque sapiente earum maiores, excepturi eligendi?               Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt impedit id, sed at ut, repudiandae omnis, magnam rerum quibusdam assumenda voluptatum! Repellendus cumque distinctio quasi, molestias perspiciatis neque reiciendis aut. Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores suscipit quasi natus necessitatibus labore fugit hic ducimus error similique, cum vel eaque consectetur expedita quisquam illo doloribus assumenda veniam id!",
  },
];

const transcriptor = [
  {
    img: giti,
    title: "Junior Giti",
    film: 13,
  },
  {
    img: saga,
    title: "Saga Mwiza",
    film: 22,
  },
  {
    img: rocky,
    title: "Rocky Kimomo",
    film: 36,
  },
  {
    img: didier,
    title: "Didier",
    film: 6,
  },
  {
    img: sankara,
    title: "Sankara Da Primier",
    film: 13,
  },
  {
    img: gaheza,
    title: "Gaheza Simba",
    film: 23,
  },
];

const movies = [
  {
    title: "Jumong EP 1",
    link: "https://iplayerhls.com/e/ycaohn0wypsn",
    thumbnail: cover1,
    trend: true,
    length: "59m",
    date: "Jan 01, 2025",
  },
  {
    title: "Jumong EP 1",
    link: "https://iplayerhls.com/e/ycaohn0wypsn",
    thumbnail: cover2,
    trend: true,
    length: "1h02m",
    date: "Jan 01, 2025",
  },
  {
    title: "Jumong EP 1",
    link: "https://iplayerhls.com/e/ycaohn0wypsn",
    thumbnail: cover3,
    trend: false,
    length: "2h00m",
    date: "Jan 01, 2025",
  },
  {
    title: "Jumong EP 1",
    link: "https://iplayerhls.com/e/ycaohn0wypsn",
    thumbnail: cover4,
    trend: true,
    length: "1h42m",
    date: "Jan 01, 2025",
  },
  {
    title: "Jumong EP 1",
    link: "https://iplayerhls.com/e/ycaohn0wypsn",
    thumbnail: cover5,
    trend: false,
    length: "52m",
    date: "Jan 01, 2025",
  },
  {
    title: "Jumong EP 1",
    link: "https://iplayerhls.com/e/ycaohn0wypsn",
    thumbnail: cover6,
    trend: true,
    length: "1h11m",
    date: "Jan 01, 2025",
  },
  {
    title: "Jumong EP 1",
    link: "https://iplayerhls.com/e/ycaohn0wypsn",
    thumbnail: cover8,
    trend: false,
    length: "1h03m",
    date: "Jan 01, 2025",
  },
  {
    title: "Jumong EP 1",
    link: "https://iplayerhls.com/e/ycaohn0wypsn",
    thumbnail: cover9,
    trend: false,
    length: "1h12m",
    date: "Jan 01, 2025",
  },
  {
    title: "Jumong EP 1",
    link: "https://iplayerhls.com/e/ycaohn0wypsn",
    thumbnail: cover7,
    trend: true,
    length: "1h02m",
    date: "Jan 01, 2025",
  },
];

const Watchpage = () => {
  const [views, setViews] = useState(0);
  const startTime = new Date("2024-12-26T00:00:00").getTime();
  const viewsPerSecond = 1200 / 86400;

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const elapsedTime = Math.max((currentTime - startTime) / 1000, 0);
      const totalViews = Math.floor(elapsedTime * viewsPerSecond);
      setViews(totalViews);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatViews = (views) => {
    if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`;
    if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K`;
    return views.toString();
  };

  const latestMovies = movies
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 8);

  return (
    <div className="watch">
      <div className="container">
        <div className="content">
          <div className="main">
            {movie.map((movie, index) => (
              <div key={index} className="video">
                <div
                  className="frame"
                  style={{ position: "relative", overflow: "hidden" }}
                >
                  <iframe
                    src={movie.link}
                    frameBorder="0"
                    allowFullScreen
                    title={movie.title}
                    style={{
                      width: "100%",
                      height: "360px",
                    }}
                  ></iframe>
                </div>
                <h2>{movie.title}</h2>
                <div className="actions">
                  <button
                    onClick={() => window.open(movie.download, "_blank")}
                    className="btn"
                  >
                    <TbDownload /> Download
                  </button>
                  <button
                    className="btn"
                    onClick={() => navigator.clipboard.writeText(movie.link)}
                  >
                    <TbShare /> Share
                  </button>
                  <button>
                    <GiBleedingEye /> {formatViews(views)}
                  </button>
                </div>
                <div className="descr">
                  <p className="line4">{movie.description}</p>
                </div>
              </div>
            ))}

            <div className="comment">
              <h2>Leave a comment</h2>
              <form>
                <input
                  type="text"
                  placeholder="Name"
                  required
                  style={{ margin: "10px 0" }}
                />
                <textarea
                  placeholder="Message"
                  required
                  style={{ width: "100%", height: "100px" }}
                ></textarea>
                <button type="submit">Submit</button>
              </form>
            </div>

            <div className="latest">
              <h2>Latest Movies</h2>
              <div className="div">
                {latestMovies.map((movie, index) => (
                  <div className="movie">
                    <img src={movie.thumbnail} alt={movie.title} />
                    <p>{movie.length}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="sidebar">
            <div className="trending">
              <h2>🔥 Trending</h2>
              {movies
                .filter((mvz) => mvz.trend)
                .map((mvz, index) => (
                  <div key={index} className="trending-item">
                    <img
                      src={mvz.thumbnail}
                      alt={mvz.title}
                      style={{ width: "100%", borderRadius: "10px" }}
                    />
                    <div className="details">
                      <h3>{mvz.title}</h3>
                      <div className="row">
                        <div className="date">{mvz.date}</div>
                        <div className="length">{mvz.length}</div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="cta">
              <h2>Don't miss out!</h2>
              <button>Subscribe Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watchpage;
