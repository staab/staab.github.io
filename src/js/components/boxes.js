import * as React from 'react';
import * as ReactDOM from 'react-dom';

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
                <h2>Jon Staab</h2>
                <i>Web Developer Extraordinaire</i>
            </Box>
        );
    }
});

let Contact = React.createClass({
    displayName: "Contact",
    render() {
        return (
            <Box>
                <h2>Talk to me</h2>
                <a href="mailto:shtaab@gmail.com">Email</a>
            </Box>
        );
    }
});

let boxes = [
    Name,
    Contact,
    Contact,
    Contact,
    Contact,
    Contact,
    Contact,
    Contact,
    Contact,
    Contact,
    Contact,
    Contact
];

export {BoxContainer, boxes};