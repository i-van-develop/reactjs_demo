import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from "react-redux";
import store from "./redux/store";

import './style.css';

import App from './App';

const rootElement = document.getElementById('root');
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    rootElement
);