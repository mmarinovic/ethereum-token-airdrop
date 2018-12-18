import * as N from '../namespace';
import * as Names from './names';

export function getContractState(): N.InitGetContractStateAction{
    return {
        type: Names.INIT_GET_CONTRACT_STATE
    }
}

export function airdrop(addresses: string[]): N.InitAirdrop {
    return {
        type: Names.INIT_AIRDROP,
        payload: addresses
    }
}