import React from 'react';

import './poster.css';

function Poster({ posterPath, baseService }) {
  return (
    <>
      <img className="card-movie__img" alt="icon" src={baseService.defaultPoster(posterPath)} />
    </>
  );
}

export default Poster;
