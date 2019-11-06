import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './routes/Home/home';
import Login from './routes/Login/login';
import Register from './routes/Register/register';
import Profile from './routes/Profile/profile';
import { Error } from './routes/error';
import Single_Play from './routes/Game/Single/single';
import Duel_Play from './routes/Game/Duel/duel';
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
            <Route path="/profile" component={Profile}></Route>
            <Route path="/singleMode" component={Single_Play}></Route>
            <Route path="/multipleMode" component={Duel_Play}></Route>
            <Route component={Error}></Route>
          </Switch>
        </Router>
      </Layout>
    </React.Fragment>
  );
}

export default App;
