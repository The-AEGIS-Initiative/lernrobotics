import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="row">
        <div className="column">
          <p className="col-title"> Products </p>
          <a
            className="col-item"
            href={"https://robobot.aegisinitiative.io/"}
            target={"_blank"}
          >
            Robobot
          </a>
        </div>

        <div className="column">
          <p className="col-title"> For Developers </p>
          <a
            className="col-item"
            href={"https://bitbucket.org/theaegisinitiative/"}
            target={"_blank"}
          >
            Contribute
          </a>
          <p className="col-item"> Join Us </p>
        </div>

        <div className="column">
          <p className="col-title"> The AEGIS Initiative </p>
          <a
            className="col-item"
            href={"https://www.aegisinitiative.io/who-we-are"}
            target={"_blank"}
          >
            About Us
          </a>
          <p className="col-item"> Our Team </p>
          <p className="col-item"> Donate </p>
        </div>

        <div className="column">
          <p className="col-title"> Contact Us </p>
          <a
            className="col-item email-link"
            href={"mailto:contact@aegisinitiative.io"}
            target={"_blank"}
          >
            contact@aegisinitiative.io
          </a>
        </div>
      </div>
    </div>
  );
}
