import Contract from 'web3/eth/contract';
import { TransactionObject } from 'web3/eth/types';

export interface IContractState{
    startTime: Date;
    remainingAllocationForDevelopers: number,
    remainingAllocationForPresale: number,
    remainingTotalSupply: number
}

export class TokenDistributionContract extends Contract{
    public methods: {
        getState: (...args: any[]) => TransactionObject<IContractState>
    };
}