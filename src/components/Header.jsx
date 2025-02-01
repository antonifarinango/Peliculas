import React from "react";
import "../style/Header.css";

//IMAGENES
import buscar from "../assets/icons/icons-búsqueda.png";
import popcornHeaderIcono from "../assets/icons/popcorn-icon.png";

function Header({ obtenerBusqueda }) {
  return (
    <>
      <div className="container-header">
        <div className="div-titulo">
          <img
            className="popcorn-icon"
            src={popcornHeaderIcono}
            alt="popcorn-header-icono"
          />
          <span className="titulo">Películas</span>
        </div>
        <div className="container-buscar">
          <div className="div-buscar">
            <button className="btn-buscar">
              <img src={buscar} alt="buscar-icono" />
            </button>
            <input
              className="input-busqueda"
              type="text"
              onChange={(e) => obtenerBusqueda(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
