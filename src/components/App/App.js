import { useEffect, useState } from 'react';
import { Alert, Pagination } from 'antd';

import MovieList from '../movie-list/MovieList';
import BaseService from '../../service/baseService';
import SessionService from '../../service/sessionService';
import ErrorNetwork from '../errorNetwork/errorNetwork';
import Context from '../../hooks/context';
import SearchInput from '../search-input/search-input';
import Spinner from '../spinner/spiner';
import Tab from '../tabs/tabs';

import './App.css';

export default function App() {
  const [movieData, setMoviesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [tabValue, setTabValue] = useState(true);
  const [errorNetwork, setErrorNetwork] = useState(false);
  const [curPage, setCurPage] = useState(1);
  const [query, setQuery] = useState('');
  const [total, setTotal] = useState(0);
  const [guestID, setGuestID] = useState(null);
  const [genresList, setGenresList] = useState([]);
  const [flagRated, setHaveRatedMovie] = useState(false);
  const [ratedMovie, setRatedMovie] = useState([]);
  const baseService = new BaseService();
  const sessionService = new SessionService();
  useEffect(() => {
    if (!localStorage.getItem('sessionId')) {
      sessionService.createNewGuestSession().then((res) => setGuestID(res));
    }
    if (localStorage.getItem('sessionId')) {
      setHaveRatedMovie(true);
      setGuestID(JSON.parse(localStorage.getItem('sessionId')));
    }
    baseService.getGenreList().then((res) => setGenresList(res));
  }, []);

  useEffect(() => {
    if (tabValue && !query) {
      setTabValue(true);
      setLoading(true);
      baseService
        .popularMovie(curPage)
        .then((movieData) => {
          setTotal(movieData.total_results);
          setMoviesData(movieData.results);
          setError(false);
          setLoading(false);
        })
        .catch(onErrorNetwork);
    } else {
      setError(false);
      setQuery(query);
    }
    if (!tabValue) {
      setLoading(true);
      setTabValue(false);
      baseService.getRatedMovies(guestID, curPage).then((movieData) => {
        setLoading(false);
        setMoviesData(movieData.results);
        setTotal(movieData.total_results);
      });
    }
    if (guestID) {
      baseService.getRatedMovies(guestID, curPage).then((movieData) => {
        setRatedMovie(movieData.results);
      });
    }

    if (query && tabValue) {
      setErrorNetwork(false);
      setLoading(true);
      baseService
        .movieAll(query, curPage)
        .then((movieData) => {
          setTotal(movieData.total_results);
          if (movieData.results.length) {
            setLoading(false);
            setError(false);
            setMoviesData(movieData.results);
          } else {
            onError();
            setMoviesData([]);
          }
        })
        .catch(onErrorNetwork);
    } else {
      alterStates();
    }
  }, [query, tabValue, curPage, guestID]);

  useEffect(() => {
    setCurPage(1);
  }, [query]);

  const onErrorNetwork = () => {
    setErrorNetwork(true);
    setLoading(false);
    setError(false);
  };

  const onError = () => {
    setError(true);
    setLoading(false);
  };

  const alterStates = () => {
    setError(false);
    setQuery(query);
  };

  const switchTabs = (key) => {
    if (key === '2') {
      setTabValue(false);
      setError(false);
      setCurPage(1);
      setLoading(false);
    }
    if (key === '1') {
      setTabValue(true);
    }
  };

  const onChangePage = (page) => {
    setCurPage(page);
  };

  const saveRating = async (item) => {
    const stateRatedMovie = Object.assign([], ratedMovie);
    stateRatedMovie.push(item);
    setRatedMovie(stateRatedMovie);
  };
  const pagination = (
    <Pagination
      onChange={(page) => onChangePage(page)}
      current={curPage}
      total={Math.min(total, 500 * 20)}
      defaultCurrent={1}
      pageSize={20}
    />
  );
  const searchMovie = tabValue ? <SearchInput setQuery={setQuery} query={query} /> : '';
  const list = !errorNetwork && (
    <MovieList dataMovie={movieData} guestID={guestID} ratedMovie={ratedMovie} pagination={pagination} />
  );

  return (
    <div className="App">
      <Context.Provider value={{ movieData, baseService, genresList, setHaveRatedMovie, saveRating, guestID }}>
        <Tab switchTabs={switchTabs} centered />
        {searchMovie}
        {!tabValue && !flagRated && (
          <Alert message="Вы не поставили рейтинг понравившимся фильмам." className="error" />
        )}
        {error && tabValue && <Alert message="Внимание! Поиск не дал результатов." className="error" />}
        {errorNetwork ? ErrorNetwork : null}
        {loading ? <Spinner /> : null}
        {!loading ? list : null}
      </Context.Provider>
    </div>
  );
}
