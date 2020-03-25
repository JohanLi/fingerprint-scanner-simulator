import React from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader/root';
import { loadAssets } from './assets';

import App from './components/App';

const HotApp = hot(App);

loadAssets().then(() => {
  render(<HotApp />, document.getElementById('root'));
});
