import React from "react";
import "../style/CardDetalles.css";

//IMAGENES
import like from "../assets/images/like.webp";

function CardDetalles({ peliculaSeleccionada, setToggle }) {
  return (
    <div className="div-detalles-pelicula">
      <div className="div-seccion-inicio">
        <div className="div-seccion-inicio">
          <button
            className="btn-cerrar"
            onClick={() => {
              setToggle(false);
            }}
          >
            ✖
          </button>

          <img
            className="img-detalles"
            src={
              "https://image.tmdb.org/t/p/w1280" +
              (peliculaSeleccionada?.poster_path || "")
            }
            alt={`Poster de ${peliculaSeleccionada?.title || "la película"}`}
          />
          <div className="div-detalles">
            <div className="descripcion-fecha">
              <span>
                {peliculaSeleccionada?.release_date
                  ?.split("")
                  .slice(0, 4)
                  .join("") || "Fecha no disponible"}
              </span>
              <span>{peliculaSeleccionada?.adult ? "+18" : "+13"}</span>
              <span>
                {peliculaSeleccionada?.original_language?.toUpperCase() ||
                  "Idioma no disponible"}
              </span>
            </div>
            <div>
              <div>
                <span>
                  {peliculaSeleccionada?.genres?.[0]?.name ||
                    "Género no disponible"}
                </span>
                <span className="div-likes">
                  <img className="img-like" src={like} alt="like-icono" />
                  <span>
                    {Number(
                      String(peliculaSeleccionada?.popularity).replace(".", "")
                    ) || "0"}
                  </span>
                </span>
              </div>
              <h3>{peliculaSeleccionada?.title || "Título no disponible"}</h3>
              <p>{peliculaSeleccionada?.overview || "Sin descripción"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardDetalles;
