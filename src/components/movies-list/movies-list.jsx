// Импорт библиотек
import React from "react";
import PropTypes from "prop-types";

// Импорт компонентов
import MovieCard from "../movie-card/movie-card.jsx";

// Импорт типов, констант, утилит
import {movieType} from "../../props/prop-types";

// Импорт хоков
import withActivePlayer from "../../hoc/with-active-player/with-active-player.js";


const MovieCardWrapped = withActivePlayer(MovieCard);


/**
 * Создание компонента, обеспечивающего отображение списков фильмов
 * на главной странице и на странице фильма в списке похожих
 * @param {Object} props параметры
 * @return {Object} созданный компонент
 */
const MoviesList = (props) => {
  const {
    countShowedMovies,
    movies,
    onMovieMouseEnter,
    onMovieMouseLeave,
    onMovieSelect
  } = props;

  return (
    <div className="catalog__movies-list">
      {movies.slice(0, countShowedMovies).map((movie) => {
        return (
          <MovieCardWrapped
            key={movie.id}
            movie={movie}
            onPlay={onMovieMouseEnter}
            onPlayingStop={onMovieMouseLeave}
            onSelect={onMovieSelect}
          />
        );
      })}
    </div>
  );
};


MoviesList.propTypes = {
  countShowedMovies: PropTypes.number.isRequired,
  movies: PropTypes.arrayOf(movieType).isRequired,
  onMovieMouseEnter: PropTypes.func.isRequired,
  onMovieMouseLeave: PropTypes.func.isRequired,
  onMovieSelect: PropTypes.func.isRequired
};


export default MoviesList;
