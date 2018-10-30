import React, {Component} from 'react';
import {Link} from 'react-router-dom';
const menu = [
    {title: 'Add Check', url: 'check'},
    {title: 'Search products', url: 'search_products'},
    {title: 'List', url: 'checks'},
    {title: 'QR strings', url: 'qr_strings'},
    {title: 'Categories', url: 'category_list'},
];

class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <Link to='/' className="navbar-brand">Home</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {menu.map((element) =>
                            <li className="nav-item">
                                <Link className="nav-link" to={element.url} activeClassName="active">
                                    {element.title}
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;
