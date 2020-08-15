import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import EventContextProvider from '../Context/EventContext'
import DateContextProvider from '../Context/DateContext'
import AddEvent from '../Components/AddEvent/AddEvent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
    <DateContextProvider>
    <EventContextProvider>
      <AddEvent />
    </EventContextProvider>
    </DateContextProvider>
  </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});