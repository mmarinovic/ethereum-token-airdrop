import * as ContractSages from './contract';
import * as Names from '../actions/names';

import { takeEvery } from 'redux-saga/effects';

export function* watchSaga(){
    yield takeEvery(Names.INIT_GET_CONTRACT_STATE, ContractSages.getState);
}