import { GET_ARTIST_INFO } from '../constants/actionTypes';
import initialState from './initialState';

const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTIST_INFO:
      const currentSearch = {
        details: action.payload[0].data,
        events: action.payload[1].data,
        videos: action.payload[2].data.items
      };

      return { ...state, currentSearch };

    default:
      return state;
  }
};

export default HomeReducer;
