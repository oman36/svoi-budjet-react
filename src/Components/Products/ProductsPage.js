import React, {Component} from 'react';
import Product from "./Product";
import Paginator from "./../Paginator";
import {ProductsAPI} from '../../Api/v1/ProductsAPI';

class ProductsPage extends Component {
    perPage = 10;
    page = null;
    name = '';
    redirect = null;

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            total_count: null,
            page_nums: null,
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.linkGenerator = this.linkGenerator.bind(this);
    }

    loadData() {
        ProductsAPI.all({
            include: 'shop',
            offset: (this.page - 1) * this.perPage,
            limit: this.perPage,
            sort_by: 'min_price',
            name_contains: this.name,
        }).then(response => this.setState({
            products: response.items,
            total_count: response.total_count,
            page_nums: Math.ceil(response.total_count / this.perPage),
        }));
    }

    changeHandler(event) {
        event.preventDefault();
        this.name = event.target.value;
        this.props.history.push(this.linkGenerator(1));
    }

    linkGenerator(page) {
        return `products?page=${page}&name=${this.name}`;
    }

    componentDidMount() {
        this.validate();
    }

    validate() {
        const qPage = parseInt(new URLSearchParams(document.location.search).get('page')) || 1;
        const qName = new URLSearchParams(document.location.search).get('name') || '';
        if (this.mountedName !== qName || this.mountedPage !== qPage) {
            this.mountedName = qName;
            this.mountedPage = qPage;
            this.page = this.mountedPage;
            this.name = this.mountedName;
            this.loadData();
            return false
        }
        return true;
    }

    shouldComponentUpdate() {
        return this.validate();
    }
    render() {
        return (
            <span>
                <h1>Products</h1>
                <input
                    type="text"
                    className="form-control"
                    value={this.name}
                    placeholder="Product name"
                    onChange={this.changeHandler}
                />
                <br/>
                {this.state.products.map((check) => <Product product={check} key={check.id}/>)}
                {this.state.page_nums !== null ? <Paginator
                    page={this.page}
                    count={this.state.page_nums}
                    link_generator={this.linkGenerator}
                /> : ''}
            </span>
        )
    }
}

export default ProductsPage;
