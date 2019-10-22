import { createStore, combineReducers, applyMiddleware } from 'redux';

import auth from '../_reducers/auth';
import toon from '../_reducers/toon';
import mytoon from '../_reducers/mytoon';
import thunk from 'redux-thunk';

// this global states
const reducers = combineReducers({
  auth,
  toon,
  mytoon
});

export default createStore(reducers, applyMiddleware(thunk));