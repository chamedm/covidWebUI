import React, { useState, useEffect } from "react";
import "./News.css";
import NewsCard from "./NewsCard";
import { GET_NEWS_URL } from "../../assets/constants";
import { CircularProgress } from "@material-ui/core";


function News() {
  const [newsList, setNewsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(GET_NEWS_URL, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((dataJSON) => {
        if (dataJSON.status === "ok") {
          setNewsList(dataJSON.articles);
          setIsLoading(false);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="news">
      <div className="news__header">
        <h1 className="news__title">Latest news about COVID-19</h1>
      </div>
      {isLoading ? (
        <CircularProgress color="primary" />
      ) : (
        <div className="news__content">
          {
            newsList.map(newItem => {
              return(
                <NewsCard newItem={newItem} />

              );
            })
          }
        </div>
      )}
    </div>
  );
}

export default News;
