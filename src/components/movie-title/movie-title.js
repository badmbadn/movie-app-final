import React from 'react';
import { format } from 'date-fns';

import { colorRating } from '../../utilitary/colorRating';
import './movie-title.css';

function MovieTitle({ title, releaseDate, voteAverage }) {
  return (
    <>
      <h5 className="card-movie__title">{title}</h5>
      <div className={colorRating(voteAverage).join(' ')}>
        <p className="ratingNumber">{voteAverage}</p>
      </div>
      <span className="card-movie__date">{format(new Date(releaseDate), 'PPP')}</span>
    </>
  );
}

export default MovieTitle;
