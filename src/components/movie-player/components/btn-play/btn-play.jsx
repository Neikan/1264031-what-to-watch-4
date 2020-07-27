// Импорт библиотек
import React from "react";


/**
 * Создание компонента, обеспечивающего перевод проигрывателя в режим воспроизведения
 * @return {Object} созданный компонент
 */
const BtnPlay = () => {
  return (
    <>
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"></use>
      </svg>
      <span>Play</span>
    </>
  );
};


export default BtnPlay;
