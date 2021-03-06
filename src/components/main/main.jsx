// Импорт библиотек
import React from "react";
import PropTypes from "prop-types";

// Импорт компонентов
import BtnShowMore from "../btn-show-more/btn-show-more.jsx";
import Footer from "../footer/footer.jsx";
import GenresList from "../genres-list/genres-list.jsx";
import Header from "../header/header.jsx";
import MovieBackground from "../movie-background/movie-background.jsx";
import MoviesList from "../movies-list/movies-list.jsx";
import Promo from "../promo/promo.jsx";

// Импорт типов, констант, утилит
import {movieType, genreType} from "../../props/prop-types.js";

// Импорт хоков
import withSelectedMovie from "../../hoc/with-selected-movie/with-selected-movie.js";


const MoviesListWrapped = withSelectedMovie(MoviesList);


/**
 * Создание компонента, обеспечивающего отображение главной страницы приложения
 * @param {Object} props параметры
 * @return {Object} созданный компонент
 */
const Main = (props) => {
  const {
    countShowedMovies,
    genres,
    movies,
    onMovieChangeMyList,
    onMovieChangePlaying,
    onMovieSelect,
    onGenreSelect,
    onShowMore,
    promoMovie
  } = props;

  const {backgroundImage, title} = promoMovie;

  const isShowMore = movies.length > countShowedMovies;

  return (
    <>
      <section className="movie-card">
        <MovieBackground
          backgroundImage={backgroundImage}
          title={title}
        />
        <h1 className="visually-hidden">WTW</h1>
        <Header />

        <Promo
          movie={promoMovie}
          onChangePlaying={onMovieChangePlaying}
          onChangeMyList={onMovieChangeMyList}
          onSelect={onMovieSelect}
        />
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList
            genres={genres}
            onGenreSelect={onGenreSelect}
          />
          <div>
            <MoviesListWrapped
              movies={movies}
              countShowedMovies={countShowedMovies}
              onMovieSelect={onMovieSelect}
            />

            {isShowMore ? <BtnShowMore onShowMore={onShowMore} /> : null}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};


Main.propTypes = {
  countShowedMovies: PropTypes.number.isRequired,
  genres: PropTypes.arrayOf(genreType).isRequired,
  movies: PropTypes.arrayOf(movieType).isRequired,

  onMovieChangeMyList: PropTypes.func.isRequired,
  onMovieChangePlaying: PropTypes.func.isRequired,
  onMovieSelect: PropTypes.func.isRequired,
  onGenreSelect: PropTypes.func.isRequired,
  onShowMore: PropTypes.func.isRequired,

  promoMovie: movieType.isRequired
};


export default Main;
