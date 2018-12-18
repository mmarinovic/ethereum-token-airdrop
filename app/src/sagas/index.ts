import * as ContractSages from './contract';
import * as Names from '../actions/names';

import { takeLatest, all } from 'redux-saga/effects';

export function* watchSaga(){
    yield all([
        takeLatest(Names.INIT_GET_CONTRACT_STATE, ContractSages.getState),
        takeLatest(Names.INIT_AIRDROP, ContractSages.airdrop)
    ]);
}