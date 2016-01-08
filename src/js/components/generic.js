import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {boxes, BoxContainer} from './boxes';

let Background = React.createClass({
    displayName: "Background",
    render() {
        return <div></div>
    }
});

let App = React.createClass({
    displayName: "App",
    render() {
        let contentChildren = boxes.map((Box, index) => (
            <Box key={index} />
        ));

        return (
            <div>
                <Background />
                <BoxContainer>
                    {contentChildren}
                </BoxContainer>
            </div>
        );
    }
});

export {App}