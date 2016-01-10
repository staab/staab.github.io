import * as React from 'react';
import * as ReactDOM from 'react-dom';

let Dial = React.createClass({
    displayName: "Dial",
    _normalizeDegrees(degrees) {
        // Normalize to a positive value between 0 and 360
        return (360 + degrees) % 360;
    },
    _getDegrees() {
        return this._normalizeDegrees(this.props.degrees || this.state.degrees);
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

        let dialRect = this.refs.dialFace.getBoundingClientRect();
        let mousePos = [evt.clientX, evt.clientY];
        let dialPos = [dialRect.left + dialRect.width / 2, dialRect.top + dialRect.height / 2];
        let radians = Math.atan2(dialPos[1] - mousePos[1], dialPos[0] - mousePos[0]);
        let degrees = radians * (180 / Math.PI) - 90;

        // Save it internally
        this.setState({degrees: degrees});

        // Notify parent
        if (this.props.onChange) {
            this.props.onChange(this._normalizeDegrees(degrees));
        }
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
                    onMouseDown={this._onMouseDown}
                    ref="dialFace">
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