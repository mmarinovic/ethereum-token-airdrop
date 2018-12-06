import { IAction, ISimpleAction } from '../types/redux';
import { IContractState } from  '../types/contract';

export interface IReduxState {
    contractState: IContractState
}

export type GetContractStateAction = IAction<'GET_CONTRACT_STATE', IContractState>;
export type InitGetContractStateAction = ISimpleAction<'INIT_GET_CONTRACT_STATE'>;

export type Action = GetContractStateAction;
export type InitAction = InitGetContractStateAction