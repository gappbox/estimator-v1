import { _, provider, providerID } from 'vendors';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import 'widgets/polyfills';
import './assets/styles/main';

import reducers from 'reducers';
import HomeComponent from './pages/home';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

store.subscribe(_.debounce(() => {
    provider.put(providerID, store.getState());
}, 500));

class Wrapper extends Component {
    render() {
        return (
            <Provider store={ store }>
                <HomeComponent />
            </Provider>
        )
    }
}

ReactDOM.render(<Wrapper />, document.getElementById('wrapper'));