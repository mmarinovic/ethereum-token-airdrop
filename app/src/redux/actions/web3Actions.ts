import { W3 } from "soltsice";
import * as N from '../namespace';
import * as Names from './names';

export function unlockWithMetaMask() : N.UnlockWithMetaMaskAction{

    const web3 = new W3(window.web3.currentProvider);

    return {
        type: Names.UNLOCK_WITH_METAMASK,
        payload: web3
    }
}