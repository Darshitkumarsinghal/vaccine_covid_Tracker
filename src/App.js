import {
  Switch,
  Route,
} from "react-router-dom";
import Home from './Pages/Home';
import Pincode from './Pages/Pincode';
import District from './Pages/District';
import { Component } from 'react';

class App extends Component{
  render(){
    return (
      <>
        <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/pincode" component={Pincode} />
            <Route path="/district" component={District} />
            <Route path="*" component={Home} />
        </Switch>
        </>
    );
  }
  
}

export default App;
