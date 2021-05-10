import React, { useEffect, useState } from "react";
import StatsColumnChart from "./StatsColumnChart";
import { GET_TRACKER_URL } from "../../assets/constants";
import "./Tracker.css";
import { CircularProgress } from "@material-ui/core";

function Tracker() {
  const [statsByContinent, setStatsByContinent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getAllPayload() {
      let allPayload = await fetch(GET_TRACKER_URL, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((dataJSON) => dataJSON)
        .catch((error) => console.log(error));

      let requiredFields = ["continent", "cases", "deaths", "recovered"];

      let filteredPayload = [];
      for(let i = 0; i < allPayload.length; i++){
        let filteredObject = Object.keys(allPayload[i])
        .filter((key) =>requiredFields.includes(key))
        .reduce((obj, key) => {
          return{
            ...obj, 
            [key]: allPayload[i][key]
          }
        }, {});
        filteredPayload.push(filteredObject);
      }


      setStatsByContinent(filteredPayload);
      setIsLoading(false);
    }

    getAllPayload();
  }, []);

  return (
    <div className="tracker">
      <div className="tracker__header">
        <h1 className="tracker__title">Track COVID-19 stats</h1>
      </div>
    {
      isLoading? 
      <CircularProgress color="primary"/>
      :
      <div className="tracker__content">
        <StatsColumnChart data={statsByContinent}/>
      </div>
    }
      
    </div>
  );
}

export default Tracker;
