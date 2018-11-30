import { combineReducers } from 'redux';

import contractStateReducer from './contractStateReducer';

const rootReducer = combineReducers({
  contractState: contractStateReducer
});

export default rootReducer;