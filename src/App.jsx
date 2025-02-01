import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

//SERVICIOS
import ApiService from "./services/apiService";

//COMPONENTES
import CardDetalles from "./components/CardDetalles";
import SeccionPelicula from "./components/SeccionPelicula";
import IntroPelicula from "./components/IntroPelicula";

//VISTAS
import Header from "./components/Header";
import CardMovie from "./components/CardMovie";
import SinResultados from "./views/SinResultados";

function App() {
  const [listaGlobalDePeliculas, setListaGlobalDePeliculas] = useState([]);
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState();
  const [buscar, setBuscar] = useState("");
  const [toggle, setToggle] = useState(false);
  const [peliculaId, setPeliculaId] = useState();
  const [togglefiltrado, setToggleFiltrado] = useState(false);
  const [listaGeneros, setListaGeneros] = useState([]);
  const [peliculaSeleccionadaInicio, setPeliculaSeleccionadaInicio] =
    useState();

  const generos = {
    Accion: 0,
    Aventura: 1,
    Animacion: 2,
    Comedia: 3,
    Crimen: 4,
    Documental: 5,
    Drama: 6,
    Familia: 7,
    Fantasia: 8,
    Historia: 9,
    Terror: 10,
    Musica: 11,
    Misterio: 12,
    Romance: 13,
    CienciaFiccion: 14,
    PeliculaDeTv: 15,
    Suspenso: 16,
    Belica: 17,
  };

  //LISTA GLOBAL DE PELICULAS
  useEffect(() => {
    async function fechPeliculas() {
      try {
        const totalPaginas = 20;
        const peticiones = [];

        for (let i = 1; i <= totalPaginas; i++) {
          peticiones.push(ApiService.mostrarPeliculas(i));
        }

        const respuestas = await Promise.all(peticiones);

        const lista = new Map();
        respuestas.flat().forEach((pelicula) => {
          if (!lista.has(pelicula.id)) {
            lista.set(pelicula.id, pelicula);
          }
        });

        setListaGlobalDePeliculas(Array.from(lista.values()));
      } catch (error) {
        console.error("Error al obtener películas:", error);
      }
    }

    fechPeliculas();
  }, []);

  //ELEGIR PELICULA ALEATORIA PARA MOSTRAR EN EL INICIO
  useEffect(() => {
    if (listaGlobalDePeliculas.length > 0) {
      const randomIndex = Math.floor(
        Math.random() * listaGlobalDePeliculas.length
      );
      setPeliculaSeleccionadaInicio(listaGlobalDePeliculas[randomIndex]);
    }
  }, [listaGlobalDePeliculas]);

  //OBTENER DATOS DE LA PELICULA SELECCIONADA PARA EL FILTRO
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

  //MANEJAR LA BUSQUEDA
  useEffect(() => {
    if (buscar?.length > 0 && filtrarPelicula.length > 0) {
      setToggleFiltrado(true);
    } else {
      setToggleFiltrado(false);
    }
  }, [buscar]);

  //FUNCION PARA FILTRAR LAS PELICULAS BUSCADAS
  const filtrarPelicula =
    buscar?.length > 0
      ? listaGlobalDePeliculas?.filter((pelicula) =>
          pelicula?.title?.toLowerCase().includes(buscar.toLocaleLowerCase())
        )
      : [];

  //OBTENER GENEROS DE PELICULAS
  useEffect(() => {
    async function fetchGeneros() {
      const response = await ApiService.generosPeliculas();

      setListaGeneros(response);
    }
    fetchGeneros();
  }, []);

  //OBTENER ID DEL GENERO
  function obtenerGeneroId(id) {
    return listaGeneros[id]?.id;
  }

  //FUNCION PARA OBTENER EL ID DE LA PELICULA
  function obtenerIdImgClick(id) {
    setPeliculaId(id);
  }

  return (
    <div>
      <Header obtenerBusqueda={setBuscar} />
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

      <div
        className={
          togglefiltrado ? "contenedor-filtro-peliculas" : "contenedor-filtro"
        }
        style={
          filtrarPelicula.length > 0 && filtrarPelicula.length < 9
            ? { justifyContent: "start", paddingLeft: "20px" }
            : { justifyContent: "center" }
        }
      >
        {buscar?.length > 0 && filtrarPelicula.length > 0 ? (
          filtrarPelicula.map((pelicula) => {
            return (
              <div key={pelicula.id} className="contenedor-peliculas-buscadas">
                <CardMovie
                  ancho={"200px"}
                  card={pelicula}
                  onClick={() => {
                    obtenerIdImgClick(pelicula.id);
                    setToggle(true);
                  }}
                />
              </div>
            );
          })
        ) : buscar?.length > 0 && filtrarPelicula.length === 0 ? (
          // Si hay búsqueda pero no hay resultados
          <SinResultados />
        ) : (
          <div className="contenedor-intro-pelicula">
            <IntroPelicula
              pelicula={peliculaSeleccionadaInicio}
              onclick={() => {
                setToggle(true);
                setPeliculaId(peliculaSeleccionadaInicio?.id);
              }}
            />

            <div className="contenedor-de-secciones">
              <SeccionPelicula
                seccion="Acción"
                generoId={obtenerGeneroId(generos.Accion)}
                lista={listaGlobalDePeliculas}
              />
              <SeccionPelicula
                seccion="Terror"
                generoId={obtenerGeneroId(generos.Terror)}
                lista={listaGlobalDePeliculas}
              />
              <SeccionPelicula
                seccion="Animación"
                generoId={obtenerGeneroId(generos.Animacion)}
                lista={listaGlobalDePeliculas}
              />
              <SeccionPelicula
                seccion="Aventura"
                generoId={obtenerGeneroId(generos.Aventura)}
                lista={listaGlobalDePeliculas}
              />
              <SeccionPelicula
                seccion="Bélica"
                generoId={obtenerGeneroId(generos.Belica)}
                lista={listaGlobalDePeliculas}
              />
              <SeccionPelicula
                seccion="Ciencia Ficción"
                generoId={obtenerGeneroId(generos.CienciaFiccion)}
                lista={listaGlobalDePeliculas}
              />
              <SeccionPelicula
                seccion="Comedia"
                generoId={obtenerGeneroId(generos.Comedia)}
                lista={listaGlobalDePeliculas}
              />
              <SeccionPelicula
                seccion="Crimen"
                generoId={obtenerGeneroId(generos.Crimen)}
                lista={listaGlobalDePeliculas}
              />
              <SeccionPelicula
                seccion="Documental"
                generoId={obtenerGeneroId(generos.Documental)}
                lista={listaGlobalDePeliculas}
              />
              <SeccionPelicula
                seccion="Drama"
                generoId={obtenerGeneroId(generos.Drama)}
                lista={listaGlobalDePeliculas}
              />
              <SeccionPelicula
                seccion="Familia"
                generoId={obtenerGeneroId(generos.Familia)}
                lista={listaGlobalDePeliculas}
              />
              <SeccionPelicula
                seccion="Fantasía"
                generoId={obtenerGeneroId(generos.Fantasia)}
                lista={listaGlobalDePeliculas}
              />
              <SeccionPelicula
                seccion="Historia"
                generoId={obtenerGeneroId(generos.Historia)}
                lista={listaGlobalDePeliculas}
              />
              <SeccionPelicula
                seccion="Misterio"
                generoId={obtenerGeneroId(generos.Misterio)}
                lista={listaGlobalDePeliculas}
              />
              <SeccionPelicula
                seccion="Peliculas de TV"
                generoId={obtenerGeneroId(generos.PeliculaDeTv)}
                lista={listaGlobalDePeliculas}
              />
              <SeccionPelicula
                seccion="Romance"
                generoId={obtenerGeneroId(generos.Romance)}
                lista={listaGlobalDePeliculas}
              />
              <SeccionPelicula
                seccion="Suspenso"
                generoId={obtenerGeneroId(generos.Suspenso)}
                lista={listaGlobalDePeliculas}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
