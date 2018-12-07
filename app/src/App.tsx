import * as React from 'react';
import './shared/style/base.scss';
import AirdropInfo from './containers/AirdropInfo';

class App extends React.Component {
  public render() {
    return (
      <div>
        <AirdropInfo />
      </div>
    );
  }
}

export default App;
