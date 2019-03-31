import React from 'react';
import { registerRootComponent, Font } from 'expo';
import App from './pages/App';

class Main extends React.Component {
  state = {
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      'gotham-rounded': require('../assets/fonts/ProximaNovaSoftW03Bold.ttf')
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    if (!this.state.fontLoaded) return null;
    return <App />;
  }
}

export default registerRootComponent(Main);
