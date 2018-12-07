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
        startTime: (...args: any[]) => TransactionObject<number>,
        remainingAllocationForDevelopers: (...args: any[]) => TransactionObject<number>,
        remainingAllocationForPresale: (...args: any[]) => TransactionObject<number>,
        remainingTotalSupply: (...args: any[]) => TransactionObject<number>
    };
}