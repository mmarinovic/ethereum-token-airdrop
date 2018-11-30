import { Component} from 'react';
import { connect } from 'react-redux';

class AirdropInfo extends Component {

    public render(){
        return (
            <div>
                <h4>Contract state</h4>
            </div>
        );
    }
}

function mapStateToProps({ web3 }){
    return { web3 };
}

export default connect(mapStateToProps)(AirdropInfo);