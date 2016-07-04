import { FETCH_POSTS, FETCH_POST } from '../actions/index';

// all is list of all blog posts on index page
// post is the individual active posts, begins as null
const INITIAL_STATE = { all: [], post: null };

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_POST:
      return {...state, post: action.payload.data };
    case FETCH_POSTS:
      // ...state means take current state and add the "all", which is from action.payload.data (api posts)
      return { ...state, all: action.payload.data };
    default:
      return state;
  }
}
