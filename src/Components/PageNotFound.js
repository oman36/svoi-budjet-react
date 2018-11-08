import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class PageNotFound extends Component {
    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-4">404</h1>
                <p className="lead">Page not found</p>
                <hr className="my-4"/>
                <Link className="btn btn-primary btn-lg" to="/" role="button">Go home</Link>
            </div>
        )
    }
}

export default PageNotFound;