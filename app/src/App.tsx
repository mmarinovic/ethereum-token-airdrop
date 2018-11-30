import * as React from 'react';
import './App.css';

import { unlockWithMetaMask } from './redux/actions/web3Actions';

class App extends React.Component {

  public componentDidMount(){
    unlockWithMetaMask();
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Token airdrop manager</h1>
        </header>
      </div>
    );
  }
}

export default App;
