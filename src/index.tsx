import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import MainRoute from './MainRoute';
import './styles/main.scss';

const container = document.getElementById('app');

const root = createRoot(container);

root.render(
  <Provider store={store}>
    <MainRoute />
  </Provider>
);
