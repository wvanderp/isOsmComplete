import './style/main.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill';
import App from './App';

// polyfill country flag emojis
polyfillCountryFlagEmojis();

// render the app
const app = document.querySelector('#app');

if (app === null) {
    throw new Error('#app not found');
}

const root = ReactDOM.createRoot(app);
root.render(<App />);
