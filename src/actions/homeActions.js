import axios from 'axios';
import { push } from 'react-router-redux';

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

export function getArtistInfo(artistName) {
  const request = axios.all([getArtistDetails(artistName), getArtistEvents(artistName), getArtistVideos(artistName)]);

  return {
    type: GET_ARTIST_INFO,
    payload: request
  }
}

export function getArtistInfoFromCache() {
  return {
    type: GET_ARTIST_INFO,
    payload: JSON.parse(localStorage.getItem('lastSearch'))
  }
}

export function updateLoadingArtistState(isLoading) {
  return {
    type: CHANGE_LOADING_ARTIST_INFO_STATE,
    payload: isLoading
  }
}
