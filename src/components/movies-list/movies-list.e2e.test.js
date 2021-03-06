// Импорт библиотек
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import {configure, mount} from "enzyme";
import {Router} from "react-router-dom";
import history from "../../history.js";

// Импорт компонентов
import MoviesList from "./movies-list.jsx";

// Импорт типов, констант, утилит
import {MarkupElement, MOVIES} from "./../../consts/test-data";


configure({
  adapter: new Adapter(),
});


describe(`Test e2e MoviesList component`, () => {
  test(`Should all titles of movies be pressed`, () => {
    const handleMovieSelect = jest.fn();
    const countShowedMovies = 1;

    const moviesList = mount(
        <Router history={history}>
          <MoviesList
            movies={MOVIES}
            countShowedMovies={countShowedMovies}
            onMovieSelect={handleMovieSelect}
            onMovieMouseEnter={() => {}}
            onMovieMouseLeave={() => {}}
          />
        </Router>
    );

    moviesList.find(`.${MarkupElement.MOVIE_CARD_TITLE}`).map((movie) => movie.props().onClick());
    moviesList.find(`.${MarkupElement.MOVIE_CARD}`).map((movie) => movie.props().onClick());

    expect(handleMovieSelect.mock.calls.length).toBe(countShowedMovies * 2);
  });
});
