import { useState, useContext } from 'react';
import './MovieItem.css';
import { Rate } from 'antd';

import Poster from '../poster/poster';
import Context from '../../hooks/context';
import DescriptionCard from '../description-card/description-card';
import MovieTitle from '../movie-title/movie-title';

export default function MovieItem({ id, poster_path, genre_ids, title, overview, vote_average, release_date, rating }) {
  const { genresList, setHaveRatedMovie, saveRating, guestID, baseService } = useContext(Context);
  const [valueDefault, setValueDefault] = useState(rating);

  const searchGenreMovie = (genre_id, genreses) => {
    const result = [];
    for (let i = 0; i < genre_id.length; i++) {
      const element = genre_id[i];
      for (let j = 0; j < genreses.length; j++) {
        const item = genreses[j];
        if (item.id === element) {
          result.push(
            <button key={item.id} className="genre">
              {item.name}
            </button>
          );
        }
      }
    }
    return result;
  };

  if (!release_date) {
    release_date = null;
  }

  const changeStars = (number, movie_id, guestid) => {
    setValueDefault(number);
    baseService.postStars(number, movie_id, guestid);
    saveRating({ rating: number, id: movie_id });
    setHaveRatedMovie(true);
  };

  return (
    <div className="card-movie" key={id}>
      <div className="card-movie__left">
        <Poster posterPath={poster_path} baseService={baseService} />
      </div>
      <div className="card-movie__right">
        <div className="card-movie__info">
          <MovieTitle title={title} releaseDate={release_date} voteAverage={vote_average} />
          <div className="genres">{searchGenreMovie(genre_ids, genresList)}</div>
        </div>
        <DescriptionCard overview={overview} />
        <Rate
          id={id}
          className="rate"
          allowHalf
          count={10}
          value={valueDefault ? valueDefault : rating}
          onChange={(number) => changeStars(number, id, guestID)}
          allowClear={false}
        />
      </div>
    </div>
  );
}
