import { _baseURL, _key, _posterDefault, _img } from '../utilitary/constants';

export default class BaseService {
  getResource = async (url) => {
    const res = await fetch(`${_baseURL}/${url}`);

    if (!res.ok) {
      throw new Error(res.status, 'Request error!');
    }
    return await res.json();
  };
  getGenreList = async () => {
    try {
      const res = await fetch(`${_baseURL}/genre/movie/list?api_key=${_key}`);
      if (!res.ok) {
        throw Error('Server is unavailable');
      }
      const req = await res.json();
      return req.genres;
    } catch (e) {
      if (e.message === 'Failed to fetch') {
        throw Error('Server is unavailable');
      }
      throw Error(e);
    }
  };

  movieAll = async (query, page = 1) => {
    try {
      const res = await this.getResource(`search/movie?api_key=${_key}&query=${query}&page=${page}`);
      const result = await res;
      return result;
    } catch (e) {
      if (e.message === 'Failed to fetch') {
        throw Error('Server is unavailable');
      }
      throw Error(e);
    }
  };

  popularMovie = async (page = 1) => {
    try {
      const res = await this.getResource(`movie/popular?api_key=${_key}&language=en-US&page=${page}`);
      const result = await res;
      return result;
    } catch (e) {
      if (e.message === 'Failed to fetch') {
        throw Error('Server is unavailable');
      }
      throw Error(e);
    }
  };

  defaultPoster = (poster) => {
    return poster ? _img + poster : (poster = _posterDefault);
  };

  async getRatedMovies(sessionId, page = 1) {
    try {
      const res = await fetch(
        `${_baseURL}/guest_session/${sessionId}/rated/movies?api_key=${_key}&page=${page}&sort_by=created_at.asc`
      );
      if (!res.ok) {
        throw Error('Server is unavailable');
      }
      return await res.json();
    } catch (e) {
      if (e.message === 'Failed to fetch') {
        throw Error('Server is unavailable');
      }
      throw Error(e);
    }
  }

  async postStars(number, movie_id, sessionId) {
    const ratingData = {
      value: number,
    };

    const selectFetch = `${_baseURL}/movie/${movie_id}/rating?api_key=${_key}&guest_session_id=${sessionId}`;

    fetch(selectFetch, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      body: JSON.stringify(ratingData),
    })
      .then((data) => data.json())
      .catch((err) => {
        throw new Error({ err });
      });
  }
}
