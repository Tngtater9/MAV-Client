import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import DateContextProvider from '../Context/DateContext'
import Header from '../Components/Header/Header';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
    <DateContextProvider>
      <Header />
    </DateContextProvider>
  </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});