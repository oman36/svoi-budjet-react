import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Paginator extends Component {
    render() {
        var pages = [];
        if (this.props.page > 2) {
            pages.push({text: 1, link: this.props.link_generator(1)});
            if (this.props.page > 3) {
                pages.push({text: '...', link: null})
            }
        }
        if (this.props.page > 1) {
            pages.push({text: this.props.page - 1, link: this.props.link_generator(this.props.page - 1)});
        }

        pages.push({text: this.props.page, link: null, active: true});

        if (this.props.page < this.props.count) {
            pages.push({text: this.props.page + 1, link: this.props.link_generator(this.props.page + 1)});
        }
        if (this.props.page < this.props.count - 1) {
            if (this.props.page < this.props.count - 2) {
                pages.push({text: '...', link: null});
            }
            pages.push({text: this.props.count, link: this.props.link_generator(this.props.count)});
        }

        return (
            <nav>
                <ul className="pagination justify-content-center">
                    {pages.map((btn, i) => (
                        <li key={i} className={['page-item', (btn.active ? 'active' : '')].join(' ')}>
                            {btn.link ? (
                                <Link className="page-link" to={btn.link}>{btn.text}</Link>
                            ) : (
                                <span className="page-link">{btn.text}</span>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        )
    }
}

export default Paginator;