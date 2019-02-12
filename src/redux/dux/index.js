import { combineReducers } from 'redux';
import userReducer from './user';
import activityReducer from './activity';
import eventReducer from './events';
import palReducer from './pals';
import filterReducer from './filter';

export default combineReducers({
  user: userReducer,
  activity: activityReducer,
  events: eventReducer,
  pals: palReducer,
  filter: filterReducer
});
