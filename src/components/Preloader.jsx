import React from 'react';

function Preloader(props) {
  return (
    <div className="showbox">
      <div className="loader">
        <svg className="circular" viewBox="25 25 50 50">
          <circle className="path" cx="50" cy="50" r="20" fill="none"/>
        </svg>
      </div>
    </div>
  );
}

export default Preloader;