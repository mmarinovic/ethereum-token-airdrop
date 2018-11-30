import * as Names from '../actions/names';
import * as N from '../namespace';

export default function(state: N.IReduxState, action: N.Action){

    switch(action.type){
        case Names.UNLOCK_WITH_METAMASK: return {
            ...state,
            web3: action.payload
        }
    }

    return state;
}