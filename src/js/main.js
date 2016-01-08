import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {App} from './components/generic';

(function main() {
    ReactDOM.render(
      React.createElement(App),
      document.getElementById('wrapper')
    );
}());