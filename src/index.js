import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from './App';
import Setting from './setting/Setting';
import List from './list/List';
import './index.css';


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={List} />
      <Route path="/setting" component={Setting}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
