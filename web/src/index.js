import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { MainView } from './modules/main';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './common/reducers'
import 'normalize.css'

const store = createStore(reducers)

ReactDOM.render(
    <Provider {...{store}}>
        <MainView />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
