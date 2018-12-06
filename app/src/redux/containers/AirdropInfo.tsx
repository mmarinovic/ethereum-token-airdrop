import * as React from 'react';
import { connect } from 'react-redux';

import * as CA from '../actions/contract';
import * as N from '../namespace';
import { IContractState } from  '../../types/contract';
import { bindActionCreators, Dispatch } from 'redux';

interface IActionProps{
    getContractState: typeof CA.getContractState
}

interface IStateProps {
    contractState: IContractState
}

type IProps = IActionProps & IStateProps;

class AirdropInfo extends React.Component<IProps> {
    public state = {};

    public componentDidMount(){
        console.log("init")
        this.props.getContractState();
    }

    public render(){
        return (
            <div>
                <h4>Contract state</h4>
            </div>
        );
    }
}

function mapStateToProps(state: N.IReduxState): IStateProps {
    return { contractState: state.contractState };
}

function mapDispatchToProps(dispatch: Dispatch): IActionProps {
    return bindActionCreators({
        getContractState: CA.getContractState
      }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AirdropInfo);