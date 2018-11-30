import { IAction } from '../types/redux';

export interface IReduxState {
    web3: any;
}

export type UnlockWithMetaMaskAction = IAction<'UNLOCK_WITH_METAMASK', any>;
export type Action = UnlockWithMetaMaskAction;