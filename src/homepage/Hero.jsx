import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";

import { BiSolidStar, BiSolidStarHalf, BiStar } from "react-icons/bi";
import { FaPlay } from "react-icons/fa6";
import { MdOutlineFileDownload } from "react-icons/md";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const movies = [
  {
    thumbnail: "/image/cover/01.jpg",
    title: "The Fire Inside 2024",
    description:
      "The story of Claressa 'T-Rex' Shields, a boxer from Flint, Michigan who trained to become the first woman in her country's history to win an Olympic gold medal in the sport.",
    rating: 8,
    tag: ["Drama"],
    mark: "🔥 Now Popular",
    download: "#",
    watch: "#",
  },
  {
    thumbnail: "/image/cover/02.jpg",
    title: "Nickel Boys",
    description:
      "Based on the Pulitzer Prize-winning novel by Colson Whitehead, 'Nickel Boys' chronicles the powerful friendship between two young African-American men navigating the harrowing trials of reform school together in Florida.",
    rating: 4,
    tag: ["Drama"],
    mark: "🔥 Now Popular",
    download: "#",
    watch: "#",
  },
  {
    thumbnail: "/image/cover/03.jpg",
    title: "Red One",
    description:
      "After Santa Claus is kidnapped, the North Pole's Head of Security must team up with a notorious hacker in a globe-trotting, action-packed mission to save Christmas.",
    rating: 3.5,
    tag: ["Action", "Adventure"],
    mark: "🔥 Now Popular",
    download: "#",
    watch: "#",
  },
  {
    thumbnail: "/image/cover/04.jpg",
    title: "My Old Ass 2024",
    description:
      "A mushroom trip brings free-spirited Elliott face-to-face with her 39-year-old self. But when Elliott's 'old ass' delivers warnings to her younger self, Elliott realizes she has to rethink everything about her family, life and love.",
    rating: 4.8,
    tag: ["Comedy"],
    mark: "🔥 Now Popular",
    download: "#",
    watch: "#",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  const sliderRef = useRef(null); // To manually control the slider
  const autoplaySpeed = 10000; // Slider autoplay speed in milliseconds

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed,
    fade: true,
    beforeChange: (_, next) => {
      setCurrentSlide(next); // Update slide index
      resetProgress(); // Reset progress on slide change
    },
  };

  const resetProgress = () => {
    clearInterval(intervalRef.current);
    setProgress(0); // Reset progress bar
    startProgress();
  };

  const startProgress = () => {
    const step = 100 / (autoplaySpeed / 100); // Update progress every 100ms
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intervalRef.current);
          return 100;
        }
        return prev + step;
      });
    }, 100);
  };

  const renderStars = (rating) => {
    const stars = [];
    const rate = rating / 2;
    for (let i = 1; i <= 5; i++) {
      if (i <= rate) stars.push(<BiSolidStar key={i} />);
      else if (i - 0.5 === rate) stars.push(<BiSolidStarHalf key={i} />);
      else stars.push(<BiStar key={i} />);
    }
    return stars;
  };

  useEffect(() => {
    startProgress(); // Start progress when component mounts
    return () => clearInterval(intervalRef.current); // Cleanup on unmount
  }, []);

  return (
    <div className="hero">
      <div className="container">
        <div className="content">
          <div className="hero-slider">
            <Slider ref={sliderRef} {...settings}>
              {movies.map((movie, index) => (
                <div key={index} className="slide">
                  <img src={movie.thumbnail} alt={movie.title} />
                  <div className="details">
                    <span className="tag">{movie.mark}</span>
                    <h2>{movie.title}</h2>
                    <p className="shorten" title={movie.description}>
                      {movie.description}
                    </p>
                    <div className="rating">{renderStars(movie.rating)}</div>
                    <div className="actions">
                      <a href={movie.watch} className="watch">
                        <span>
                          <FaPlay /> Watch Now
                        </span>
                      </a>
                      <a href={movie.download} className="download">
                        <span>
                          <MdOutlineFileDownload /> Download
                        </span>
                      </a>
                      <a className="more">
                        <span>•••</span>
                      </a>
                    </div>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
