import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import rootReducer from './store/reducers/rootReducer'
import { createStore } from 'redux'

const initState = (localStorage.getItem('recipes'))? JSON.parse(localStorage.getItem('recipes')) : {};
const store = createStore(rootReducer, initState);
store.subscribe(() => {
  localStorage.setItem('recipes', JSON.stringify(store.getState()));
});

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
