import { IReduxState } from './namespace';

const initialState: IReduxState = {
    contractState: {
        remainingAllocationForDevelopers: -1,
        remainingAllocationForPresale: -1,
        remainingTotalSupply: -1,
        startTime: new Date()
    }
}

export default initialState;