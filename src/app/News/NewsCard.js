import React from "react";

let defaultNewsImage =
  "http://c.files.bbci.co.uk/D505/production/_115033545_gettyimages-1226314512.jpg";
function NewsCard({ newItem }) {
  return (
    <div className="news__container">
      <img
        src={newItem.urlToImage ? newItem.urlToImage : defaultNewsImage}
      ></img>
      <p className="news--title">{newItem.title}</p>
      <div className="news__info">
        <p><b>Source:</b> {newItem.source.name}</p>
        <p><b>By:</b> {newItem.author}</p>
        <p><b>Published at: </b>{newItem.publishedAt}</p>
      </div>

      <p>{newItem.content}</p>
      <a
        href={newItem.url}
        target="_blank"
      >
        Click to continue reading
      </a>
    </div>
  );
}

export default NewsCard;
