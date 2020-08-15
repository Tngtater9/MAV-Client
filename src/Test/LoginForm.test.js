import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import LoginForm from '../Components/Login/LoginForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
    <LoginForm />
  </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});