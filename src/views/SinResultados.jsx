import React from "react";
import "../style/SinResultados.css"

//IMAGENES
import popcorn from "../assets/images/popcorn.webp"

function SinResultados(){
    return(
        <div className="div-filtro-sin-resultados">
            <p className="p-filtro-sin-resultados">
              ¡Nada en la pantalla grande por ahora!
            </p>
            <div className="div-img-filtro-sin-resultados">
              <img className="img-filtro-sin-resultados" src={popcorn} alt="popcorn-icon" />
            </div>
        </div>
    )
}

export default SinResultados;