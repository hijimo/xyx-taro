import { combineReducers } from 'redux';
import user from './user';
import order from './order';
import cart from './cart';
import refresh from './refresh';
import global from './global';

export default combineReducers({
  user,
  order,
  cart,
  refresh,
  global,
});
