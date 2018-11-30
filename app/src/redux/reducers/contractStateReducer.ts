import * as N from '../namespace';
import * as Names from '../actions/names';

export default function contractStateReducer(state: N.IReduxState, action: N.Action){
    switch(action.type){
        case Names.GET_CONTRACT_STATE:
            return {...state, contractState: action.payload};
    }
    return state;
}