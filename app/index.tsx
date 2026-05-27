import React from 'react';
import { createRoot } from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style/main.sass';

import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill';
import App from './App';

// polyfill country flag emojis
polyfillCountryFlagEmojis();

// render the app
const app = document.querySelector('#app');

if (app === null) {
    throw new Error('#app not found');
}

const root = createRoot(app);
root.render(<App />);
