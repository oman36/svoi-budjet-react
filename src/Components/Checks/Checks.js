import React, {Component} from 'react';
import Check from "./Check";
import {ChecksAPI} from '../../Api/v1/ChecksAPI';

class Checks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checks: [],
            total_count: null,
        };

        ChecksAPI.all({
            'include': 'shop',
        }).then(response => this.setState({
            checks: response.items,
            total_count: response.total_count,
        }));
    }

    render() {
        return (
            <span>
                {this.state.checks.map((i) => <Check check={i}/>)}
            </span>
        )
    }
}

export default Checks;
