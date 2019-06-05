import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from './dux/index';

const loggerMiddleware = createLogger();

export default function configureStore(preloadedState) {
  console.log(preloadedState);
  return createStore(
    reducers,
    preloadedState,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  );
}
