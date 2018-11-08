import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {QRStringsAPI} from '../../Api/v1/QRStringsAPI';

class QRString extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qr_string: this.props.qr_string.qr_string,
            is_valid: this.props.qr_string.is_valid,
            deleted: false,
        };
        this.original_qr_string = this.state.qr_string;
        this.updateSubmitHandler = this.updateSubmitHandler.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    updateSubmitHandler(event) {
        event.preventDefault();
        if (this.original_qr_string === this.state.qr_string) {
            return this;
        }
        QRStringsAPI.patch({qr_string: this.state.qr_string})
            .then((json) => this.original_qr_string = json.qr_string)
            .catch((response) => window.alert(response.json ? response.json.message : response.text.slice(0, 200)));
    }

    changeHandler(event) {
        event.preventDefault();
        this.setState({
            qr_string: event.target.value,
        });
    }

    deleteHandler(event) {
        event.preventDefault();
        if (!window.confirm(`Do you want to delete ${this.state.qr_string}?`)) {
            return this;
        }

        QRStringsAPI.delete(this.props.qr_string.id)
            .then(() => this.setState({deleted: true}))
            .catch((response) => window.alert(
                response.json ? response.json.message : response.text.slice(0, 200)
            ));
    }

    render() {
        let rowClass;
        let validString;
        if (this.state.is_valid === null) {
            rowClass = 'default';
            validString = 'Not checked';
        } else if (this.state.is_valid) {
            rowClass = 'success';
            validString = 'Valid';
        } else {
            rowClass = 'danger';
            validString = 'Invalid';
        }
        return (
            <div className={["qr_string", this.state.deleted ? "qr_string--deleted" :""].join(' ')}>
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-7 col-sm-12">
                                <form onSubmit={this.updateSubmitHandler}>
                                    <div className="row">
                                        <div className="col-8 col-sm-10">
                                            <input type="text"
                                                   className="qr_string__input"
                                                   value={this.state.qr_string}
                                                   autoComplete="off"
                                                   onChange={this.changeHandler}
                                            />
                                        </div>
                                        <div className="col-4 col-sm-2 text-right">
                                            <button type="submit" className="btn btn-sm btn-outline-info">
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                <br className="d-md-none"/>
                            </div>
                            <div className="col-md-3 col-6">
                                <span className={`text-${rowClass}`} style={{marginRight: '1em'}}>
                                    {validString}
                                </span>
                                {(this.props.qr_string.check_id ? <Link to={`/checks/${this.props.qr_string.check_id}`}>
                                    Check
                                </Link> : '')}
                            </div>
                            <div className="col-md-2 col-6 text-right">
                                <span onClick={this.deleteHandler}
                                      className="btn btn-sm btn-danger ">
                                        Delete
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
            </div>)
    }
}

export default QRString;