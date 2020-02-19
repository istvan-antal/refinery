import React from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import App from './App';
import store, { State } from './store';

const ConnectedApp = connect((state: State) => ({
}), (dispatch: Dispatch) => bindActionCreators({
}, dispatch))(App);

render(
    <Provider store={store}>
        <ConnectedApp />
    </Provider>,
    document.getElementById('app'),
);