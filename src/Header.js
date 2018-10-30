import React, {Component} from 'react';

const menu = [
    {title: 'Add Check', url: '#new_check'},
    {title: 'Search products', url: '#search_products'},
    {title: 'List', url: '#search'},
    {title: 'QR strings', url: '#qr_strings'},
    {title: 'Categories', url: '#category_list'},
];

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: document.location.hash,
        };
        window.onhashchange = () => this.setState({active: document.location.hash})
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <a className="navbar-brand" href="#">Home</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {menu.map((element) =>
                            <li className={"nav-item " + (this.state.active === element.url ? " active ": "")}>
                                <a className="nav-link" href={element.url}>
                                    {element.title}
                                </a>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;
