import React from "react";

import "./../style/home.scss";
import Hero from "./../homepage/Hero";
import Continue from "./../homepage/Continue";
import Latest from "./../homepage/Latest";
import Serie from "./../homepage/Series";
import Movie from "./../homepage/Movies";
import Film from "./../homepage/Film";

function Homepage() {
  return (
    <>
      <div className="homepage">
        
        <Hero />
        <Continue />
        <Latest />
        <Serie />
        <Movie />
        <Film />
      </div>
    </>
  );
}

export default Homepage;
