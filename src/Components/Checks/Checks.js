import React, {Component} from 'react';
import Check from "./Check";
import Paginator from "./../Paginator";
import {ChecksAPI} from '../../Api/v1/ChecksAPI';

class Checks extends Component {
    perPage = 10;
    page = null;

    constructor(props) {
        super(props);
        this.state = {
            checks: [],
            total_count: null,
            page_nums: null,
        };
    }

    setPage(page) {
        this.page = page;

        ChecksAPI.all({
            'include': 'shop',
            'offset': (page - 1) * this.perPage,
            'limit': this.perPage,
        }).then(response => this.setState({
            checks: response.items,
            total_count: response.total_count,
            page_nums: Math.ceil(response.total_count / this.perPage),
        }));
    }

    render() {
        const page = parseInt(new URLSearchParams(document.location.search).get('page') || 1);
        if (this.page !== page) {
            this.setPage(page)
        }
        return (
            <span>
                <h1>Checks</h1>
                {this.state.checks.map((check) => <Check check={check} key={check.id}/>)}
                {this.state.page_nums !== null ? <Paginator
                    page={page}
                    count={this.state.page_nums}
                    link_generator={(page_n) => `checks?page=${page_n}`}
                /> : ''}
            </span>
        )
    }
}

export default Checks;
