import React from "react";
import "../style/IntroPelicula.css";

function IntroPelicula({ pelicula, onclick }) {
  //FUNCION PARA LIMITAR UN STRING
  function recortar(string, min, max) {
    if (string?.length > 29) {
      const stringRecortado = string.slice(min, max);
      return stringRecortado + "...";
    }
    return string;
  }

  return (
    <div
      className="serie-muestra"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w1280${
          pelicula?.backdrop_path || pelicula?.poster_path
        })`,
      }}
    >
      <div className="container-descripcion">
        <div className="div-descripcion">
          <h1>{recortar(pelicula?.title, 0, 43)}</h1>
          <p>{pelicula?.overview}</p>
        </div>
        <div className="div-btn-descripcion">
          <button id="btn-reproducir" className="btn-descripcion">
            Reproducir
          </button>
          <button
            id="btn-informacion"
            className="btn-descripcion"
            onClick={onclick}
          >
            Más información
          </button>
        </div>
      </div>

      <span className="div-span-edad">
        <span>{pelicula?.adult === false ? "+ 13" : "+ 18 "}</span>
      </span>
    </div>
  );
}

export default IntroPelicula;
