import React from "react";
import "../style/CardMovie.css";

function CardMovie({ card, onClick, ancho }) {
  return (
    <div className="div-card-movie-img">
      <img
        style={{ width: ancho }}
        className="card-movie-img"
        src={"https://image.tmdb.org/t/p/w200" + card.poster_path}
        alt={card.original_title}
        onClick={onClick}
      />
    </div>
  );
}

export default CardMovie;
