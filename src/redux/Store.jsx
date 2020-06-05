/* 
Set up Redux Store
*/
import {
  applyMiddleware,
  bindActionCreators,
  combineReducers,
  compose,
  createStore,
} from 'redux';

import reduxThunk from 'redux-thunk';
import * as actionCreators from './Actions';
import DefaultState from './DefaultState';
import * as reducers from './Reducers';

const rootReducer = combineReducers({
  ...reducers,
});
const enhancers = compose(
  applyMiddleware(reduxThunk),
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
    : (f) => f,
);

const Store = createStore(rootReducer, DefaultState, enhancers);
export default Store;

export function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}
