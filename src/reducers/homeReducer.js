import { GET_ARTIST_INFO, CHANGE_LOADING_ARTIST_INFO_STATE } from '../constants/actionTypes';

const initialState = {
  isLoadingArtistInfo: false,
  currentSearch: null
};

const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTIST_INFO:
      const currentSearch = {
        details: action.payload[0].data,
        events: action.payload[1].data,
        videos: action.payload[2].data.items
      };

      return { ...state, currentSearch };

    case CHANGE_LOADING_ARTIST_INFO_STATE:
      return { ...state, isLoadingArtistInfo: action.payload };

    default:
      return state;
  }
};

export default HomeReducer;
