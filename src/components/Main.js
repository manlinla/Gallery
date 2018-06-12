import React from 'react';
import { Register } from './Register';
//import { Login} from "./Login";
import { Switch, Route } from 'react-router-dom';
//import { Home } from './Home';


export class Main extends React.Component {
    render() {
        return (
            <div className="main">
                <Switch>
                    <Route exact path="/" render={this.getRoot}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/login" render={this.getLogin}/>
                    <Route path="/home" render={this.getHome}/>
                    <Route render={this.getRoot}/>
                </Switch>
            </div>
        );
    }
}