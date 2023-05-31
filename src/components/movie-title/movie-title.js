import React from 'react';
import { format } from 'date-fns';
import './movie-title.css';

function MovieTitle({ title, releaseDate, voteAverage }) {
  function colorRating(number) {
    const raiting = ['rating'];

    if (number < 3) {
      raiting.push('cirrcleColor1');
    } else if (number >= 3 && number < 5) {
      raiting.push('cirrcleColor2');
    } else if (number >= 5 && number < 7) {
      raiting.push('cirrcleColor3');
    } else {
      raiting.push('cirrcleColor4');
    }

    return raiting;
  }
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
