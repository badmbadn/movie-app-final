import { _baseURL } from '../utilitary/constants';

export default class SessionService {
  getGuestId = async () => {
    try {
      const res = await fetch(`${_baseURL}/authentication/guest_session/new?api_key=${this._key}`);
      if (!res.ok) {
        throw Error('Server is unavailable');
      }
      const req = await res.json();
      return req.guest_session_id;
    } catch (e) {
      if (e.message === 'Failed to fetch') {
        throw Error('Server is unavailable');
      }
      throw Error(e);
    }
  };

  putSessionIdInLocalStorage = (data) => {
    try {
      localStorage.setItem('sessionId', JSON.stringify(data));
    } catch (e) {
      throw Error(e);
    }
  };

  createNewGuestSession = async () => {
    if (JSON.parse(localStorage.getItem('sessionId'))) {
      return;
    }

    const newGuestSession = await this.getGuestId();
    this.putSessionIdInLocalStorage(newGuestSession);

    return JSON.parse(localStorage.getItem('sessionId'));
  };
}
