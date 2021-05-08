import React from "react";
import "./Reunion.css";
import ReunionData from "./ReunionData";

function Reunion() {
  let mockReunion = {
    "users": ["hola@icom.com", "klhsadkl@khsd.com"],
    "duration": 60,
    "registered_date": "12/12/2021",
    "masks": true,
    "open_space": true,
    "risk": 3
}

  return (
    <div id="dashboard" className="reunion">
      <div className="reunion__title">
        <h1>Your reunions</h1>
      </div>
      <div className="reunion__content">
          <ReunionData reunion={mockReunion}/>
          <ReunionData reunion={mockReunion}/>
          <ReunionData reunion={mockReunion}/>
      </div>
    </div>
  );
}
export default Reunion;
