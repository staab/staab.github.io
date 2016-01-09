import * as React from 'react';
import * as ReactDOM from 'react-dom';

let Dial = React.createClass({
    displayName: "Dial",
    _getDegrees() {
        // Normalize to a positive value between 0 and 360
        return (360 + (this.props.degrees || this.state.degrees)) % 360;
    },
    _getRotation(factor=1) {
        // 45 gets the arrow to the top.
        return 'rotate(' + (factor * (this._getDegrees() + 45)) + 'deg)'
    },
    _onMouseDown(evt) {
        // Don't let them highlight text
        evt.preventDefault();

        // We are now moving
        this.setState({mouseDragging: true});
    },
    _onMouseMove(evt) {
        if (!this.state.mouseDragging) {
            return;
        }

        let element = ReactDOM.findDOMNode(this).getElementsByClassName('dial__face')[0];
        let elRect = element.getBoundingClientRect();
        let mousePos = [evt.clientX, evt.clientY];
        let elPos = [elRect.left + elRect.width / 2, elRect.top + elRect.height / 2];
        let radians = Math.atan2(elPos[1] - mousePos[1], elPos[0] - mousePos[0]);

        this.setState({degrees: radians * (180 / Math.PI) - 90});
    },
    _onMouseUp(evt) {
        if (!this.state.mouseDragging) {
            return;
        }

        // We are no longer moving
        this.setState({mouseDragging: false});
    },
    getInitialState() {
        return {mouseDragging: false, degrees: 0};
    },
    componentDidMount() {
        window.addEventListener("mouseup", this._onMouseUp);
        window.addEventListener("mousemove", this._onMouseMove);
    },
    componentWillUnmount() {
        window.removeEventListener("mouseup", this._onMouseUp);
        window.removeEventListener("mousemove", this._onMouseMove);
    },
    render() {
        return <div className="dial">
            <div className="dial__chamfer">
                <div className="dial__face"
                    style={{transform: this._getRotation()}}
                    onMouseDown={this._onMouseDown}>
                    <div className="dial__arrow"></div>
                    <div className="dial__inner"></div>
                </div>
            </div>
            <div className="dial__text">
                {this.props.children}
                &nbsp;
                {(Math.abs(this._getDegrees()) / 3.6).toFixed(0)}%
            </div>
        </div>
    }
});

export {Dial};