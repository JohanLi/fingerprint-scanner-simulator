import React from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader/root';

import App from './components/App';
import { loadAssets } from './utils';
import { fingerprints } from './require';

const HotApp = hot(App);

loadAssets(fingerprints).then(() => {
  render(<HotApp />, document.getElementById('root'));
});
