import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {App} from './components/layout';
import {createBackground} from './background';

(function main() {
    ReactDOM.render(
      React.createElement(App),
      document.getElementById('wrapper')
    );

    createBackground(document.getElementById('main-background'), {
        maxScale: 2,
        scaleSpeed: 0.005,
        cubeSize: 90
    });
}());