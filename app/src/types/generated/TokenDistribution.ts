
import { BigNumber } from 'bignumber.js';
import { W3, SoltsiceContract } from 'soltsice';

/**
 * TokenDistribution API
 */
export class TokenDistribution extends SoltsiceContract {
    public static get artifacts() { return require('../../../../build/contracts/TokenDistribution.json'); }

    public static get bytecodeHash() {
        // we need this before ctor, but artifacts are static and we cannot pass it to the base class, so need to generate
        let artifacts = TokenDistribution.artifacts;
        if (!artifacts || !artifacts.bytecode) {
            return undefined;
        }
        let hash = W3.sha3(JSON.stringify(artifacts.bytecode));
        return hash;
    }

    // tslint:disable-next-line:max-line-length
    public static async new(deploymentParams: W3.TX.TxParams, ctorParams?: {_startTime: BigNumber | number}, w3?: W3, link?: SoltsiceContract[], privateKey?: string): Promise<TokenDistribution> {
        w3 = w3 || W3.default;
        if (!privateKey) {
            let contract = new TokenDistribution(deploymentParams, ctorParams, w3, link);
            await contract._instancePromise;
            return contract;
        } else {
            let data = TokenDistribution.newData(ctorParams, w3);
            let txHash = await w3.sendSignedTransaction(W3.zeroAddress, privateKey, data, deploymentParams);
            let txReceipt = await w3.waitTransactionReceipt(txHash);
            let rawAddress = txReceipt.contractAddress;
            let contract = await TokenDistribution.at(rawAddress, w3);
            return contract;
        }
    }

    public static async at(address: string | object, w3?: W3): Promise<TokenDistribution> {
        let contract = new TokenDistribution(address, undefined, w3, undefined);
        await contract._instancePromise;
        return contract;
    }

    public static async deployed(w3?: W3): Promise<TokenDistribution> {
        let contract = new TokenDistribution('', undefined, w3, undefined);
        await contract._instancePromise;
        return contract;
    }

    // tslint:disable-next-line:max-line-length
    public static newData(ctorParams?: {_startTime: BigNumber | number}, w3?: W3): string {
        // tslint:disable-next-line:max-line-length
        let data = SoltsiceContract.newDataImpl(w3, TokenDistribution.artifacts, ctorParams ? [ctorParams!._startTime] : []);
        return data;
    }

    protected constructor(
        deploymentParams: string | W3.TX.TxParams | object,
        ctorParams?: {_startTime: BigNumber | number},
        w3?: W3,
        link?: SoltsiceContract[]
    ) {
        // tslint:disable-next-line:max-line-length
        super(
            w3,
            TokenDistribution.artifacts,
            ctorParams ? [ctorParams!._startTime] : [],
            deploymentParams,
            link
        );
    }
    /*
        Contract methods
    */
    
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:variable-name
    public remainingAllocationForPresale( txParams?: W3.TX.TxParams): Promise<BigNumber> {
        return new Promise((resolve, reject) => {
            this._instance.remainingAllocationForPresale
                .call( txParams || this._sendParams)
                .then((res: any) => resolve(res))
                .catch((err: any) => reject(err));
        });
    }
    
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:variable-name
    public allocations(_0: string, txParams?: W3.TX.TxParams): Promise<any> {
        return new Promise((resolve, reject) => {
            this._instance.allocations
                .call(_0, txParams || this._sendParams)
                .then((res: any) => resolve(res))
                .catch((err: any) => reject(err));
        });
    }
    
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:variable-name
    public remainingTotalSupply( txParams?: W3.TX.TxParams): Promise<BigNumber> {
        return new Promise((resolve, reject) => {
            this._instance.remainingTotalSupply
                .call( txParams || this._sendParams)
                .then((res: any) => resolve(res))
                .catch((err: any) => reject(err));
        });
    }
    
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:variable-name
    public remainingAllocationForDevelopers( txParams?: W3.TX.TxParams): Promise<BigNumber> {
        return new Promise((resolve, reject) => {
            this._instance.remainingAllocationForDevelopers
                .call( txParams || this._sendParams)
                .then((res: any) => resolve(res))
                .catch((err: any) => reject(err));
        });
    }
    
