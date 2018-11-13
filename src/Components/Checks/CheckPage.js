import React, {Component} from 'react';
import {ChecksAPI} from "../../Api/v1/ChecksAPI";
import InputGroup from "../Misc/InputGroup";

class CheckPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: null,
            notFound: false,
        };
        this.fields = [
            {label: 'Shop', transformer: (check) => check ? check.shop.name : ''},
            {label: 'Shop INN', transformer: (check) => check ? check.shop.inn : ''},
            {label: 'Date', transformer: (check) => check ? (new Date(check.date)).toLocaleString('ru') : ''},
            {label: 'Discount', transformer: (check) => check ? check.discount.toFixed(2) : ''},
            {label: 'Discount sum', transformer: (check) => check ? check.discount_sum.toFixed(2) : ''},
            {label: 'Total sum', transformer: (check) => check ? check.total_sum.toFixed(2) : ''},
        ];
    }

    componentDidMount() {
        this.id = parseInt(this.props.match.params.id);
        ChecksAPI.one(this.id, {'include': ['items.product', 'shop']})
            .then((res) => this.setState({item: res}))
            .catch((res) => {
                if (res.status === 404) {
                    this.setState({notFound: true})
                }
            });
    }

    render() {
        return (
            <span>
            {this.state.notFound ? (
                <div className="alert alert-danger">
                    Page Not Found
                </div>
            ) : (
                <span>
                    <h1>Check #{this.id}</h1>
                    {this.fields.map((field, i) => (
                        <InputGroup key={i} label={field.label} value={field.transformer(this.state.item)}/>
                    ))}
                    {this.state.item ? <ItemsTable items={this.state.item.items}/> : ''}
                </span>
            )}
        </span>
        );
    }
}

class ItemsTable extends Component {
    render() {
        return (
            <div className="table-responsive-sm">
                <table className="table table-sm">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Sum</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.items.map((item, i) => (
                        <tr className={i % 2 ? '' : 'table-info'} key={item.id}>
                            <td>{item.product.name}</td>
                            <td className="text-right">{item.price.toFixed(2)}</td>
                            <td className="text-right">{item.quantity.toFixed(3)}</td>
                            <td className="text-right">{item.sum.toFixed(2)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default CheckPage;
