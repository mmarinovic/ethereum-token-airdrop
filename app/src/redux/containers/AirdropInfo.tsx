import * as React from 'react';
import { connect } from 'react-redux';

import * as CA from '../actions/contract';
import * as N from '../namespace';
import { IContractState } from  '../../types/contract';

interface IProps {
    contractState: IContractState
}

class AirdropInfo extends React.Component<IProps> {

    public componentDidMount(){
        CA.getContractState();
    }

    public render(){
        console.log(this.props.contractState)
        return (
            <div>
                <h4>Contract state</h4>
            </div>
        );
    }
}

function mapStateToProps(state: N.IReduxState){
    console.log(state)
    return { contractState: state.contractState };
}

export default connect(mapStateToProps)(AirdropInfo);