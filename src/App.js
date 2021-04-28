import React from 'react';
import Signup from './component/Signup'; 
import Login from './component/Login'; 
import Todo from './component/Todo'; 
import {BrowserRouter, Route, Switch} from 'react-router-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      mess: "hellow"
    }
  }


  render() {
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Signup}/>
          <Route  path="/login" component={Login}/>
          <Route  path="/todo" component={Todo}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
