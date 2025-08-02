import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import "@/components/ui/NotFound.css"

const NotFound = () => {
  const location = useLocation();

  // Log the 404 error to the console (this logic remains)
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div>
      <svg id="yetiSVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 470">
        {/*
          The entire SVG code provided in your prompt goes here.
          I've added classes like "yeti-arm-l", "yeti-arm-r", "yeti-eye"
          to the relevant groups for CSS targeting.
        */}
        <g id="yeti">
          {/* ... other yeti parts ... */}
          <g id="eyeL" className="yeti-eye">
            <circle cx="135.9" cy="105.3" r="3.5" fill="#265D85"/>
            <circle cx="133.7" cy="103.5" r="1" fill="#FFF"/>
          </g>
          <g id="eyeR" className="yeti-eye">
            <circle cx="163.2" cy="96.3" r="3.5" fill="#265D85"/>
            <circle cx="160.9" cy="94.5" r="1" fill="#FFF"/>
          </g>
          <g id="mouth" className="yeti-mouth">
            <path fill="#265D85" d="M149 115.7c-4.6 3.7-6.6 9.8-5 15.6.1.5.3 1.1.5 1.6.6 1.5 2.4 2.3 3.9 1.7l11.2-4.4 11.2-4.4c1.5-.6 2.3-2.4 1.7-3.9-.2-.5-.4-1-.7-1.5-2.8-5.2-8.4-8.3-14.1-7.9-3.7.2-5.9 1.1-8.7 3.2z"/>
          </g>
          <g id="armR" className="yeti-arm-r">
            {/* ... arm R paths ... */}
          </g>
          <g id="armL" className="yeti-arm-l">
            {/* ... arm L paths ... */}
          </g>
        </g>
        {/* ... etc. ... */}
      </svg>
      <svg id="lightSVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 470">
        <defs>
          <filter id="white-glow">
            {/* ... filter definition ... */}
          </filter>
        </defs>
        <g id="light">
          {/* ... light paths ... */}
        </g>
      </svg>
      <div className="content">
        <h3>Hello?? Is somebody there?!?</h3>
        <p>
          We know it’s scary, but the page you’re trying to reach can’t be
          found. Perhaps it was just a bad <span>link</span> dream?
        </p>
         <a href="/" className="home-link">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
