import React, { useState, useEffect } from "react";
import "./Questions.css";
import { GET_QUESTIONS_URL } from "../../assets/constants";
import CircularProgress from "@material-ui/core/CircularProgress";
import SingleQuestion from "./SingleQuestion";

function Questions() {
  const [questionsList, setQuestionsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(GET_QUESTIONS_URL, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((dataJSON) => {
        setQuestionsList(dataJSON);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="questions">
      <div className="questions__header">
        <h1 className="questions__title">Q&A's about COVID-19</h1>
      </div>
      {isLoading ? (
        <CircularProgress color="primary" />
      ) : (
        <div className="questions__content">
          {
            questionsList.map((question, index) =>
              {
                return(
                  <SingleQuestion questionObj={question} index={index} key={question.question} />
                )
              }
            )
          }
        </div>
      )}
    </div>
  );
}

export default Questions;
