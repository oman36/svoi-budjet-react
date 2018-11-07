import React, {Component} from 'react';
import CheckItem from "./CheckItem";
import Spinner from "./../Spinner";
import "./../../Api/v1/ChecksAPI";
import {ChecksAPI} from "../../Api/v1/ChecksAPI";

class Check extends Component {
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
            ChecksAPI.items(this.props.check.id, {
                'include': 'product',
            }).then(function (res) {
                this.setState({items: res.items});
            }.bind(this))
        }

        this.setState({
            displayItems: !this.state.displayItems,
        })
    }

    render() {
        let shopName;

        if (this.props.check.shop.name && 'unknown' !== this.props.check.shop.name) {
            shopName = this.props.check.shop.name;
        } else {
            shopName = this.props.check.shop.inn
        }
        return (
            <span>
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col col-md-6">{shopName}</div>
                        <div className="col col-md-6 text-right">
                            {new Date(this.props.check.date).toLocaleString("ru")}
                        </div>
                        <div className="col text-right">
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
                            <div className="col col-12 col-md-6">Наименование</div>
                            <div className="col text-right">Кол-во x Цена =</div>
                            <div className="col text-right">Стоимость</div>
                        </li>

                        {null === this.state.items ?
                            (<li className="row"><Spinner/></li>)
                            : this.state.items.map((check_item) => (
                                <CheckItem item={check_item} key={check_item.id}/>)
                            )
                        }
                    </ul>
                </div>
                <div className="card-footer text-right">
                    <b>Итого:</b> {this.props.check.total_sum}
                </div>
            </div>
            <br/>
            </span>
        );
    }
}

export default Check;
