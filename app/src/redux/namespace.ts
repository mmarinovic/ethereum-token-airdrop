import { IAction } from '../types/redux';
import { IContractState } from  '../types/contract';

export interface IReduxState {
    web3: any;
}

export type GetContractStateAction = IAction<'GET_CONTRACT_STATE', IContractState>;
export type Action = GetContractStateAction;