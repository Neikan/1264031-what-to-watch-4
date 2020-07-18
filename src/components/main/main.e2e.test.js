import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";
import {MarkupElement, MOVIES, GENRES} from "./../../consts/test-data";


configure({
  adapter: new Adapter(),
});


describe(`Test e2e Main component`, () => {
  test(`Should 'play'-button for promo-movie be pressed`, () => {
    const handleMoviePlay = jest.fn();

    const main = mount(
        <Main
          promoMovie = {MOVIES[0]}
          movies = {MOVIES}
          genres = {GENRES}
          countShowedMovies = {1}
          onMoviePlay = {handleMoviePlay}
          onMovieAddToList = {() => {}}
          onMovieSelect = {() => {}}
          onGenreSelect = {() => {}}
          onBtnMoreSelect = {() => {}}
        />
    );

    main.find(`.${MarkupElement.PROMO_BTN_PLAY}`).props().onClick();

    expect(handleMoviePlay.mock.calls.length).toBe(1);
  });


  test(`Should 'add to list'-button for promo-movie be pressed`, () => {
    const handleMovieAddToList = jest.fn();

    const main = mount(
        <Main
          promoMovie = {MOVIES[0]}
          movies = {MOVIES}
          genres = {GENRES}
          countShowedMovies = {1}
          onMoviePlay = {() => {}}
          onMovieAddToList = {handleMovieAddToList}
          onMovieSelect = {() => {}}
          onGenreSelect = {() => {}}
          onBtnMoreSelect = {() => {}}
        />
    );

    main.find(`.${MarkupElement.PROMO_BTN_ADD_TO_LIST}`).props().onClick();

    expect(handleMovieAddToList.mock.calls.length).toBe(1);
  });


  test(`Should all titles of movies be pressed`, () => {
    const handleMovieSelect = jest.fn();
    const countShowedMovies = 1;

    const main = mount(
        <Main
          promoMovie = {MOVIES[0]}
          movies = {MOVIES}
          genres = {GENRES}
          countShowedMovies = {countShowedMovies}
          onMoviePlay = {() => {}}
          onMovieAddToList = {() => {}}
          onMovieSelect = {handleMovieSelect}
          onGenreSelect = {() => {}}
          onBtnMoreSelect = {() => {}}
        />
    );

    main.find(`.${MarkupElement.MOVIE_CARD_TITLE}`).map((movie) => movie.props().onClick());
    main.find(`.${MarkupElement.MOVIE_CARD}`).map((movie) => movie.props().onClick());

    expect(handleMovieSelect.mock.calls.length).toBe(countShowedMovies * 2);
  });


  test(`Should all titles of genres be pressed`, () => {
    const handleGenreSelect = jest.fn();

    const main = mount(
        <Main
          promoMovie = {MOVIES[0]}
          movies = {MOVIES}
          genres = {GENRES}
          countShowedMovies = {1}
          onMoviePlay = {() => {}}
          onMovieAddToList = {() => {}}
          onMovieSelect = {() => {}}
          onGenreSelect = {handleGenreSelect}
          onBtnMoreSelect = {() => {}}
        />
    );

    main.find(`.${MarkupElement.GENRE_LINK}`).map((genre) => genre.props().onClick());

    expect(handleGenreSelect.mock.calls.length).toBe(GENRES.length);
  });


  test(`Should BtnShowMore be pressed`, () => {
    const handleBtnMoreSelect = jest.fn();

    const main = mount(
        <Main
          promoMovie = {MOVIES[0]}
          movies = {MOVIES}
          genres = {GENRES}
          countShowedMovies = {1}
          onMoviePlay = {() => {}}
          onMovieAddToList = {() => {}}
          onMovieSelect = {() => {}}
          onGenreSelect = {() => {}}
          onBtnMoreSelect = {handleBtnMoreSelect}
        />
    );

    main.find(`.${MarkupElement.BTN_SHOW_MORE}`).simulate(`click`);

    expect(handleBtnMoreSelect.mock.calls.length).toBe(1);
  });
});
