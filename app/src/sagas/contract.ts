import { put } from 'redux-saga/effects';
import * as Names from '../actions/names';

// import tokenDistribution from '../contracts/TokenDistribution';

export function* getState(){
    // There is a bug in Web3 1.0 beta. Parsing errors for uint
    // const remainingAllocationForDevelopes: number = yield tokenDistribution.methods.remainingAllocationForDevelopers().call();
    // const remainingAllocationForPresale: number = yield tokenDistribution.methods.remainingAllocationForPresale().call();
    // const remainingTotalSupply: number = yield tokenDistribution.methods.remainingTotalSupply().call();
    // const startTime: number = yield tokenDistribution.methods.startTime().call();

    yield put({
        type: Names.GET_CONTRACT_STATE,
        payload: { startTime: new Date(), remainingAllocationForDevelopers: 500, remainingAllocationForPresale: 400, remainingTotalSupply: 100 }
    })
}