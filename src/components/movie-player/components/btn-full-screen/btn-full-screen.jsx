import React from "react";
import PropTypes from "prop-types";


const BtnFullScreen = (props) => {
  return (
    <button type="button" className="player__full-screen"
      onClick={() => props.onSelect()}
    >
      <svg viewBox="0 0 27 27" width="27" height="27">
        <use xlinkHref="#full-screen"></use>
      </svg>
      <span>Full screen</span>
    </button>
  );
};


BtnFullScreen.propTypes = {
  onSelect: PropTypes.func.isRequired
};


export default BtnFullScreen;