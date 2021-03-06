// Импорт библиотек
import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import {connect} from "react-redux";

// Импорт компонентов
import LinKMoviePage from "../link-movie-page/link-movie-page.jsx";
import Logo from "./../logo/logo.jsx";
import MyListTitle from "../my-list-title/my-list-title.jsx";
import UserBlock from "../user-block/user-block.jsx";

// Импорт типов, констант, утилит
import {userType, movieType} from "../../props/prop-types.js";
import {LogoPosition} from "../../consts/common-data.js";

// Импорт редьюсеров, селекторов
import {getAuthStatus, getUserDatum} from "../../store/datum-user/selectors.js";


/**
 * Создание компонента, обеспечивающего отображение "шапки" приложения
 * @param {Object} props параметры
 * @return {Object} созданный компонент
 */
const Header = (props) => {
  const {authStatus, isMyList, movie, user} = props;

  const className = cn(`page-header`, {
    'movie-card__head': !isMyList,
    'user-page__head': isMyList
  });

  return (
    <header className={className}>
      <Logo logoPosition={LogoPosition.HEADER} />

      {movie ? <LinKMoviePage movie={movie}/> : null}
      {isMyList ? <MyListTitle /> : null}

      <UserBlock
        authStatus={authStatus}
        user={user}
      />
    </header>
  );
};


Header.propTypes = {
  authStatus: PropTypes.string.isRequired,
  isMyList: PropTypes.bool,
  movie: movieType,
  user: userType.isRequired
};


const mapStateToProps = (state) => ({
  authStatus: getAuthStatus(state),
  user: getUserDatum(state)
});


export {Header};
export default connect(mapStateToProps)(Header);
