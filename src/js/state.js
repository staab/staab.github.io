import {createStore} from 'redux';
import R from 'ramda';

const initialState = {
    background: {
        speed: 0.2,
        maxScale: 5,
        minScale: 1
    }
};
const actionHandlers = {};

actionHandlers.setBgSpeed = function setBgSpeed(state, action) {
    state.background.speed = action.value;

    return state;
};

actionHandlers.setBgMaxScale = function setBgMaxScale(state, action) {
    state.background.maxScale = action.value;
    state.background.minScale = Math.min(state.background.minScale, state.background.maxScale);

    return state;
};

actionHandlers.setBgMinScale = function setBgMinScale(state, action) {
    state.background.minScale = action.value;
    state.background.maxScale = Math.max(state.background.maxScale, state.background.minScale);

    return state;
};

function mainReducer(state = initialState, action) {
    let fn = actionHandlers[action.type];

    if (fn) {
        return R.merge(state, fn(R.clone(state), action));
    }

    return state;
}

export let store = createStore(mainReducer);