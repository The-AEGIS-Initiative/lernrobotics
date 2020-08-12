import React from "react";
import "./index.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="row">
        <div className="column">
          <p className="col-title"> Products </p>
          <a
            className="col-item"
            href={"https://lernrobotics.aegisinitiative.io/"}
            target={"_blank"}
            rel="noopener noreferrer"
          >
            LERNRobotics
          </a>
        </div>

        <div className="column">
          <p className="col-title"> For Developers </p>
          <a
            className="col-item"
            href={"https://github.com/The-AEGIS-Initiative/lernrobotics"}
            target={"_blank"}
            rel="noopener noreferrer"
          >
            Contribute
          </a>
          <p className="col-item"> Join Us </p>
        </div>

        <div className="column">
          <p className="col-title"> The AEGIS Initiative </p>
          <a
            className="col-item"
            href={"https://www.aegisinitiative.io/"}
            target={"_blank"}
            rel="noopener noreferrer"
          >
            About Us
          </a>
          <a
            className="col-item"
            href={"https://www.aegisinitiative.io/support-us"}
            target={"_blank"}
            rel="noopener noreferrer"
          >
            Support Us
          </a>
          <p className="col-item"> Our Team </p>
        </div>

        <div className="column">
          <p className="col-title"> Contact Us </p>
          <a
            className="col-item"
            href={"https://discord.gg/sDgHhzj"}
            target={"_blank"}
            rel="noopener noreferrer"
          >
            Our Discord Server
          </a>
          <a
            className="col-item email-link"
            href={"mailto:contact@aegisinitiative.io"}
            target={"_blank"}
            rel="noopener noreferrer"
          >
            contact@aegisinitiative.io
          </a>
          <br />
          <p>
            AEGIS Initiative <br />
            1521 Shattuck Ave. #9419 <br />
            Berkeley, CA, 94709 <br />
          </p>
          <br />
          <p>
            &copy; Copyright 2020 The AEGIS Initiative <br />
            All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
