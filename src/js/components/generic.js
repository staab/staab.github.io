import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {boxes} from './boxes';

let Background = React.createClass({
    displayName: "Background",
    render() {
        return <div></div>
    }
});

let App = React.createClass({
    displayName: "App",
    render() {
        return (
            <div>
                <Background />
                {boxes.map((Box, index) => <Box key={index} />)}
            </div>
        );
    }
});

export {App}