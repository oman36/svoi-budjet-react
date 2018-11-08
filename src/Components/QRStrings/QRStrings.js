import React, {Component} from 'react';
import './QRString';
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
        this.page = null;
        this.perPage = 10;
    }

    setPage(page) {
        this.page = page;

        QRStringsAPI.all({
            sort_by: '-created_at',
            offset: (this.page - 1) * this.perPage,
            limit: this.perPage,
        }).then(function (json) {
            this.setState({
                items: json.items,
                total_count: json.total_count,
                page_nums: Math.ceil(json.total_count / this.perPage),
            });
        }.bind(this));
    }

    render() {
        const page = parseInt(new URLSearchParams(document.location.search).get('page') || 1);
        if (this.page !== page) {
            this.setPage(page)
        }
        return (
            <span>
            {this.state.items.map(function (item) {
                return <QRString key={item.id} qr_string={item}/>
            })}
                {this.state.page_nums !== null ? <Paginator
                    page={page}
                    count={this.state.page_nums}
                    link_generator={(page_n) => `qr_strings?page=${page_n}`}
                /> : ''}
        </span>)
    }
}

export default QRStrings;