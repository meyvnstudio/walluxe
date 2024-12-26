import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";

import { GiBleedingEye } from "react-icons/gi";
import { TbDownload, TbShare } from "react-icons/tb";
import ContentLoader from "react-content-loader"; // React Content Loader

import "./../style/watch.scss";
import Toast from "../components/Toast";

const Watchpage = () => {
  const location = useLocation();
  const { file_code } = useParams();
  const movie = location.state?.movie;

  const [mvz, setMvz] = useState([]);
  const [latestMvz, setLatestMvz] = useState([]);
  const [popularMvz, setPopularMvz] = useState([]);
  const [showToast, setShowToast] = useState(false);

  const [videoInfo, setVideoInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [movieList, setMovieList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentData, setCommentData] = useState({ name: "", message: "" });

  const navigate = useNavigate();

  // Fetch video info based on file_code
  useEffect(() => {
    const fetchVideoInfo = async () => {
      try {
        const response = await fetch(
          `https://streamhgapi.com/api/file/info?key=22704a4xzy4jmeqowy65u&file_code=${file_code}`
        );
        const data = await response.json();
        if (data.status === 200 && data.result.length > 0) {
          setVideoInfo(data.result[0]);
        } else {
          console.error("Error fetching video info:", data.msg);
        }
      } catch (error) {
        console.error("API error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoInfo();
  }, [file_code]);

  // Fetch all movies for latest and trending
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "https://streamhgapi.com/api/file/list?key=22704a4xzy4jmeqowy65u"
        );
        const data = await response.json();
        if (data.status === 200) {
          setMvz(data.result.files); // Store all movies
        } else {
          console.error("Error fetching movies:", data.msg);
        }
      } catch (error) {
        console.error("API error:", error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (mvz.length > 0) {
      // Display latest 8 movies by sorting by creation date
      const latest = [...mvz]
        .sort((a, b) => new Date(b.file_created) - new Date(a.file_created))
        .slice(0, 8);
      setLatestMvz(latest);

      // Display top 5 popular movies by sorting by views
      const popular = [...mvz]
        .sort((a, b) => b.file_views - a.file_views)
        .slice(0, 5);
      setPopularMvz(popular);
    }
  }, [mvz]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setComments([...comments, commentData]);
    setCommentData({ name: "", message: "" });
  };

  if (!file_code) {
    return <p>Movie data not available.</p>;
  }

  const embedLink = `https://iplayerhls.com/e/${videoInfo?.file_code}`;
  const downloadLink = `https://iplayerhls.com/f/${videoInfo?.file_code}_n`;

  const handleDownload = () => {
    window.open(downloadLink, "_blank");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(embedLink);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 6000);
  };

  return (
    <>
      <HelmetProvider>
        <div className="watch">
          <Helmet>
            <title>
              {videoInfo?.file_title + " ©  walluxe[meyvn agency]" ||
                "Watch Movie | Walluxe"}
            </title>
            <meta
              name="description"
              content={
                videoInfo?.file_description ||
                "Watch the latest and trending movies on Walluxe, your ultimate movie streaming platform."
              }
            />
            <meta
              name="keywords"
              content="movie, streaming, Walluxe, watch online, movies, agasobanuye, mu kinyarwanda, translator mukinyarwanda, kigali rwanda"
            />
          </Helmet>
          <div className="container">
            <div className="content">
              <div className="main">
                {loading ? (
                  <div className="loader">
                    {/* Skeleton Loader for Video */}
                    <ContentLoader
                      viewBox="0 0 800 420"
                      height={420}
                      width="100%"
                      backgroundColor="RGB(44, 44, 44)"
                      foregroundColor="RGB(3, 4,3)"
                    >
                      <rect
                        x="0"
                        y="0"
                        rx="5"
                        ry="5"
                        width="800"
                        height="420"
                      />
                    </ContentLoader>
                    {/* Skeleton Loader for Title */}
                    <ContentLoader
                      viewBox="0 0 800 60"
                      height={60}
                      width="100%"
                      backgroundColor="#f3f3f3"
                      foregroundColor="#ecebeb"
                    >
                      <rect
                        x="0"
                        y="10"
                        rx="5"
                        ry="5"
                        width="300"
                        height="20"
                      />
                      <rect
                        x="0"
                        y="40"
                        rx="5"
                        ry="5"
                        width="200"
                        height="15"
                      />
                    </ContentLoader>
                    {/* Skeleton Loader for Description */}
                    <ContentLoader
                      viewBox="0 0 800 150"
                      height={150}
                      width="100%"
                      backgroundColor="#f3f3f3"
                      foregroundColor="#ecebeb"
                    >
                      <rect x="0" y="0" rx="5" ry="5" width="800" height="10" />
                      <rect
                        x="0"
                        y="20"
                        rx="5"
                        ry="5"
                        width="600"
                        height="10"
                      />
                      <rect
                        x="0"
                        y="40"
                        rx="5"
                        ry="5"
                        width="700"
                        height="10"
                      />
                      <rect
                        x="0"
                        y="60"
                        rx="5"
                        ry="5"
                        width="500"
                        height="10"
                      />
                    </ContentLoader>
                  </div>
                ) : (
                  <div className="video">
                    <div className="frame">
                      <iframe
                        src={embedLink}
                        frameBorder="0"
                        allowFullScreen
                        title={movie?.title || videoInfo?.file_title}
                        style={{
                          width: "100%",
                          height: "420px",
                        }}
                      ></iframe>
                    </div>
                    <h2>{videoInfo?.file_title || movie?.title}</h2>
                    <div className="actions">
                      <button className="btn" onClick={handleDownload}>
                        <TbDownload /> Download
                      </button>
                      <button className="btn" onClick={handleCopy}>
                        <TbShare /> Share
                      </button>
                      <Toast message="Link copied!" show={showToast} />
                      <button>
                        <GiBleedingEye /> {videoInfo?.file_views || "0"} Views
                      </button>
                    </div>
                    <div className="descr">
                      <p style={{ textTransform: "uppercase" }}>
                        {videoInfo?.file_title}
                      </p>
                      <i
                        style={{
                          fontSize: ".8rem",
                          fontWeight: "100",
                          padding: ".6rem",
                          display: "block",
                          opacity: ".6",
                        }}
                      >
                        {videoInfo?.tags || "No tags available"}
                      </i>
                      <p>
                        <strong>Duration:</strong>{" "}
                        {videoInfo?.file_length
                          ? `${Math.floor(
                              videoInfo.file_length / 3600
                            )}h ${Math.floor(
                              (videoInfo.file_length % 3600) / 60
                            )}min ${Math.floor(
                              (videoInfo.file_length % 3600) % 60
                            )}sec`
                          : "N/A"}
                      </p>
                      <p
                        style={{
                          fontSize: ".9rem",
                          opacity: ".6",
                          marginTop: ".3rem",
                        }}
                      >
                        • {videoInfo?.file_created || "Unknown"}
                      </p>
                    </div>
                  </div>
                )}

                <div className="comment">
                  <h2>Leave a Comment</h2>
                  <form onSubmit={handleCommentSubmit}>
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      value={commentData.name}
                      onChange={(e) =>
                        setCommentData({ ...commentData, name: e.target.value })
                      }
                      style={{ margin: "10px 0" }}
                    />
                    <textarea
                      placeholder="Message"
                      required
                      value={commentData.message}
                      onChange={(e) =>
                        setCommentData({
                          ...commentData,
                          message: e.target.value,
                        })
                      }
                      style={{ width: "100%", height: "100px" }}
                    ></textarea>
                    <button type="submit">Submit</button>
                  </form>
                  <div className="comments-section">
                    <h3>Comments</h3>
                    {comments.map((comment, index) => (
                      <div key={index} className="comment-item">
                        <h4>{comment.name}</h4>
                        <p>{comment.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="sidebar">
                <div className="cta">
                  <h2>Don't miss out!</h2>
                  <button>Subscribe Now</button>
                </div>
                <Link to={"https://meyvn.vercel.app/"} className="advert">
                  <div className="frame">
                    <iframe
                      src="https://meyvn.vercel.app/"
                      frameBorder="0"
                      allowFullScreen
                      title="meyvn agency"
                      style={{
                        width: "100%",
                        height: "620px",
                      }}
                    ></iframe>
                  </div>
                  <div className="name">
                    <h3>Meyvn Agency</h3>
                    <p>Your software development partner</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </HelmetProvider>
    </>
  );
};

export default Watchpage;
