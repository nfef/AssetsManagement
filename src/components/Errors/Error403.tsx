import { useDispatch } from "react-redux";
import { logout } from "../../auth/AuthUserSlice";
import "./Error.styles.css";

const Error403 = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="http-error">
        <div className="http-error-403">
          <h1>403</h1>
          <h2>OOPS! Accès refusé</h2>
          <h4>Vous n'avez pas de privilèges pour consulter cette plateforme.</h4>
          <span>Veillez contactez l'administrateur.</span>
          <button className="btn btn-secondary rounded-pill" onClick={() => dispatch(logout())}>Se déconnecter</button>
        </div>
      </div>
    </>
  );
}

export default Error403;
