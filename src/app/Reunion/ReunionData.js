import React from "react";
import reunionImage from "../../assets/gathering.png";
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

function getCorrectRiskstring(risk) {
  const noRiskDescr =
    "You are not likely to be infected or you are out of the risk period";
  const lowRiskDescr =
    "You are probabbly not infected or asyntomatic so you should keep distancing. ";
  const medRiskDescr =
    "You are potentially infected or migth be contagious even if you don’t have any symptopms.";
  const highRiskDescr =
    "You are really likely to be infected. Please practice self isolation.";

  if (risk === 1) {
    return noRiskDescr;
  } else if (risk === 2) {
    return lowRiskDescr;
  } else if (risk === 3) {
    return medRiskDescr;
  } else if (risk === 4) {
    return highRiskDescr;
  } else {
    return "Error while calculating risk";
  }
}

function ReunionData({ reunion, number }) {
  let reunionDate =  new Date(reunion.registered_date);
  let today = Date.now();
  let diffTime = Math.abs(today - reunionDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  
 
  return (
    <div className="reunion__entry">
      <img
        src={reunionImage}
        className="reunion__image"
        alt="People gathered"
      />
      <div className="reunion__data">
        <p className="reunion__data__name">Reunion {number}</p>
        <div className="reunion__data__info-table">
          <table>
            <thead>
              <tr>
                <th>Days ago</th>
                <th>Duration</th>
                <th>Assistants</th>
                <th>Mask used</th>
                <th>Open space</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{diffDays} Days</td>
                <td>{reunion.duration} minutes</td>
                <td>{reunion.users.length} people</td>
                <td>{reunion.masks ? "Yes" : "No"}</td>
                <td>{reunion.open_space ? "Yes" : "No"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="reunion__risk">
        <p>Risk of being infected</p>
        <div className="risk__details">
          <div className={`risk__details--color--${reunion.risk}`}></div>
          <p className="risk__details--description">
            {getCorrectRiskstring(reunion.risk)}
          </p>
        </div>
      </div>
      <IconButton>
        <EditIcon/>
      </IconButton>
    </div>
  );
}

export default ReunionData;
