import React from "react";

import { HelmetProvider, Helmet } from "react-helmet-async";

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
      <HelmetProvider>
        <Helmet>
          <title>
            Walluxe | Endless Entertainment with Kinyarwanda Translated Movies
          </title>
          <meta
            name="description"
            content="Walluxe is your ultimate destination for Kinyarwanda translated movies. Experience endless entertainment tailored for Rwandan audiences and beyond."
          />
          <meta
            name="keywords"
            content="Kinyarwanda movies, Filime zisobanuye, Rwandan entertainment, Walluxe, translated movies, agasobanuye, streaming platform Rwanda, movie streaming in Rwanda, Kinyarwanda translated films, Rwandan cinema, African movies, Walluxe platform, endless entertainment, film streaming Rwanda"
          />
        </Helmet>

        <Helmet>
          <meta
            property="og:title"
            content="Walluxe - Endless Entertainment with Kinyarwanda Movies"
          />
          <meta
            property="og:description"
            content="Stream Kinyarwanda translated movies on Walluxe. Enjoy a wide selection of films and exclusive entertainment tailored for Rwandans."
          />
          <meta property="og:image" content="/image/brand/social.jpg" />
          <meta property="og:url" content="https://walluxe.vercel.app" />
          <meta property="og:type" content="website" />
        </Helmet>

        <Helmet>
          <link rel="canonical" href="https://walluxe.vercel.app" />
        </Helmet>

        <Helmet>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-JVLLYDXT92"
          ></script>
          <script>
            {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-JVLLYDXT92');`}
          </script>
        </Helmet>

        <Helmet>
          <script type="application/ld+json">
            {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Meyvn Agency",
              "url": "https://meyvn.vercel.app",
              "logo": "https://meyvn.vercel.app/images/brand/logo.svg",
              "description": "Meyvn Agency provides software development, graphic design, digital marketing, and IT services in Rwanda.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Main Street",
                "addressLocality": "Musanze",
                "addressRegion": "Northern Province",
                "postalCode": "00000",
                "addressCountry": "Rwanda"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -1.5000,
                "longitude": 29.6333
              },
              "telephone": "+250781996271",
              "openingHours": "Mo-Su 08:00-20:00"
            }
            `}
          </script>
        </Helmet>
        <div className="homepage">
          <Hero />
          {/* <Continue />
        <Latest />
        <Serie />
        <Movie /> */}
          <Film />
        </div>
      </HelmetProvider>
    </>
  );
}

export default Homepage;
