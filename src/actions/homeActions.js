import axios from 'axios';

import { BANDSINTOWN_API, YOUTUBE_API } from '../constants/apiConstants';
import { GET_ARTIST_INFO, CHANGE_LOADING_ARTIST_INFO_STATE } from '../constants/actionTypes';

const getArtistDetails = (artistName) => {
  return axios.get(BANDSINTOWN_API.BASE_URL.concat('/artists/', artistName), {
    params: {
      app_id: BANDSINTOWN_API.APP_ID
    }
  });
};

const getArtistEvents = (artistName) => {
  return axios.get(BANDSINTOWN_API.BASE_URL.concat('/artists/', artistName, '/events'), {
    params: {
      app_id: BANDSINTOWN_API.APP_ID
    }
  });
};

const getArtistVideos = artistName => {
  return axios.get(YOUTUBE_API.BASE_URL, {
    params: {
      key: YOUTUBE_API.API_KEY,
      q: artistName,
      part: 'snippet',
      order: 'relevance',
      type: 'video',
      maxResults: 30
    }
  });
};

export function updateLoadingArtistState(isLoading) {
  return (dispatch) => {
    dispatch({
      type: CHANGE_LOADING_ARTIST_INFO_STATE,
      payload: isLoading
    });
  }
}

export function getArtistInfo(artistName) {
  return dispatch => {
    const request = axios.all([getArtistDetails(artistName), getArtistEvents(artistName), getArtistVideos(artistName)]);

    dispatch({
      type: GET_ARTIST_INFO,
      payload: request
    }).then(() => {
      dispatch(updateLoadingArtistState(false));
    });
  }
}
