import React, { useEffect, useState } from "react";
import "./Reunion.css";
import ReunionData from "./ReunionData";
import CircularProgress from "@material-ui/core/CircularProgress";

const ALL_REUNIONS_URL =
  "http://node-express-env.eba-yhhaeabq.us-east-1.elasticbeanstalk.com/api/reunions";

function Reunion() {
  const [reunionList, setReunionList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  let mockReunion = {
    users: ["hola@icom.com", "klhsadkl@khsd.com"],
    duration: 60,
    registered_date: "12/12/2021",
    masks: true,
    open_space: true,
    risk: 3,
  };

  useEffect(() => {
    fetch(ALL_REUNIONS_URL, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((dataJSON) => {
        setReunionList(dataJSON);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(reunionList);
  return (
    <div id="dashboard" className="reunion">
      <div className="reunion__title">
        <h1>Your reunions</h1>
      </div>
      {/* PROD CODE */}
      {/* {isLoading ? (
        <CircularProgress color="primary" />
      ) : (
        <div className="reunion__content">
          {reunionList.map((reunion, index) => {
            return(
              <ReunionData reunion={reunion} number={index} />
            )
          })}
        </div>
      )} */}
      {/* DEV CODE */}
      <div className="reunion__content">
      <ReunionData reunion={mockReunion} number={1} />
      <ReunionData reunion={mockReunion} number={1} />


      </div>
    </div>
  );
}
export default Reunion;
