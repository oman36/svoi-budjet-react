import React, {Component} from 'react';

class InputGroup extends Component {
    render() {
        return (
            <div className="input-group input-group-sm mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">
                        {this.props.label}
                    </span>
                </div>
                {this.props.html ? this.props.html :
                    <input readOnly
                           className="form-control"
                           value={this.props.value}
                           style={{background: 'transparent'}}
                    />}
            </div>
        );
    }
}
export default InputGroup;
