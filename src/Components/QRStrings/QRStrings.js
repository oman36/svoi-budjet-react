import React, {Component} from 'react';
import {QRStringsAPI} from '../../Api/v1/QRStringsAPI';
import QRString from "./QRString";
import Paginator from "../Paginator";

class QRStrings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            total_count: null,
            page_nums: null,
        };
        this.is_valid = 'all';
        this.with_check = 'all';
        this.page = null;
        this.perPage = 10;
        this.handleFilterChange = this.handleFilterChange.bind(this)
    }

    setPage(page) {
        this.page = page;
        const params = {
            sort_by: '-created_at',
            offset: (this.page - 1) * this.perPage,
            limit: this.perPage,
        };
        if (this.is_valid !== 'all') {
            params['is_valid'] = {'valid' : 1, 'invalid' : 0}[this.is_valid];
        }
        if (this.with_check !== 'all') {
            params['with_check'] = {'with' : 1, 'without' : 0}[this.with_check];
        }
        QRStringsAPI.all(params).then(function (json) {
            this.setState({
                items: json.items,
                total_count: json.total_count,
                page_nums: Math.ceil(json.total_count / this.perPage),
            });
        }.bind(this));
    }

    handleFilterChange(key, value) {
        const filters = ['with_check', 'is_valid'];
        if (!filters.includes(key)) {
            return console.error(`"${key}" not in ${filters.join(',')}`);
        }
        this[key] = value;
        this.setPage(this.page);
    }

    render() {
        const page = parseInt(new URLSearchParams(document.location.search).get('page') || 1);
        if (this.page !== page) {
            this.setPage(page)
        }
        return (<span>
            <h1>Qr strings</h1>
            <QRStringsFilter is_valid={this.state.is_valid} with_check={this.state.with_check}
                             callback={this.handleFilterChange}/>
            {this.state.items.map((item) => <QRString key={item.id} qr_string={item}/>)}
            {this.state.page_nums !== null ? <Paginator
                page={page}
                count={this.state.page_nums}
                link_generator={(page_n) => `qr_strings?page=${page_n}`}
            /> : ''}
        </span>)
    }
}

class QRStringsFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_valid: this.props.is_valid || 'all',
            with_check: 'all',
        };
        this.statusHandler = this.statusHandler.bind(this);
        this.withCheckHandler = this.withCheckHandler.bind(this);
    }

    statusHandler(e) {
        const value = e.target.getAttribute('data-valid');
        this.setState({
            is_valid: value,
        });
        this.props.callback('is_valid', value);
    }

    withCheckHandler(e) {
        const value = e.target.getAttribute('data-check');
        this.setState({
            with_check: value,
        });
        this.props.callback('with_check', value);
    }

    render() {
        return (<span>
            <div className="btn-group">
                <div className={'btn btn-outline-success ' + (this.state.is_valid === 'all' ? 'active' : '')}
                     onClick={this.statusHandler} data-valid={'all'}>All
                </div>
                <div className={'btn btn-outline-success ' + (this.state.is_valid === 'valid' ? 'active' : '')}
                     onClick={this.statusHandler} data-valid={'valid'}>Valid only
                </div>
                <div className={'btn btn-outline-success ' + (this.state.is_valid === 'invalid' ? 'active' : '')}
                     onClick={this.statusHandler} data-valid={'invalid'}>Invalid only
                </div>
            </div>
            <br/>
            <br/>
            <div className="btn-group">
                <div className={'btn btn-outline-success ' + (this.state.with_check === 'all' ? 'active' : '')}
                     onClick={this.withCheckHandler} data-check={'all'}>All
                </div>
                <div className={'btn btn-outline-success ' + (this.state.with_check === 'with' ? 'active' : '')}
                     onClick={this.withCheckHandler} data-check={'with'}>With check
                </div>
                <div className={'btn btn-outline-success ' + (this.state.with_check === 'without' ? 'active' : '')}
                     onClick={this.withCheckHandler} data-check={'without'}>Without check
                </div>
            </div>
            <br/>
            <br/>
        </span>)
    }
}

export default QRStrings;