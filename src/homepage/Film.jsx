import React, { useState } from "react";

import { LuPlus } from "react-icons/lu";
import { CiBoxList, CiGrid42, CiSearch } from "react-icons/ci";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

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
    year: 2024,
    category: "Movies",
    thumbnail: cover1,
    watch: "#",
    download: "#",
    trailer: "#",
    rating: 8.2,
  },
  {
    title: "Churchill War",
    year: 2020,
    category: "Movies",
    thumbnail: cover2,
    watch: "#",
    download: "#",
    trailer: "#",
    rating: 8.2,
  },
  {
    title: "Black Doves",
    year: 2023,
    category: "Movies",
    thumbnail: cover3,
    watch: "#",
    download: "#",
    trailer: "#",
    rating: 8.2,
  },
  {
    title: "Ultimatum",
    year: 2020,
    category: "Movies",
    thumbnail: cover4,
    watch: "#",
    download: "#",
    trailer: "#",
    rating: 8.2,
  },
  {
    title: "The children's train",
    year: 2022,
    category: "Children",
    thumbnail: cover5,
    watch: "#",
    download: "#",
    trailer: "#",
    rating: 8.2,
  },
  {
    title: "Mary",
    year: 2024,
    category: "Movies",
    thumbnail: cover6,
    watch: "#",
    download: "#",
    trailer: "#",
    rating: 8.2,
  },
  {
    title: "Polo",
    year: 2024,
    category: "Animation",
    thumbnail: cover7,
    watch: "#",
    download: "#",
    trailer: "#",
    rating: 8.2,
  },
  {
    title: "Jamie Foxx",
    year: 2019,
    category: "Movies",
    thumbnail: cover8,
    watch: "#",
    download: "#",
    trailer: "#",
    rating: 8.2,
  },
  {
    title: "Makayla's Voice",
    year: 2022,
    category: "Series",
    thumbnail: cover9,
    watch: "#",
    download: "#",
    trailer: "#",
    rating: 8.2,
  },
];

function Filime() {
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("title");
  const [viewMode, setViewMode] = useState("grid");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filter movies by search, category, and pagination
  const filteredMovies = movies.filter((movie) => {
    if (activeCategory !== "All" && movie.category !== activeCategory)
      return false;
    if (searchBy === "title")
      return movie.title.toLowerCase().includes(search.toLowerCase());
    if (searchBy === "year") return movie.year.toString().includes(search);
    return true;
  });

  const paginatedMovies = filteredMovies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);

  return (
    <div className="filime">
      <div className="container">
        <div className="title">
          <div>
            <h2>Movies and Series</h2>
            <p>Explore our collection of movies and series.</p>
          </div>
          <div className="nav">
            <ul>
              {["All", "Movies", "Series", "Animation", "Children"].map(
                (category) => (
                  <li
                    key={category}
                    className={activeCategory === category ? "active" : ""}
                    onClick={() => {
                      setActiveCategory(category);
                      setCurrentPage(1);
                    }}
                  >
                    {category}
                  </li>
                )
              )}
            </ul>
            <div className="search">
              <select
                value={searchBy}
                onChange={(e) => setSearchBy(e.target.value)}
              >
                <option value="title">Title</option>
                <option value="year">Year</option>
              </select>
              <input
                type="text"
                placeholder={`Search by ${searchBy}`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button>
                <CiSearch />
              </button>
            </div>
            <div className="view-mode">
              <button
                className={viewMode === "grid" ? "active" : ""}
                onClick={() => setViewMode("grid")}
              >
                <CiGrid42 />
              </button>
              <button
                className={viewMode === "list" ? "active" : ""}
                onClick={() => setViewMode("list")}
              >
                <CiBoxList />
              </button>
            </div>
          </div>
        </div>

        <div className={`movies ${viewMode}`}>
          {paginatedMovies.length > 0 ? (
            paginatedMovies.map((movie, index) => (
              <div className="card" key={index}>
                <img src={movie.thumbnail} alt={movie.title} />
                <div className="details">
                  <div className="rating">
                    <p>⭐ {movie.rating}</p>
                  </div>

                  <div className="dis">
                    <div className="dat">
                      <h3>{movie.title}</h3>
                      <p>{movie.year}</p>
                    </div>
                    <div className="action">
                      <a href={movie.watch}>Watch Now</a>
                      <button>
                        <LuPlus />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">
              No movies found matching your search criteria.
            </p>
          )}
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            <FaAngleDoubleLeft />
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </button>
          {currentPage > 3 && (
            <>
              <button onClick={() => setCurrentPage(1)}>1</button>
              {currentPage > 4 && <span>...</span>}
            </>
          )}
          {Array.from({ length: 4 }, (_, i) => {
            const page = currentPage - 2 + i;
            if (page > 0 && page <= totalPages) {
              return (
                <button
                  key={page}
                  className={currentPage === page ? "active" : ""}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              );
            }
            return null;
          })}
          {currentPage < totalPages - 2 && (
            <>
              {currentPage < totalPages - 3 && <span>...</span>}
              <button onClick={() => setCurrentPage(totalPages)}>
                {totalPages}
              </button>
            </>
          )}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <FaChevronRight />
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            <FaAngleDoubleRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Filime;
