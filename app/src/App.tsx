import * as React from 'react';
import './shared/style/base.scss';
import AirdropInfo from './containers/AirdropInfo';
import Airdrop from './containers/Airdrop';

class App extends React.Component {
  public render() {
    return (
      <div>
        <AirdropInfo />
        <Airdrop />
      </div>
    );
  }
}

export default App;
