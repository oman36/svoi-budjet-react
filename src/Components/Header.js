import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

const menu = [
    {title: 'Add Check', url: '/qr_strings/new'},
    // {title: 'Search products', url: '/search_products'},
    {title: 'Checks', url: '/checks'},
    {title: 'QR strings', url: '/qr_strings'},
    // {title: 'Categories', url: '/category_list'},
];

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropDownOpened: false,
        }
    }

    toggleDropDown() {
        this.setState({dropDownOpened: !this.state.dropDownOpened});
    }

    closeDropDown() {
        this.setState({dropDownOpened: false});
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-info fixed-top">
                <NavLink to='/' className="navbar-brand">Home</NavLink>
                <button className="navbar-toggler" type="button" onClick={this.toggleDropDown.bind(this)}>
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className={["navbar-collapse", this.state.dropDownOpened ? "" : "collapse"].join(' ')}>
                    <ul className="navbar-nav">
                        {menu.map((element, i) =>
                            <li key={i} className="nav-item" onClick={this.closeDropDown.bind(this)}>
                                <NavLink
                                    className="nav-link"
                                    to={element.url}
                                    activeClassName="active"
                                    isActive={(m, loc) => m && m.isExact}
                                >
                                    {element.title}
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;
