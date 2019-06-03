import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './state/store/configureStore'
import { verifyCredentials } from './reduxTokenAuthConfig'
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import {setupInterceptors} from './utils/apiIntercept'


axios.defaults.baseURL = 'http://localhost:3002'
//https://glocal-news.herokuapp.com'

const store = configureStore()
verifyCredentials(store)

setupInterceptors()

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));

serviceWorker.unregister();
