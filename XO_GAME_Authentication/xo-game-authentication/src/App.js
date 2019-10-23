import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './routes/Home/home';
import Login from './routes/Login/login';
import Register from './routes/Register/register';
import { Error } from './routes/error';
import Layout from './containers/layouts';

function App() {
  return (
    <React.Fragment>
      <Layout>
        <Router>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
            <Route component={Error}></Route>
          </Switch>
        </Router>
      </Layout>
    </React.Fragment>
  );
}

export default App;
