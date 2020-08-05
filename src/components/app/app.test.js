// Импорт библиотек
import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

// Импорт компонентов
import App from "./app.jsx";

// Импорт типов, констант, утилит
import {CountMovies, MOVIES, GENRES, UserDatumState, UserDatumStateNoAuth} from "./../../consts/test-data";
import {getMoviesByGenre} from "../../utils/common.js";
import NameSpace from "../../store/name-space.js";


const mockStore = configureStore([]);


describe(`Test App component`, () => {
  test(`App component is created and rendered correctly when page is Main`, () => {
    const store = mockStore({
      [NameSpace.DATUM]: {
        movies: MOVIES,
        promoMovie: MOVIES[0],
        likedMovies: getMoviesByGenre(MOVIES, GENRES[1]),
        countShowedMovies: CountMovies.START,
        isPlayingMovie: false,

        genres: GENRES,
        selectedGenre: GENRES[0].title
      },
      [NameSpace.DATUM_USER]: UserDatumState
    });


    const tree = renderer.create(
        <Provider store={store}>
          <App />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });


  test(`App component is created and rendered correctly when page is Movie`, () => {
    const store = mockStore({
      [NameSpace.DATUM]: {
        movies: MOVIES,
        promoMovie: MOVIES[0],
        selectedMovie: MOVIES[1],
        likedMovies: getMoviesByGenre(MOVIES, GENRES[1]),
        countShowedMovies: CountMovies.START,
        isPlayingMovie: false,

        genres: GENRES,
        selectedGenre: GENRES[0].title
      },
      [NameSpace.DATUM_USER]: UserDatumState
    });


    const tree = renderer.create(
        <Provider store={store}>
          <App />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });


  test(`App component is created and rendered correctly when select Genre`, () => {
    const store = mockStore({
      [NameSpace.DATUM]: {
        movies: MOVIES,
        promoMovie: MOVIES[0],
        selectedMovie: MOVIES[0],
        likedMovies: getMoviesByGenre(MOVIES, GENRES[1]),
        countShowedMovies: CountMovies.START,
        isPlayingMovie: false,

        genres: GENRES,
        selectedGenre: GENRES[1].title
      },
      [NameSpace.DATUM_USER]: UserDatumState
    });


    const tree = renderer.create(
        <Provider store={store}>
          <App />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });


  test(`App component is created and rendered correctly when authStatus === NO_AUTH`, () => {
    const store = mockStore({
      [NameSpace.DATUM]: {
        movies: MOVIES,
        promoMovie: MOVIES[0],
        selectedMovie: MOVIES[0],
        likedMovies: getMoviesByGenre(MOVIES, GENRES[1]),
        countShowedMovies: CountMovies.START,
        isPlayingMovie: false,

        genres: GENRES,
        selectedGenre: GENRES[1].title
      },
      [NameSpace.DATUM_USER]: UserDatumStateNoAuth
    });


    const tree = renderer.create(
        <Provider store={store}>
          <App />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
