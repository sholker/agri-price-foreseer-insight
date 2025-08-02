import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import "@/components/ui/NotFound.css"
import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

// Register the GSAP plugin
gsap.registerPlugin(MorphSVGPlugin);

const NotFound = () => {
  const location = useLocation();

  // Log the 404 error
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Handle the animation logic
  useEffect(() => {
    // Your GSAP animation code goes here...
    // I've omitted it for brevity, but it should be the same as the
    // one from the previous correct answer.
    const yetiTL = gsap.timeline({ paused: true, repeat: -1 });
    // ... rest of the animation setup

    yetiTL.play();

    // Cleanup function to prevent memory leaks
    return () => {
      yetiTL.kill();
      // kill other timelines if you have them (e.g., chatterTL.kill())
    };
  }, []); // Empty dependency array to run only once

  // The return statement is fixed here (no colon)
  return (
    <div>
      <svg id="yetiSVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 470">
        {/* All your Yeti SVG paths go here */}
      </svg>
      <svg id="lightSVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 470">
        {/* All your Light SVG paths and filters go here */}
      </svg>
      <div className="content">
        <h3>Hello?? Is somebody there?!?</h3>
        <p>
          We know it’s scary, but the page you’re trying to reach can’t be found. Perhaps it was just a bad <span>link</span> dream?
        </p>
      </div>
    </div>
  );
};

export default NotFound;