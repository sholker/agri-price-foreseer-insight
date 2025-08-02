import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin"; // Import MorphSVGPlugin
import "@/components/ui/NotFound.css" 

// Register the MorphSVGPlugin
gsap.registerPlugin(MorphSVGPlugin);

const NotFound = () => {
  const location = useLocation();

  // Original effect for logging the 404 error
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Effect for the GSAP animation
  useEffect(() => {
    const furLightColor = "#FFF";
    const furDarkColor = "#67b1e0";
    const skinLightColor = "#ddf1fa";
    const skinDarkColor = "#88c9f2";

    const mouthShape1 = "M149 115.7c-4.6 3.7-6.6 9.8-5 15.6.1.5.3 1.1.5 1.6.6 1.5 2.4 2.3 3.9 1.7l11.2-4.4 11.2-4.4c1.5-.6 2.3-2.4 1.7-3.9-.2-.5-.4-1-.7-1.5-2.8-5.2-8.4-8.3-14.1-7.9-3.7.2-5.9 1.1-8.7 3.2z";
    const mouthShape2 = "M161.2 118.9c0 2.2-1.8 4-4 4s-4-1.8-4-4c0-1 .4-2 1.1-2.7.7-.8 1.8-1.3 2.9-1.3 2.2 0 4 1.7 4 4z";

    const chatterTL = gsap.timeline({ paused: true, repeat: -1, yoyo: true });
    chatterTL.to(['#mouthBG', '#mouthPath', '#mouthOutline'], { duration: 0.1, morphSVG: mouthShape1 }).to('#chin', { duration: 0.1, y: 1.5 }, 0);

    const yetiTL = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0, delay: 0 });

    const goDark = () => {
      gsap.set('#light', { visibility: "hidden" });
      gsap.set('.hlFur', { fill: furDarkColor });
      gsap.set('.hlSkin', { fill: skinDarkColor });
    };

    const goLight = () => {
      gsap.set('#light', { visibility: "visible" });
      gsap.set('.hlFur', { fill: furLightColor });
      gsap.set('.hlSkin', { fill: skinLightColor });
    };

    yetiTL
      .add(() => chatterTL.play())
      .to(['#armL', '#flashlightFront'], { duration: 0.075, x: 7, repeat: 5, yoyo: true, ease: "power1.inOut" }, 2.5)
      .add(goLight, "3.2")
      .add(goDark, "3.3")
      .add(goLight, "3.4")
      .add(() => {
        chatterTL.pause();
        gsap.to(['#mouthBG', '#mouthPath', '#mouthOutline'], { duration: 0.1, morphSVG: mouthShape1 });
      }, "3.2")
      .to(['#mouthBG', '#mouthPath', '#mouthOutline'], { duration: 0.25, morphSVG: mouthShape2 }, "5")
      .to('#tooth1', { duration: 0.1, y: -5 }, "5")
      .to('#armR', { duration: 0.5, x: 10, y: 30, rotation: 10, transformOrigin: "bottom center", ease: "quad.out" }, "4")
      .to(['#eyeL', '#eyeR'], { duration: 0.25, scale: 1.4, transformOrigin: "center center" }, "5")
      .add(goDark, "8")
      .add(goLight, "8.1")
      .add(goDark, "8.3")
      .add(goLight, "8.4")
      .add(goDark, "8.6")
      .to(['#mouthBG', '#mouthPath', '#mouthOutline'], { duration: 0.25, morphSVG: mouthShape1 }, "9")
      .to('#tooth1', { duration: 0.1, y: 0 }, "9")
      .to('#armR', { duration: 0.5, x: 0, y: 0, rotation: 0, transformOrigin: "bottom center", ease: "quad.out" }, "9")
      .to(['#eyeL', '#eyeR'], { duration: 0.25, scale: 1, transformOrigin: "center center" }, "9")
      .add(() => chatterTL.play(), "9.25")
      .to(['#armL', '#flashlightFront'], { duration: 0.075, x: 7, repeat: 5, yoyo: true, ease: "power1.inOut" }, 11.5);
    
    goDark();
    yetiTL.play();

    // Cleanup function to kill animations on component unmount
    return () => {
      yetiTL.kill();
      chatterTL.kill();
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div>
      <svg id="yetiSVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 470">
        <defs>
            <linearGradient id="flashlightGrad" x1="126.5842" x2="90.5842" y1="176.5625" y2="213.5625" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#333"/>
                <stop offset=".076" stopColor="#414141"/>
                <stop offset=".2213" stopColor="#555"/>
                <stop offset=".3651" stopColor="#626262"/>
                <stop offset=".5043" stopColor="#666"/>
                <stop offset=".6323" stopColor="#606060"/>
                <stop offset=".8063" stopColor="#4e4e4e"/>
                <stop offset="1" stopColor="#333"/>
            </linearGradient>
        </defs>
        <path fill="#24658F" d="M0 0h600v470H0z"/>
        {/* ... The rest of your SVG paths go here ... */}
        {/* I've omitted the long list of paths for brevity, but you should paste them all inside the <svg> tag */}
        <g id="pillow">
            <path fill="#09334F" d="M241.3 124.6c-52.9 28.6-112.6 48-181.8 54.4-40.9 6.8-64.6-82.3-31.9-106.6C84 43.8 144.8 26.2 209.4 18c32.8 13 48.5 75.3 31.9 106.6z"/>
            <path fill="none" stroke="#001726" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M52.8 91.3c10 7.4 25.4 50.7 16.1 65.8M241.3 124.6c-52.9 28.6-112.6 48-181.8 54.4-40.9 6.8-64.6-82.3-31.9-106.6C84 43.8 144.8 26.2 209.4 18c32.8 13 48.5 75.3 31.9 106.6z"/>
            {/* ... Continue pasting all SVG paths ... */}
        </g>
        {/* ... And so on for all your SVG groups and paths ... */}
      </svg>
      <svg id="lightSVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 470">
        <defs>
            <filter id="white-glow">
                <feFlood result="flood" floodColor="#ffffff" floodOpacity=".6"></feFlood>
                <feComposite in="flood" result="mask" in2="SourceGraphic" operator="in"></feComposite>
                <feMorphology in="mask" result="dilated" operator="dilate" radius="3"></feMorphology>
                <feGaussianBlur in="dilated" result="blurred" stdDeviation="8"></feGaussianBlur>
                <feMerge>
                    <feMergeNode in="blurred"></feMergeNode>
                    <feMergeNode in="SourceGraphic"></feMergeNode>
                </feMerge>
            </filter>
        </defs>
        <g id="light" style={{ visibility: "hidden" }}>
            <path filter="url(#white-glow)" fill="#F8FFE8" d="M122.2 177.4c-5.2-1.6-13.6 2.1-20.6 8.3-7.7 6.8-11.4 16.8-9.3 22.1L421 1683h1534V733L122.2 177.4z"/>
            <path opacity="0.7" fill="#FFFFFF" d="M101.6,185.7c-8.2,7.3-11.9,18.2-8.8,23.1c2.6,4.1,13.6-1.1,21.8-8.4s13.6-18.1,9.9-21.6 C120.1,174.6,109.8,178.4,101.6,185.7z"/>
        </g>
        {/* The 404 text SVG paths can also be placed here if they are part of this separate SVG */}
      </svg>

      <div className="content">
        <h3>Hello?? Is somebody there?!?</h3>
        <p>
          We know it’s scary, but the page you’re trying to reach can’t be
          found. Perhaps it was just a bad <span>link</span> dream?
          </br>
          Remember: "Garbage in, garbage out."
        </p>
         <a href="/" className="home-link">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;