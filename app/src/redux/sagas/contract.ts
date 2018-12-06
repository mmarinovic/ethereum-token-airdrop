import { put } from 'redux-saga/effects';
import * as Names from '../actions/names';

import tokenDistribution from '../../contracts/TokenDistribution';
import { IContractState } from 'src/types/contract';

export function* getState(){
    console.log(tokenDistribution)
    const state:IContractState = yield tokenDistribution.methods.getState().call();
    yield put({
        type: Names.GET_CONTRACT_STATE,
        payload: state
    })
}