import React from 'react';

import './MovieList.css';
import MovieItem from '../movie-item/MovieItem';

export default function MovieList({ dataMovie, ratedMovie, pagination }) {
  const listItems = dataMovie.map((movie) => {
    if (ratedMovie) {
      ratedMovie.map((movie2) => {
        const movie1 = movie;
        if (movie1.id === movie2.id) {
          movie1.rating = movie2.rating;
        }
        return movie1.rating;
      });
      return (
        <li key={movie.id} className="movies">
          <MovieItem {...movie} />
        </li>
      );
    }

    return (
      <li key={movie.id} className="movies">
        <MovieItem {...movie} />
      </li>
    );
  });
  if (listItems.length === 0) {
    return <ul className="movie-list">{listItems}</ul>;
  }
  return (
    <>
      <ul className="movie-list">{listItems}</ul>
      <div className="paginat">{pagination}</div>
    </>
  );
}
