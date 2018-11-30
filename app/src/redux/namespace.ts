import { IAction } from '../types/redux';
import { IContractState } from  '../types/contract';

export interface IReduxState {
    contractState: IContractState
}

export type GetContractStateAction = IAction<'GET_CONTRACT_STATE', IContractState>;
export type Action = GetContractStateAction;