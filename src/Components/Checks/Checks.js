import React, {Component} from 'react';
import Check from "./Check";
import {ChecksAPI} from '../../Api/ChecksAPI';

class Checks extends Component {
    render() {
        return (
            <span>
                {ChecksAPI.all().map((i) => <Check check={i}/>)}
            </span>
        )
    }
}

export default Checks;
