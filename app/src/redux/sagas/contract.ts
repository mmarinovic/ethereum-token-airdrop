import { put } from 'redux-saga/effects';
import * as Names from '../actions/names';

import tokenDistribution from '../../contracts/TokenDistribution';

export function* getState(){
    const state = yield tokenDistribution.methods.getState().call();
    console.log(state);
    yield put({
        type: Names.GET_CONTRACT_STATE,
        payload: state
    })
}