import * as React from 'react';
import AirdropInfo from './redux/containers/AirdropInfo';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Token airdrop manager</h1>
        </header>
        <div className="Content">
          <AirdropInfo />
        </div>
      </div>
    );
  }
}

export default App;
