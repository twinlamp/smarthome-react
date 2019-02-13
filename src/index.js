import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddlewares, compose, combineReducers } from 'redux';
import { applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducers = combineReducers( {
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore( rootReducers, composeEnhancers( applyMiddleware( sagaMiddleware ) ) ); 

const app = ( 
    <Provider store={ store }>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.register();