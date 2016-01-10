import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {store} from '../state';
import {boxes, BoxContainer} from './boxes';

let Background = React.createClass({
    displayName: "Background",
    render() {
        return <div className="l-background" id="main-background"></div>
    }
});

let App = React.createClass({
    displayName: "App",
    render() {
        let contentChildren = boxes.map((Box, index) => (
            <Box key={index} store={store}/>
        ));

        return (
            <div className="l-content">
                <Background />
                <BoxContainer>
                    {contentChildren}
                </BoxContainer>
            </div>
        );
    }
});

export {App}