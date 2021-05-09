import React, { useEffect, useState } from "react";
import "./Reunion.css";
import ReunionData from "./ReunionData";
import CircularProgress from "@material-ui/core/CircularProgress";
import Modal from "@material-ui/core/Modal";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {
  GET_ALL_REUNIONS_URL,
  POST_NEW_REUNION_URL,
  CALCULATE_INITIAL_RISK,
} from "./../../assets/constants";

let mockReunion = {
  users: ["hola@icom.com", "klhsadkl@khsd.com"],
  duration: 60,
  registered_date: "12/12/2021",
  masks: true,
  open_space: true,
  risk: 3,
};

function Reunion() {
  const [reunionList, setReunionList] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // TODO: Change to true when using API call
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [reunionInfo, setReunionInfo] = useState({});

  console.log(reunionInfo);
  const handleFormChange = (e) => {
    let key = e.target.name;
    let value = e.target.value;

    console.log(key);
    console.log(value);

    if (key === "open_space" || key === "masks") {
      if (value === ("Yes")) value = true;
      else value = false;
    }

    if (key === "users") {
      let users = value.split(",");
      value = users;
    }

    if(key === "duration"){
      let durationStr = parseInt(value);
      value = durationStr;
    }

    let newInfo = {
      [key]: value,
    };
    console.log(newInfo);

    setReunionInfo((prevState) => {
      return { ...prevState, ...newInfo };
    });
  };

  const handleFormCancel = () => {
    setIsModalOpen(false);
    setReunionInfo({});
  };

  async function handleFormSubmit() {
    // setIsLoading(true);
    let bodyToPost = { ...reunionInfo, risk: 0 };
    let withRisk = await fetch(CALCULATE_INITIAL_RISK, {
      method: "POST",
      headers:{
            'Accept': '*/*',
            'Content-Type': 'application/json;charset=utf-8',
            'X-IBM-Client-Id': process.env.REACT_APP_INITIAL_RISK_KEY,
          },
      redirect: 'follow',
      body: JSON.stringify(bodyToPost),
    }).then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw response.status;
      }
    });

    let allowedKeys = ['duration', 'masks', 'open_space', 'registered_date', 'users', 'risk'];

    let withRiskArrKeys = Object.keys(withRisk.body.data);
    let bodyToDB = withRiskArrKeys.filter(key => allowedKeys.includes(key)).reduce((obj, key) => {
      return {
        ...obj,
        [key]: withRisk.body.data[key]
      };
    }, {});    
    
    console.log(bodyToDB);

    await fetch(POST_NEW_REUNION_URL, {
      method: "POST",
      headers:{
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(bodyToDB)
    }).then(response =>{
      if(response.status === 200){
        alert("New reunion added");
        setIsLoading(false);
        handleFormCancel();
      }
      return response.json()})
    .then(dataJSON => {
      return dataJSON
    }).catch(e => console.log("error"+ e))
  }

  const modalBody = (
    <div className="modal">
      <h1 className="modal__title">New reunion</h1>
      <div className="modal__content">
        <div className="modal__first-column">
          <div className="modal__row">
            <div>
              <p>Reunion title</p>
              <input type="text" />
            </div>
            <div>
              <p>Reunion date</p>
              <input
                type="text"
                placeholder="DD/MM/YY"
                onChange={handleFormChange}
                name="registered_date"
              />
            </div>
          </div>

          <div className="modal__row">
            <div>
              <p>Time lasted</p>
              <input
                type="number"
                placeholder="In minutes"
                name="duration"
                onChange={handleFormChange}
              />
            </div>

            <div>
              <p>People gathered</p>
              <input type="number" />
            </div>
          </div>

          <div className="modal__row">
            <div>
              <p>OpenSpace</p>
              <input
                name="open_space"
                onChange={handleFormChange}
                placeholder="Yes/No"
                onChange={handleFormChange}
              />
            </div>

            <div>
              <p>Mask usage</p>
              <input
                name="masks"
                placeholder="Yes/No"
                onChange={handleFormChange}
              />
            </div>
          </div>
        </div>
        <div className="modal__second-column">
          <p>Contact list</p>
          <input
            placeholder="Comma separated emails"
            name="users"
            onChange={handleFormChange}
          />
        </div>
      </div>
      <div className="modal__actions">
        <button onClick={handleFormSubmit} className="modal__actions--add">
          Add
        </button>
        <button onClick={handleFormCancel} className="modal__actions--cancel">
          Cancel
        </button>
      </div>
    </div>
  );

  // useEffect(() => {
  //   fetch(GET_ALL_REUNIONS_URL, {
  //     method: "GET",
  //   })
  //     .then((response) => response.json())
  //     .then((dataJSON) => {
  //       setReunionList(dataJSON);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(`Error: ${error}`);
  //     });
  // }, []);

  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {modalBody}
      </Modal>
      <div id="dashboard" className="reunion">
        <div className="reunion__header">
          <h1 className="reunion__title">Your reunions</h1>
          <div className="reunion__actions">
            <button
              className="reunion__actions--button"
              onClick={() => setIsModalOpen(true)}
            >
              Add
            </button>
          </div>
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
        {isLoading ? (
          <CircularProgress color="primary" />
        ) : (
          <div className="reunion__content">
            <ReunionData reunion={mockReunion} number={1} />
            <ReunionData reunion={mockReunion} number={1} />
          </div>
        )}
      </div>
    </>
  );
}
export default Reunion;
