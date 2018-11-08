import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './Home';
import Checks from './Checks/Checks';
import NewQRString from './QRStrings/NewQRString';
import QRStrings from "./QRStrings/QRStrings";


class Content extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/checks" component={Checks}/>
                <Route exact path="/check" component={NewQRString}/>
                <Route exact path="/qr_strings" component={QRStrings}/>
            </Switch>
        )
    }
}

export default Content
