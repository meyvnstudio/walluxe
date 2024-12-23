import React, { useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import cover1 from "/image/mvz/01.jpg";
import cover2 from "/image/mvz/02.jpg";
import cover3 from "/image/mvz/03.jpg";
import cover4 from "/image/mvz/04.jpg";
import cover5 from "/image/mvz/05.jpg";
import cover6 from "/image/mvz/06.jpg";
import cover7 from "/image/mvz/07.jpg";
import cover8 from "/image/mvz/08.jpg";
import cover9 from "/image/mvz/09.jpg";

const movies = [
  {
    title: "Tomorrow 1",
    thumbnail: cover1,
    category: "Thrill",
    rating: 4.5,
    class: "Movie",
    tag: "Full movie",
    view: "#",
    download: "#",
  },
  {
    title: "Churchill War",
    thumbnail: cover2,
    category: "War",
    rating: 5,
    class: "Movie",
    tag: "Full movie",
    view: "#",
    download: "#",
  },
  {
    title: "Black Doves",
    thumbnail: cover3,
    category: "Action",
    rating: 5,
    class: "Movie",
    tag: "Full movie",
    view: "#",
    download: "#",
  },
  {
    title: "Ultimatum",
    thumbnail: cover4,
    category: "Thrill",
    rating: 4.5,
    class: "Movie",
    tag: "Full movie",
    view: "#",
    download: "#",
  },
  {
    title: "The children's train",
    thumbnail: cover5,
    category: "Thrill",
    rating: 4.5,
    class: "Movie",
    tag: "Full movie",
    view: "#",
    download: "#",
  },
  {
    title: "Mary 2024",
    thumbnail: cover6,
    category: "Thrill",
    rating: 4.5,
    class: "Movie",
    tag: "Full movie",
    view: "#",
    download: "#",
  },
  {
    title: "Polo 2024",
    thumbnail: cover7,
    category: "Thrill",
    rating: 4.5,
    class: "Movie",
    tag: "Full movie",
    view: "#",
    download: "#",
  },
  {
    title: "Jamie Foxx",
    thumbnail: cover8,
    category: "Thrill",
    rating: 4.5,
    class: "Movie",
    tag: "Full movie",
    view: "#",
    download: "#",
  },
  {
    title: "Makayla's Voice",
    thumbnail: cover9,
    category: "Thrill",
    rating: 4.5,
    class: "Movie",
    tag: "Full movie",
    view: "#",
    download: "#",
  },
];

function Continue() {
  const scrollRef = useRef(null);

  // Clone movies to allow infinite scrolling
  const extendedMovies = [...movies, ...movies];

  const scroll = (direction) => {
    const { current } = scrollRef;

    if (direction === "left") {
      current.scrollLeft -= 300;
    } else {
      current.scrollLeft += 300;
    }
  };

  const handleScroll = () => {
    const { current } = scrollRef;
    if (!current) return;

    // Reset scroll position for infinite effect
    if (current.scrollLeft === 0) {
      current.scrollLeft = current.scrollWidth / 2 - current.offsetWidth;
    } else if (current.scrollLeft >= current.scrollWidth / 2) {
      current.scrollLeft = current.scrollWidth / 4;
    }
  };

  useEffect(() => {
    const { current } = scrollRef;
    if (current) {
      current.scrollLeft = current.scrollWidth / 4; // Start in the middle for smooth effect
    }

    // Add scroll event listener for infinite loop
    current.addEventListener("scroll", handleScroll);
    return () => current.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="continue">
      <div className="container">
        <h2>Continue Watching</h2>
        <div className="slider-container">
          <button className="slider-btn left" onClick={() => scroll("left")}>
            <FaChevronLeft />
          </button>
          <div className="slider" ref={scrollRef}>
            {extendedMovies.map((movie, index) => (
              <div key={index} className="card">
                <img
                  src={movie.thumbnail}
                  alt={movie.title}
                  className="card-thumbnail"
                />
                <div className="card-content">
                  <h3>{movie.title}</h3>
                  <p>{movie.category}</p>
                  <p>Rating: {movie.rating}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="slider-btn right" onClick={() => scroll("right")}>
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Continue;
