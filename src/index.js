// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { MusicProvider } from './context/MusicContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MusicProvider>
      <App />
    </MusicProvider>
  </React.StrictMode>
);