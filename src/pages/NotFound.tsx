import { useNavigate } from 'react-router-dom';
import "@/components/ui/NotFound.css"
const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Prevent the default anchor link behavior
    navigate(-1); // Navigate to the previous page in history
  };

  return (
    <div className="not-found-container">
      <div className="mars"></div>
      <img src="https://assets.codepen.io/1538474/404.svg" className="logo-404" alt="404 Error" />
      <img src="https://assets.codepen.io/1538474/meteor.svg" className="meteor" alt="Meteor" />
      <p className="title">Oh no!!</p>
      <p className="subtitle">
        You’re either misspelling the URL <br /> or requesting a page that's no
        longer here.
        <br />
        Remeber - " Garbage in, Garbage out :P "
      </p>
      <div style={{ textAlign: 'center' }}>
        <a className="btn-back" href="#" onClick={handleGoBack}>
          Back to previous page
        </a>
      </div>
      <img src="https://assets.codepen.io/1538474/astronaut.svg" className="astronaut" alt="Astronaut" />
      <img src="https://assets.codepen.io/1538474/spaceship.svg" className="spaceship" alt="Spaceship" />
    </div>
  );
};

export default NotFound;