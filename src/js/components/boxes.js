import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {Dial} from './features';

let BoxContainer = React.createClass({
    displayName: "BoxContainer",
    render() {
        return <div className="box-container grid">{this.props.children}</div>;
    }
});

let Box = React.createClass({
    displayName: "Box",
    render() {
        return (
            <div className="grid__col-xs-6 grid__col-md-4">
                <div className="box-item">
                    {this.props.children}
                </div>
            </div>
        );
    }
});

let Name = React.createClass({
    displayName: "Name",
    render() {
        return (
            <Box>
                <h1>Heya!</h1>
                <div className="grid">
                    <div className="grid__col-xs-4 align-cols">
                        <img src="/src/img/headshot.png" width="80px;" className="circle"/>
                    </div>
                    <i className="grid__col-xs-8">
                        My name is Jon. I'm a web developer. I love to
                        learn, I love to code, and I love to make ridiculous sites
                        like this one.
                    </i>
                </div>
            </Box>
        );
    }
});

let Contact = React.createClass({
    displayName: "Contact",
    render() {
        return (
            <Box>
                <div className="align-rows align-cols full-height">
                    <i>work with me here</i>
                    <div>
                        <div className="grid">
                            <a className="grid__col-xs-4 text-center"
                                href="https://github.com/staab">
                                <i className="fa fa-github"></i>
                            </a>
                            <a className="grid__col-xs-4 text-center"
                                href="mailto:shtaab@gmail.com">
                                <i className="fa fa-envelope"></i>
                            </a>
                            <a className="grid__col-xs-4 text-center"
                                href="https://twitter.com/SanStaab">
                                <i className="fa fa-twitter"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </Box>
        );
    }
});

let BackgroundSpeed = React.createClass({
    displayName: "BackgroundSpeed",
    render() { return <Box><Dial>Speed</Dial></Box>; }
});

let boxes = [
    Name,
    BackgroundSpeed,
    Box,
    Box,
    Contact,
    Box,
    Box,
    Box,
    Box,
    Box,
    Box,
    Box
];

export {BoxContainer, boxes};