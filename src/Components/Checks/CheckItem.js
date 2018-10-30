import React, {Component} from 'react';

class CheckItem extends Component {
    render() {
        const item = this.props.item;
        return (
            <li className="row" style={{borderBottom: "dashed 1px #ccc"}}>
                <div className="col col-12 col-md-6">{item.product.name}</div>
                <div className="col col-2 col-md-12"/>
                <div className="col text-right">{item.quantity} x {item.price} =</div>

                <div className="col text-right">{item.sum}</div>
            </li>
        );
    }
}

export default CheckItem;
