import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './store/sagas'
import authReducer from './store/reducers/auth';
import navReducer from './store/reducers/nav';
import devicesReducer from './store/reducers/devices'
import loadingReducer from './store/reducers/loading'
import errorsReducer from './store/reducers/errors'

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducers = combineReducers( {
  auth: authReducer,
  nav: navReducer,
  devices: devicesReducer,
  loading: loadingReducer,
  errors: errorsReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore( rootReducers, composeEnhancers( applyMiddleware( sagaMiddleware ) ) ); 

sagaMiddleware.run(rootSaga)

const app = ( 
    <Provider store={ store }>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.register();