import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style/main.sass';

import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill';
import App from './App';

polyfillCountryFlagEmojis();
const app = document.querySelector('#app');

if (app === null) {
    throw new Error('#app not found');
}

const root = ReactDOM.createRoot(app);
root.render(<App />);
