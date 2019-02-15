import { combineReducers } from 'redux';
import userReducer from './user';
import userEventsReducere from './userEvents';
import userPalsReducers from './userPals';
import activityReducer from './activity';
import activityEventReducer from './activityEvents';
import activityPalReducer from './activityPals';
import filterReducer from './filter';

export default combineReducers({
  user: userReducer,
  userEvents: userEventsReducere,
  userPals: userPalsReducers,
  activity: activityReducer,
  activityEvents: activityEventReducer,
  activityPals: activityPalReducer,
  filter: filterReducer
});