    // tslint:disable-next-line:member-ordering
    public renounceOwnership = Object.assign(
        // tslint:disable-next-line:max-line-length
        // tslint:disable-next-line:variable-name
        ( txParams?: W3.TX.TxParams, privateKey?: string): Promise<W3.TX.TransactionResult> => {
            if (!privateKey) {
                return new Promise((resolve, reject) => {
                    this._instance.renounceOwnership( txParams || this._sendParams)
                        .then((res: any) => resolve(res))
                        .catch((err: any) => reject(err));
                });
            } else {
                // tslint:disable-next-line:max-line-length
                return this.w3.sendSignedTransaction(this.address, privateKey, this._instance.renounceOwnership.request().params[0].data, txParams || this._sendParams, undefined)
                    .then(txHash => {
                        return this.waitTransactionReceipt(txHash);
                    });
            }
        },
        {
            // tslint:disable-next-line:max-line-length
            // tslint:disable-next-line:variable-name
            sendTransaction: Object.assign(( txParams?: W3.TX.TxParams): Promise<string> => {
                    return new Promise((resolve, reject) => {
                        this._instance.renounceOwnership.sendTransaction( txParams || this._sendParams)
                            .then((res: any) => resolve(res))
                            .catch((err: any) => reject(err));
                    });
                },
                {
                    // tslint:disable-next-line:max-line-length
                    // tslint:disable-next-line:variable-name
                    sendSigned: ( privateKey: string, txParams?: W3.TX.TxParams, nonce?: number): Promise<string> => {
                        // tslint:disable-next-line:max-line-length
                        return this.w3.sendSignedTransaction(this.address, privateKey, this._instance.renounceOwnership.request().params[0].data, txParams || this._sendParams, nonce);
                    }
                }
            )
        },
        {
            // tslint:disable-next-line:max-line-length
            // tslint:disable-next-line:variable-name
            data: (): Promise<string> => {
                return new Promise((resolve, reject) => {
                    resolve(this._instance.renounceOwnership.request().params[0].data);
                });
            }
        },
        {
            // tslint:disable-next-line:max-line-length
            // tslint:disable-next-line:variable-name
            estimateGas: (): Promise<number> => {
                return new Promise((resolve, reject) => {
                    this._instance.renounceOwnership.estimateGas().then((g: any) => resolve(g)).catch((err: any) => reject(err));
                });
            }
        });
    
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:variable-name
    public startTime( txParams?: W3.TX.TxParams): Promise<BigNumber> {
        return new Promise((resolve, reject) => {
            this._instance.startTime
                .call( txParams || this._sendParams)
                .then((res: any) => resolve(res))
                .catch((err: any) => reject(err));
        });
    }
    
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:variable-name
    public airdrops(_0: string, txParams?: W3.TX.TxParams): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this._instance.airdrops
                .call(_0, txParams || this._sendParams)
                .then((res: any) => resolve(res))
                .catch((err: any) => reject(err));
        });
    }
    
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:variable-name
    public owner( txParams?: W3.TX.TxParams): Promise<string> {
        return new Promise((resolve, reject) => {
            this._instance.owner
                .call( txParams || this._sendParams)
                .then((res: any) => resolve(res))
                .catch((err: any) => reject(err));
        });
    }
    
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:variable-name
    public isOwner( txParams?: W3.TX.TxParams): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this._instance.isOwner
                .call( txParams || this._sendParams)
                .then((res: any) => resolve(res))
                .catch((err: any) => reject(err));
        });
    }
    
    // tslint:disable-next-line:member-ordering
    public transferOwnership = Object.assign(
        // tslint:disable-next-line:max-line-length
        // tslint:disable-next-line:variable-name
        (newOwner: string, txParams?: W3.TX.TxParams, privateKey?: string): Promise<W3.TX.TransactionResult> => {
            if (!privateKey) {
                return new Promise((resolve, reject) => {
                    this._instance.transferOwnership(newOwner, txParams || this._sendParams)
                        .then((res: any) => resolve(res))
                        .catch((err: any) => reject(err));
                });
            } else {
                // tslint:disable-next-line:max-line-length
                return this.w3.sendSignedTransaction(this.address, privateKey, this._instance.transferOwnership.request(newOwner).params[0].data, txParams || this._sendParams, undefined)
                    .then(txHash => {
                        return this.waitTransactionReceipt(txHash);
                    });
            }
        },
        {
            // tslint:disable-next-line:max-line-length
            // tslint:disable-next-line:variable-name
            sendTransaction: Object.assign((newOwner: string, txParams?: W3.TX.TxParams): Promise<string> => {
                    return new Promise((resolve, reject) => {
                        this._instance.transferOwnership.sendTransaction(newOwner, txParams || this._sendParams)
                            .then((res: any) => resolve(res))
                            .catch((err: any) => reject(err));
                    });
                },
                {
                    // tslint:disable-next-line:max-line-length
                    // tslint:disable-next-line:variable-name
                    sendSigned: (newOwner: string, privateKey: string, txParams?: W3.TX.TxParams, nonce?: number): Promise<string> => {
                        // tslint:disable-next-line:max-line-length
                        return this.w3.sendSignedTransaction(this.address, privateKey, this._instance.transferOwnership.request(newOwner).params[0].data, txParams || this._sendParams, nonce);
                    }
                }
            )
        },
        {
            // tslint:disable-next-line:max-line-length
            // tslint:disable-next-line:variable-name
            data: (newOwner: string): Promise<string> => {
                return new Promise((resolve, reject) => {
                    resolve(this._instance.transferOwnership.request(newOwner).params[0].data);
                });
            }
        },
        {
            // tslint:disable-next-line:max-line-length
            // tslint:disable-next-line:variable-name
            estimateGas: (newOwner: string): Promise<number> => {
                return new Promise((resolve, reject) => {
                    this._instance.transferOwnership.estimateGas(newOwner).then((g: any) => resolve(g)).catch((err: any) => reject(err));
                });
            }
        });
    
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:variable-name
    public token( txParams?: W3.TX.TxParams): Promise<string> {
        return new Promise((resolve, reject) => {
            this._instance.token
                .call( txParams || this._sendParams)
                .then((res: any) => resolve(res))
                .catch((err: any) => reject(err));
        });
    }
    
    // tslint:disable-next-line:member-ordering
    public airdrop = Object.assign(
        // tslint:disable-next-line:max-line-length
        // tslint:disable-next-line:variable-name
        (_addresses: string[], txParams?: W3.TX.TxParams, privateKey?: string): Promise<W3.TX.TransactionResult> => {
            if (!privateKey) {
                return new Promise((resolve, reject) => {
                    this._instance.airdrop(_addresses, txParams || this._sendParams)
                        .then((res: any) => resolve(res))
                        .catch((err: any) => reject(err));
                });
            } else {
                // tslint:disable-next-line:max-line-length
                return this.w3.sendSignedTransaction(this.address, privateKey, this._instance.airdrop.request(_addresses).params[0].data, txParams || this._sendParams, undefined)
                    .then(txHash => {
                        return this.waitTransactionReceipt(txHash);
                    });
            }
        },
        {
            // tslint:disable-next-line:max-line-length
            // tslint:disable-next-line:variable-name
            sendTransaction: Object.assign((_addresses: string[], txParams?: W3.TX.TxParams): Promise<string> => {
                    return new Promise((resolve, reject) => {
                        this._instance.airdrop.sendTransaction(_addresses, txParams || this._sendParams)
                            .then((res: any) => resolve(res))
                            .catch((err: any) => reject(err));
                    });
                },
                {
                    // tslint:disable-next-line:max-line-length
                    // tslint:disable-next-line:variable-name
                    sendSigned: (_addresses: string[], privateKey: string, txParams?: W3.TX.TxParams, nonce?: number): Promise<string> => {
                        // tslint:disable-next-line:max-line-length
                        return this.w3.sendSignedTransaction(this.address, privateKey, this._instance.airdrop.request(_addresses).params[0].data, txParams || this._sendParams, nonce);
                    }
                }
            )
        },
        {
            // tslint:disable-next-line:max-line-length
            // tslint:disable-next-line:variable-name
            data: (_addresses: string[]): Promise<string> => {
                return new Promise((resolve, reject) => {
                    resolve(this._instance.airdrop.request(_addresses).params[0].data);
                });
            }
        },
        {
            // tslint:disable-next-line:max-line-length
            // tslint:disable-next-line:variable-name
            estimateGas: (_addresses: string[]): Promise<number> => {
                return new Promise((resolve, reject) => {
                    this._instance.airdrop.estimateGas(_addresses).then((g: any) => resolve(g)).catch((err: any) => reject(err));
                });
            }
        });
    
    // tslint:disable-next-line:member-ordering
    public addAllocation = Object.assign(
        // tslint:disable-next-line:max-line-length
        // tslint:disable-next-line:variable-name
        (_address: string, _amount: BigNumber | number, _type: BigNumber | number, _lockedUntil: BigNumber | number, txParams?: W3.TX.TxParams, privateKey?: string): Promise<W3.TX.TransactionResult> => {
            if (!privateKey) {
                return new Promise((resolve, reject) => {
                    this._instance.addAllocation(_address, _amount, _type, _lockedUntil, txParams || this._sendParams)
                        .then((res: any) => resolve(res))
                        .catch((err: any) => reject(err));
                });
            } else {
                // tslint:disable-next-line:max-line-length
                return this.w3.sendSignedTransaction(this.address, privateKey, this._instance.addAllocation.request(_address, _amount, _type, _lockedUntil).params[0].data, txParams || this._sendParams, undefined)
                    .then(txHash => {
                        return this.waitTransactionReceipt(txHash);
                    });
            }
        },
        {
            // tslint:disable-next-line:max-line-length
            // tslint:disable-next-line:variable-name
            sendTransaction: Object.assign((_address: string, _amount: BigNumber | number, _type: BigNumber | number, _lockedUntil: BigNumber | number, txParams?: W3.TX.TxParams): Promise<string> => {
                    return new Promise((resolve, reject) => {
                        this._instance.addAllocation.sendTransaction(_address, _amount, _type, _lockedUntil, txParams || this._sendParams)
                            .then((res: any) => resolve(res))
                            .catch((err: any) => reject(err));
                    });
                },
                {
                    // tslint:disable-next-line:max-line-length
                    // tslint:disable-next-line:variable-name
                    sendSigned: (_address: string, _amount: BigNumber | number, _type: BigNumber | number, _lockedUntil: BigNumber | number, privateKey: string, txParams?: W3.TX.TxParams, nonce?: number): Promise<string> => {
                        // tslint:disable-next-line:max-line-length
                        return this.w3.sendSignedTransaction(this.address, privateKey, this._instance.addAllocation.request(_address, _amount, _type, _lockedUntil).params[0].data, txParams || this._sendParams, nonce);
                    }
                }
            )
        },
        {
            // tslint:disable-next-line:max-line-length
            // tslint:disable-next-line:variable-name
            data: (_address: string, _amount: BigNumber | number, _type: BigNumber | number, _lockedUntil: BigNumber | number): Promise<string> => {
                return new Promise((resolve, reject) => {
                    resolve(this._instance.addAllocation.request(_address, _amount, _type, _lockedUntil).params[0].data);
                });
            }
        },
        {
            // tslint:disable-next-line:max-line-length
            // tslint:disable-next-line:variable-name
            estimateGas: (_address: string, _amount: BigNumber | number, _type: BigNumber | number, _lockedUntil: BigNumber | number): Promise<number> => {
                return new Promise((resolve, reject) => {
                    this._instance.addAllocation.estimateGas(_address, _amount, _type, _lockedUntil).then((g: any) => resolve(g)).catch((err: any) => reject(err));
                });
            }
        });
    
    // tslint:disable-next-line:member-ordering
    public withdrawAllocation = Object.assign(
        // tslint:disable-next-line:max-line-length
        // tslint:disable-next-line:variable-name
        (_amountToClaim: BigNumber | number, txParams?: W3.TX.TxParams, privateKey?: string): Promise<W3.TX.TransactionResult> => {
            if (!privateKey) {
                return new Promise((resolve, reject) => {
                    this._instance.withdrawAllocation(_amountToClaim, txParams || this._sendParams)
                        .then((res: any) => resolve(res))
                        .catch((err: any) => reject(err));
                });
            } else {
                // tslint:disable-next-line:max-line-length
                return this.w3.sendSignedTransaction(this.address, privateKey, this._instance.withdrawAllocation.request(_amountToClaim).params[0].data, txParams || this._sendParams, undefined)
                    .then(txHash => {
                        return this.waitTransactionReceipt(txHash);
                    });
            }
        },
        {
            // tslint:disable-next-line:max-line-length
            // tslint:disable-next-line:variable-name
            sendTransaction: Object.assign((_amountToClaim: BigNumber | number, txParams?: W3.TX.TxParams): Promise<string> => {
                    return new Promise((resolve, reject) => {
                        this._instance.withdrawAllocation.sendTransaction(_amountToClaim, txParams || this._sendParams)
                            .then((res: any) => resolve(res))
                            .catch((err: any) => reject(err));
                    });
                },
                {
                    // tslint:disable-next-line:max-line-length
                    // tslint:disable-next-line:variable-name
                    sendSigned: (_amountToClaim: BigNumber | number, privateKey: string, txParams?: W3.TX.TxParams, nonce?: number): Promise<string> => {
                        // tslint:disable-next-line:max-line-length
                        return this.w3.sendSignedTransaction(this.address, privateKey, this._instance.withdrawAllocation.request(_amountToClaim).params[0].data, txParams || this._sendParams, nonce);
                    }
                }
            )
        },
        {
            // tslint:disable-next-line:max-line-length
            // tslint:disable-next-line:variable-name
            data: (_amountToClaim: BigNumber | number): Promise<string> => {
                return new Promise((resolve, reject) => {
                    resolve(this._instance.withdrawAllocation.request(_amountToClaim).params[0].data);
                });
            }
        },
        {
            // tslint:disable-next-line:max-line-length
            // tslint:disable-next-line:variable-name
            estimateGas: (_amountToClaim: BigNumber | number): Promise<number> => {
                return new Promise((resolve, reject) => {
                    this._instance.withdrawAllocation.estimateGas(_amountToClaim).then((g: any) => resolve(g)).catch((err: any) => reject(err));
                });
            }
        });
    
}
