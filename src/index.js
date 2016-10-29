import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from './App';
import Note from './note/Note';
import './index.css';


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Note} />
      <Route path="/tasks/:task" component={Note}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
