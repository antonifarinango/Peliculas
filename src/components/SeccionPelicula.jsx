import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/SeccionPelicula.css";

//LIBRERIA SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

//COMPONENTES
import CardDetalles from "./CardDetalles";
import CardMovie from "./CardMovie";

function SeccionPelicula({ lista, generoId, seccion }) {
  const [peliculaId, setPeliculaId] = useState();
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState();
  const [toggle, setToggle] = useState(false);

  const carrusel = new Set();
  const idsUnicos = new Set();
  const uniqueId = `swiper-${generoId}`;

  useEffect(() => {
    if (peliculaId) {
      async function obtenerPelicula() {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${peliculaId}?api_key=${import.meta.env.VITE_API_KEY}&language=es-ES`
        );
        setPeliculaSeleccionada(response.data);
      }
      obtenerPelicula();
    }
  }, [peliculaId]);

  function obtenerIdImgClick(id) {
    setPeliculaId(id);
  }

  return (
    <>
      <div
        className={
          toggle
            ? "contenedor-detalles-pelicula"
            : "contenedor-detalles-pelicula-none"
        }
      >
        {toggle && (
          <CardDetalles
            peliculaSeleccionada={peliculaSeleccionada}
            setToggle={setToggle}
          />
        )}
      </div>

      <h1 className="titulo-seccion">{seccion}</h1>
      <Swiper
        navigation={{
          nextEl: `.custom-next-${uniqueId}`,
          prevEl: `.custom-prev-${uniqueId}`,
        }}
        modules={[Navigation]}
        breakpoints={{
          1500: {
            slidesPerView: 9.5,
            spaceBetween: 6,
            slidesPerGroup: 9,
            loop: false,
          },
          1300: {
            slidesPerView: 8,
            spaceBetween: 6,
            slidesPerGroup: 8,
            loop: false,
          },
          900: {
            slidesPerView: 5.5,
            spaceBetween: 6,
            slidesPerGroup: 5,
            loop: false,
          },
          600: {
            slidesPerView: 4,
            spaceBetween: 6,
            slidesPerGroup: 4,
            loop: false,
          },
          300: {
            slidesPerView: 3,
            spaceBetween: 6,
            slidesPerGroup: 3,
            loop: true,
          },
        }}
      >
        <button
          id="btn-anterior"
          className={`btn-carrusel custom-prev-${uniqueId}`}
        >
          {"<"}
        </button>
        <button
          id="btn-siguiente"
          className={`btn-carrusel custom-next-${uniqueId}`}
        >
          {">"}
        </button>
        {lista
          .filter((pelicula) => {
            if (pelicula?.genre_ids?.[0] === generoId) {
              if (!idsUnicos.has(pelicula.id)) {
                idsUnicos.add(pelicula.id);
                carrusel.add(
                  "https://image.tmdb.org/t/p/w200" + pelicula.poster_path
                );
                return true;
              }
            }
            return false;
          })
          .map((pelicula) => (
            <SwiperSlide key={pelicula.id}>
              <CardMovie
                ancho={"100%"}
                card={pelicula}
                onClick={() => {
                  obtenerIdImgClick(pelicula.id);
                  setToggle(true);
                }}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}

export default SeccionPelicula;
