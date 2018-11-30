import * as tokenDistribution from '../../contracts/TokenDistribution'

import * as Names from './names';
import * as N from '../namespace';

export function getContractState(): N.GetContractStateAction{
    const token = await TokenDistribution;
    tokenDistributionPromise.
    return {
        type: Names.GET_CONTRACT_STATE,
        payload: token.default.
    }
}