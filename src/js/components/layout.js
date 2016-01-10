import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {store} from '../state';
import * as boxes from './boxes';

let Background = React.createClass({
    displayName: "Background",
    render() {
        return <div className="l-background" id="main-background"></div>
    }
});

let App = React.createClass({
    displayName: "App",
    _onResize(evt) {
        console.log(this);
        this.setState({height: window.innerHeight});
    },
    getInitialState() {
        return {height: window.innerHeight};
    },
    componentDidMount() {
        window.addEventListener("resize", this._onResize);
        document.addEventListener('visibilitychange', this._onResize);
    },
    componentWillUnmount() {
        window.removeEventListener("resize", this._onResize);
        document.removeEventListener('visibilitychange', this._onResize);
    },
    render() {
        return (
            <div className="l-content" style={{height: this.state.height}}>
                <Background />
                <boxes.BoxContainer>
                    <boxes.Name store={store} />
                    <boxes.Instructions store={store} />
                    <boxes.Contact store={store} />
                    <boxes.BackgroundSpeed store={store} />
                    <boxes.BackgroundMaxScale store={store} />
                    <boxes.BackgroundMinScale store={store} />
                </boxes.BoxContainer>
            </div>
        );
    }
});

export {App}