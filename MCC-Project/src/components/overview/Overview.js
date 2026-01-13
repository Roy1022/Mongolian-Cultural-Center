import React from "react";
import "./Overview.css";

export const Overview = () => {
  return (
    <div id="overview-container">
      <div id="overview-image">
        <img
          src="/overivewpic.jpg"
          alt="Overview"
          width={600}
          height={440}
          style={{ borderRadius: "64px" }}
        />
      </div>
      <div id="overview-text">
        <h1>MCCN Membership</h1>
        <p>
          Thank you for joining the MCCN community! <br />
          This membership is for two adults and up to two children <br />
          under 18, bringing families together in learning and <br />
          celebration. It helps preserve and share Mongolian <br />
          culture in Washington State and is valid for one year <br />
          from the date of purchase, offering many meaningful <br />
          experiences and benefits for your family.
        </p>
      </div>
    </div>
  );
};
