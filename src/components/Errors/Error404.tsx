import "./Error.styles.css";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="http-error">
        <div className="http-error-403">
          <h1>404</h1>
          <h2>OOPS! Page introuvable</h2>
          <h4>La page que vous essayé de consulter n'existe pas sur cette plateforme.</h4>
          <span>Renter sur la page d'accueil.</span>
          <button className="btn btn-secondary rounded-pill" onClick={() => navigate("/")}>Accueil</button>
        </div>
      </div>
    </>
  );
}

export default Error404;
