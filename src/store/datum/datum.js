// Импорт типов, констант, утилит
import {CountMovies, ALL_GENRES} from "../../consts/common-data";
import {getMoviesByGenre, updateGenres, getUniqueGenres} from "../../utils/common";
import {updateState} from "../../utils/reducer";


const initialState = {
  movies: [],
  promoMovie: null,
  likedMovies: [],
  countShowedMovies: CountMovies.START,
  isPlayingMovie: false,

  genres: [],
  selectedGenre: ALL_GENRES,

  isLoadingReviews: true,
  isLoadingMovies: true,
  isLoadingPromo: true,

  reviews: []
};


const ActionType = {
  CHANGE_PLAYING_MOVIE: `change playing movie`,
  LOAD_MOVIES: `load movies`,
  LOAD_PROMO_MOVIE: `load promo movie`,
  SELECT_GENRE: `select genre`,
  SET_LIKED_MOVIES: `set liked movies`,
  SHOW_MORE: `show more`,

  IS_LOADING_MOVIES: `is loading movies`,
  IS_LOADING_PROMO_MOVIE: `is loading promo movie`,
  IS_LOADING_REVIEWS: `is loading reviews`,

  SET_REVIEWS: `set reviews`
};


const ActionCreator = {
  changePlayingMovie: () => ({
    type: ActionType.CHANGE_PLAYING_MOVIE,
    payload: null
  }),

  isLoadingMovies: (flag) => ({
    type: ActionType.IS_LOADING_MOVIES,
    payload: flag
  }),

  isLoadingPromo: (flag) => ({
    type: ActionType.IS_LOADING_PROMO_MOVIE,
    payload: flag
  }),

  isLoadingReviews: (flag) => ({
    type: ActionType.IS_LOADING_REVIEWS,
    payload: flag
  }),

  loadMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: movies
  }),

  loadPromoMovie: (movie) => ({
    type: ActionType.LOAD_PROMO_MOVIE,
    payload: movie
  }),

  selectGenre: (genre) => ({
    type: ActionType.SELECT_GENRE,
    payload: genre
  }),

  setLikedMovies: (movie) => ({
    type: ActionType.SET_LIKED_MOVIES,
    payload: movie
  }),

  setReviews: (reviews) => ({
    type: ActionType.SET_REVIEWS,
    payload: reviews
  }),

  showMore: () => ({
    type: ActionType.SHOW_MORE,
    payload: CountMovies.START
  })
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_PLAYING_MOVIE:
      return updateState(state, {
        isPlayingMovie: !state.isPlayingMovie
      });

    case ActionType.IS_LOADING_MOVIES:
      return updateState(state, {
        isLoadingMovies: action.payload
      });

    case ActionType.IS_LOADING_PROMO_MOVIE:
      return updateState(state, {
        isLoadingPromo: action.payload
      });

    case ActionType.IS_LOADING_REVIEWS:
      return updateState(state, {
        isLoadingReviews: action.payload
      });

    case ActionType.LOAD_MOVIES:
      return updateState(state, {
        movies: action.payload,
        likedMovies: action.payload,
        genres: getUniqueGenres(action.payload)
      });

    case ActionType.LOAD_PROMO_MOVIE:
      return updateState(state, {
        promoMovie: action.payload
      });

    case ActionType.SELECT_GENRE:
      return updateState(state, {
        likedMovies: getMoviesByGenre(state.movies, action.payload),
        genres: updateGenres(state.genres, action.payload),
        selectedGenre: action.payload,
        countShowedMovies: CountMovies.START
      });

    case ActionType.SET_LIKED_MOVIES:
      return updateState(state, {
        likedMovies: getMoviesByGenre(state.movies, action.payload.genre),
      });

    case ActionType.SET_REVIEWS:
      return updateState(state, {
        reviews: action.payload
      });

    case ActionType.SHOW_MORE:
      return updateState(state, {
        countShowedMovies: state.countShowedMovies + action.payload
      });

    default:
      return state;
  }
};


export {reducer, ActionType, ActionCreator};
