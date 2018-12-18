import * as React from 'react';
import { connect } from 'react-redux';
import * as N from '../namespace';
import * as CA from '../actions/contract';

import { bindActionCreators, Dispatch } from 'redux';

import './Airdrop.scss';

interface IState {
    addresses: string
}
interface IStateProps {
    startTime: Date;
}

interface IActionProps {
    initAirdrop: typeof CA.airdrop
}

type IProps = IStateProps & IActionProps;

class Airdrop extends React.Component<IProps, IState>{

    public render(){
        return (
            <div className="airdrop">
                <h3>Enter addresses split with ','.</h3>
                <textarea onChange={this.onTextAreaChange} />
                <button onClick={this.startAirdrop}>Start Airdrop</button>
            </div>
        );
    }
    private onTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({addresses: e.target.value});
    }

    private startAirdrop = (_: React.MouseEvent<HTMLElement>) => {
        const formatAddresses = this.state.addresses.split(',');
        this.props.initAirdrop(formatAddresses);
    }
}

function mapDispatchToProps(dispatch: Dispatch): IActionProps{
    return bindActionCreators({
        initAirdrop: CA.airdrop
    }, dispatch)
}

function mapStateToProps(state: N.IReduxState): IStateProps{
    return {
        startTime: state.contractState.startTime
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Airdrop);