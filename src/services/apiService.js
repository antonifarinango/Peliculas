import axios from "axios";

const PELICULAS = `https://api.themoviedb.org/3/discover/movie?language=es-ES&page=`;

const GENEROS = "https://api.themoviedb.org/3/genre/movie/list?language=es";

const acceso = {
  headers: {
    accept: "application/json",
  },
};

class ApiServiceMovie {
  async mostrarPeliculas(page) {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const response = await axios.get(`${PELICULAS}${page}&api_key=${apiKey}`, acceso);
      return response.data.results;
    } catch (error) {
      console.error("Error al obtener películas:", error);
      return [];
    }
  }

  async generosPeliculas() {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const response = await axios.get(`${GENEROS}&api_key=${apiKey}`, acceso);
      return response.data.genres;
    } catch (error) {
      console.error("Error al obtener géneros:", error);
      return [];
    }
  }
}

export default new ApiServiceMovie();
