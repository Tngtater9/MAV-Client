import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import EventContextProvider from '../Context/EventContext'
import SearchAdd from '../Components/AddEvent/SearchAdd';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
    <EventContextProvider>
      <SearchAdd />
    </EventContextProvider>
  </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});