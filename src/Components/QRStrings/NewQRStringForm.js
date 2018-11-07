import React, {Component} from 'react';
import {QRStringsAPI} from '../../Api/v1/QRStringsAPI';

class NewQRStringForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qr_string: '',
            error_message: null,
            success: false,
        };
        this.checks = {};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.clearFrom = this.clearFrom.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            success: false,
            error_message: null,
        });

        QRStringsAPI.post({
            qr_string: this.state.qr_string,
        })
            .then(function (data) {
                this.setState({
                    success: true,
                });

                if ('channel' in this.props) {
                    this.props.channel.write(data)
                }
            }.bind(this))
            .catch(function (response) {
                return this.setState({
                    error_message: response.json ? response.json.message : response.text.slice(0, 200),
                })

            }.bind(this));
    }


    clearFrom(event) {
        event.preventDefault();
        this.setState({
            qr_string: '',
            success: false,
            error_message: null,
        })
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({
            qr_string: event.target.value,
        })
    }

    render() {
        return (
            <span>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <div className={["alert", "alert-danger", this.state.error_message ? '' : 'd-none'].join(' ')}
                             role="alert">
                            {this.state.error_message}
                        </div>
                        <div className={["alert", "alert-success", this.state.success ? '' : 'd-none'].join(' ')}
                             role="alert">
                            Saved
                        </div>
                        <label htmlFor="qr_string">
                            QR string
                        </label>
                        <input
                            id="qr_string"
                            type="text"
                            className="form-control"
                            aria-describedby="qr_code_help"
                            autoComplete="off"
                            placeholder="t=20180913T1449&s=468.03&fn=8710000101915576&i=4029&fp=774042432&n=1"
                            value={this.state.qr_string}
                            onChange={this.handleChange}
                        />
                        <small id="qr_code_help" className="form-text text-muted">
                            {'t={Date}&s={Total_sum}&fn={FN}&i={FD}&fp={FP}&n=1'}
                        </small>
                    </div>
                    <div className="row">
                        <div className="col">
                            <button type="submit" className="btn btn-primary">Get</button>
                        </div>
                        <div className="col"/>
                        <div className="col text-right">
                            <button type="reset" className="btn btn-outline-info" onClick={this.clearFrom}>
                                Clear
                            </button>
                        </div>
                    </div>
                </form>
            </span>
        );
    }
}

export default NewQRStringForm;
