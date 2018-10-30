import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';
import Header from './Components/Header';
import Content from './Components/Content';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <BrowserRouter>
        <div className="app">
            <Header/>
            <div className="container">
                <Content/>
            </div>
        </div>
    </BrowserRouter>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
