import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reducers from './reducers';

export type State = ReturnType<typeof reducers>;

const store = createStore(reducers, composeWithDevTools({ trace: true })());

export default store;