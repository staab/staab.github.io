import * as React from 'react';
import * as ReactDOM from 'react-dom';

let Name = React.createClass({
    displayName: "Name",
    render() {
        return (
            <div className="box-item">
                <h2>Jon Staab</h2>
                <i>Web Developer Extraordinaire</i>
            </div>
        );
    }
});

let Contact = React.createClass({
    displayName: "Contact",
    render() {
        return (
            <div className="box-item">
                <h2>Talk to me</h2>
                <a href="mailto:shtaab@gmail.com">Email</a>
            </div>
        );
    }
});

let boxes = [Name, Contact, Contact, Contact, Contact, Contact, Contact, Contact, Contact, Contact];

export {boxes};