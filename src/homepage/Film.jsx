// Updated Filime.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LuPlus } from "react-icons/lu";
import { CiBoxList, CiGrid42, CiSearch } from "react-icons/ci";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import ContentLoader from "react-content-loader"; // React Content Loader

function Filime() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("title");
  const [viewMode, setViewMode] = useState("grid");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 16;

  const navigate = useNavigate();

  // Fetch movies from API
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://streamhgapi.com/api/file/list?key=22704a4xzy4jmeqowy65u"
        );
        const data = await response.json();
        if (data.status === 200) {
          setMovies(data.result.files);
        } else {
          console.error("Error fetching movies:", data.msg);
        }
      } catch (error) {
        console.error("API error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Filter movies by search and category
  const filteredMovies = movies.filter((movie) => {
    if (activeCategory !== "All" && movie.category !== activeCategory)
      return false;
    if (searchBy === "title")
      return movie.title.toLowerCase().includes(search.toLowerCase());
    if (searchBy === "year") return movie.uploaded.includes(search);
    return true;
  });

  // Paginate movies
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
          {loading ? (
            Array.from({ length: itemsPerPage }).map((_, index) => (
              <div className="card" key={index}>
                <ContentLoader
                  viewBox="0 0 300 450"
                  height={450}
                  width={300}
                  backgroundColor="RGB(3, 4, 3)"
                  foregroundColor="RGB(44, 44, 44)"
                >
                  <rect x="0" y="0" rx="5" ry="5" width="300" height="400" />
                  <rect x="0" y="410" rx="5" ry="5" width="200" height="15" />
                  <rect x="0" y="435" rx="5" ry="5" width="150" height="15" />
                </ContentLoader>
              </div>
            ))
          ) : paginatedMovies.length > 0 ? (
            paginatedMovies.map((movie, index) => (
              <div className="card" key={index}>
                <img src={movie.thumbnail} alt={movie.title} />
                <div className="details">
                  <div className="rating">
                    <p>⭐ {movie.views || "N/A"}</p>
                  </div>

                  <div>
                    <div className="dat">
                      <h3>{movie.title}</h3>
                      <p>{new Date(movie.uploaded).getFullYear()}</p>
                    </div>
                    <div className="dis">
                      <div className="action">
                        <button
                          onClick={() =>
                            navigate(`/watch/${movie.file_code}`, {
                              state: { movie },
                            })
                          }
                        >
                          Watch Now
                        </button>

                        <button>
                          <LuPlus />
                        </button>
                      </div>
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
