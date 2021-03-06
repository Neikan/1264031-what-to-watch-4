// Импорт библиотек
import moment from "moment";

// Импорт типов, констант, утилит
import {
  CountMovies,
  ALL_GENRES,
  Time,
  PAD_STRING_ZERO,
  TextualRating
} from "../consts/common-data";


/**
 * Получение массива фильмов одного жанра
 * @param {Array} movies данные фильмов
 * @param {string} genre жанр
 * @return {Array} массив фильмов выбранного жанра
 */
export const getMoviesByGenre = (movies, genre) =>
  movies.filter((movie) => movie.genre === genre);


/**
 * Получение поможих фильмов по жанру
 * @param {Array} movies данные фильмов
 * @param {string} id идентификатор фильма
 * @param {Number} count количество похожих фильмов
 * @return {Array} массив фильмов того же жанра, что и выбранный
 */
export const getLikedMoviesByGenre = (movies, id, count = CountMovies.LIKED_BY_GENRE) =>
  movies.filter((movie) => movie.id !== id).slice(0, count);


/**
 * Получение интервалов для отрисовки данных массива в колонках
 * @param {Array} array массив данных
 * @return {Object} объект с интервалами
 */
export const getIntervalForCols = (array) => {
  if (array.length === 1) {
    return [{
      begin: 0,
      end: 1
    }];
  }

  if (array.length >= 2) {
    const countHalf = Math.ceil(array.length / 2);

    return [
      {
        begin: 0,
        end: countHalf
      }, {
        begin: countHalf,
        end: array.length
      }
    ];
  }

  return null;
};


/**
 * Обновление свойства isActive для жанров
 * @param {Array} genres массив жанров
 * @param {string} selectedGenre выбранный жанр
 * @return {Array} обновленный массив
 */
export const updateGenres = (genres, selectedGenre) => genres.map((genre) =>
  Object.assign(genre, {
    isActive: genre.title === selectedGenre
  })
);


/**
 * Получение массива уникальных жанров с добавлением свойств для рендера
 * @param {Array} movies массив с данными фильмов
 * @return {Array} массив уникальных жанров фильмов со свойствами и 'All genres'
 */
export const getUniqueGenres = (movies) => {
  const uniqueGenres = [ALL_GENRES];

  movies.map((movie) => {
    if (!uniqueGenres.includes(movie.genre)) {
      uniqueGenres.push(movie.genre);
    }
  });

  return uniqueGenres.map((genre, index) => {
    return {
      [`id`]: `${genre}-${index}`,
      [`title`]: genre,
      [`isActive`]: genre === ALL_GENRES
    };
  });
};


/**
 * Проверка и добавление ведущего нуля к часам/минутам/секундам
 * @param {Number} timePart значение времени
 * @return {string} отформатированное значение
 */
const checkTimeFormat = (timePart) => timePart.toString().padStart(2, PAD_STRING_ZERO);


/**
 * Получение времени в формате 'HH:MM:SS'
 * @param {Number} time значение времени
 * @return {string} время в приведенном формате
 */
export const getTime = (time) => {
  const seconds = checkTimeFormat(Math.trunc(time % Time.SECONDS));
  const minutes = checkTimeFormat(Math.trunc(time / Time.SECONDS));
  const hours = checkTimeFormat(Math.trunc(minutes / Time.MINUTES));

  return `${hours}:${minutes}:${seconds}`;
};


/**
 * Получение текущей позиции в % для тоггла шкалы времени воспроизведения
 * @param {Number} current текущее время
 * @param {Number} duration общая длительность
 * @return {string} значение позиции
 */
export const getTimeProgress = (current, duration) => `${((current * 100) / duration)}%`;


/**
 * Получение текстового описания рейтинга фильма
 * @param {Number} score оценка фильма (значение рейтинга)
 * @return {string}
 */
export const getTextualRating = (score) => {
  if (score >= TextualRating.AWESOME.from) {
    return TextualRating.AWESOME.level;
  }

  if (score >= TextualRating.VERY_GOOD.from) {
    return TextualRating.VERY_GOOD.level;
  }

  if (score >= TextualRating.GOOD.from) {
    return TextualRating.GOOD.level;
  }

  if (score >= TextualRating.NORMAL.from) {
    return TextualRating.NORMAL.level;
  }

  if (score >= TextualRating.BAD.from) {
    return TextualRating.BAD.level;
  }

  return (``);
};


/**
 * Приведение даты к необходмому формату
 * @param {Date} date форматируемая дата
 * @param {string} formatRule правило форматирования
 * @return {string} отформатированная дата
 */
export const formatDate = (date, formatRule) => moment(date).format(formatRule);


/**
 * Приведение даты к необходмому формату
 * @param {Array} movies массив с данными фильмов
 * @param {Object} movieDatum обновленные данные фильма
 * @return {Array} массив с обновленными данными фильмов
 */
export const updateMovies = (movies, movieDatum) =>
  movies.map((movie) => movie.id === movieDatum.id ? movieDatum : movie);


/**
 * Приведение даты к необходмому формату
 * @param {Object} promo данные промо-фильма
 * @param {Object} movieDatum обновленные данные фильма
 * @return {Object} данные фильма
 */
export const updatePromo = (promo, movieDatum) => promo.id === movieDatum.id ? movieDatum : promo;
