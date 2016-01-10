import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {connect} from 'react-redux';

import {Dial} from './features';

function connectBgProp(propName, stateName, factor) {
    function stateToProps(state) {
        let ret = {};

        ret[propName] = state.background[stateName] * factor;

        return ret;
    }

    return connect(stateToProps);
}

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
                    <i>Work with me here.</i>
                    <div>
                        <div className="grid">
                            <a className="grid__col-xs-3 text-center"
                                href="https://github.com/staab"
                                title="Check out my OSS contributions"
                                target="_blank">
                                <i className="fa fa-github"></i>
                            </a>
                            <a className="grid__col-xs-3 text-center"
                                href="mailto:shtaab@gmail.com"
                                title="Chuck an email in my direction"
                                target="_blank">
                                <i className="fa fa-envelope"></i>
                            </a>
                            <a className="grid__col-xs-3 text-center"
                                href="https://twitter.com/SanStaab"
                                title="Tweetify me"
                                target="_blank">
                                <i className="fa fa-twitter"></i>
                            </a>
                            <a className="grid__col-xs-3 text-center"
                                href="/src/img/resume_staab_2016_01.pdf"
                                title="Skim my resume"
                                target="_blank">
                                <i className="fa fa-file"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </Box>
        );
    }
});

let Instructions = React.createClass({
    displayName: 'Instructions',
    render() {
        return (
            <Box>
                <div className="align-rows align-cols full-height">
                    <i>Tweak the dials! Have some fun.</i>
                </div>
            </Box>
        );
    }
});

let BackgroundSpeed = connectBgProp('degrees', 'speed', 360)(React.createClass({
    displayName: "BackgroundSpeed",
    _setBgSpeed(degrees) {
        // Convert degrees to fraction
        this.props.store.dispatch({type: 'setBgSpeed', value: degrees / 360});
    },
    render() {
        return <Box>
            <Dial onChange={this._setBgSpeed} degrees={this.props.degrees}>
                Speed
            </Dial>
        </Box>;
    }
}));

let BackgroundMaxScale = connectBgProp('degrees', 'maxScale', 36)(React.createClass({
    displayName: "BackgroundMaxScale",
    _setDegrees(degrees) {
        // Convert degrees to fraction
        this.props.store.dispatch({type: 'setBgMaxScale', value: degrees / 36});
    },
    render() {
        return <Box>
            <Dial onChange={this._setDegrees} degrees={this.props.degrees}>
                Max Size
            </Dial>
        </Box>;
    }
}));

let BackgroundMinScale = connectBgProp('degrees', 'minScale', 36)(React.createClass({
    displayName: "BackgroundMinScale",
    _setDegrees(degrees) {
        // Convert degrees to fraction
        this.props.store.dispatch({type: 'setBgMinScale', value: degrees / 36});
    },
    render() {
        return <Box>
            <Dial onChange={this._setDegrees} degrees={this.props.degrees}>
                Min Size
            </Dial>
        </Box>;
    }
}));

export {
    BoxContainer,
    Name,
    Instructions,
    Contact,
    BackgroundSpeed,
    BackgroundMaxScale,
    BackgroundMinScale
};