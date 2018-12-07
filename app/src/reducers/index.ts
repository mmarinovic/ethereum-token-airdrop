import { combineReducers } from 'redux';

import contractStateReducer from './contractState';

const rootReducer = combineReducers({
  contractState: contractStateReducer
});

export default rootReducer;