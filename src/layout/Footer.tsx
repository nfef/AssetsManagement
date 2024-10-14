import { Link } from "react-router-dom";
const Footer = () => {
  const year = (new Date()).getFullYear();
  return (
    <div className="app-footer">
      <div className="app-footer-links">
        <Link className="app-footer-link" to={"/"}>MAERSK Cameroun {year > 2022 && "- " + year }</Link>
      </div>
    </div>
  );
};

export default Footer;
