import React, {Component} from 'react';
import Spinner from "./../Spinner";
import {ProductsAPI} from "../../Api/v1/ProductsAPI";

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayItems: false,
            items: null,
        };
        this.checks = {};
    }

    openItemList() {
        if (null === this.state.items) {
            ProductsAPI.items(this.props.product.id, {
                include: 'check'
            })
                .then((res) => this.setState({items: res.items}));
        }

        this.setState({
            displayItems: !this.state.displayItems,
        })
    }

    render() {
        const product = this.props.product;
        let shopName;

        if (product.shop.name && 'unknown' !== product.shop.name) {
            shopName = product.shop.name;
        } else {
            shopName = product.shop.inn
        }
        return (
            <span>
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col col-md-6">
                            {product.name}
                            <hr/>
                            {shopName}
                        </div>
                        <div className="col col-md-2 text-right">
                            {product.min_price.toFixed(2)}
                        </div>
                        <div className="col col-md-2">
                            <div className="btn btn-info btn-sm"
                                 onClick={this.openItemList.bind(this)}
                                 role="button"
                            >
                                Список
                            </div>
                        </div>
                    </div>
                </div>

                <div className={["card-body", this.state.displayItems ? "" : "d-none"].join(' ')}>
                    <ul>
                        <li className="row" style={{fontWeight: "bold", borderBottom: "dashed 1px #ccc"}}>
                            <div className="col-4 col-sm-2">Цена</div>
                            <div className="col-4 col-sm-2 text-center">Кол-во</div>
                            <div className="col-4 col-sm-3 text-right">Стоимость</div>
                            <div className="col-sm-5 d-none d-sm-block text-right">Дата</div>
                        </li>

                        {null === this.state.items ?
                            (<li className="row"><Spinner/></li>)
                            : this.state.items.map((productItem) => (
                                <ProductItem item={productItem} key={productItem.id}/>)
                            )
                        }
                    </ul>
                </div>
            </div>
            <br/>
            </span>
        );
    }
}

class ProductItem extends Component {
    render() {
        const item = this.props.item;
        return (
            <li className="row" style={{borderBottom: "dashed 1px #ccc"}}>
                <div className="col-4 col-sm-2">{item.price.toFixed(2)}</div>
                <div className="col-4 col-sm-2 text-center">{item.quantity.toFixed(2)}</div>
                <div className="col-4 col-sm-3 text-right">{item.sum.toFixed(2)}</div>
                <div className="col-6 d-sm-none"/>
                <div className="col-6 col-sm-5 text-right">
                    {(new Date(item.check.date)).toLocaleString('ru')}
                </div>
            </li>
        );
    }
}

export default Product;
