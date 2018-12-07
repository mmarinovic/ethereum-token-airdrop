import * as N from '../namespace';
import * as Names from '../actions/names';
import initial from '../initialState';

export default function contractStateReducer(state: N.IReduxState["contractState"] = initial.contractState, action: N.Action){
    switch(action.type){
        case Names.GET_CONTRACT_STATE:{
            return action.payload;
        }
    }
    return state;
}