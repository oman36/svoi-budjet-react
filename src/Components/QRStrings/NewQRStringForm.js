import React, {Component} from 'react';
import QrReader from "react-qr-reader";
import {QRStringsAPI} from '../../Api/v1/QRStringsAPI';
import {Link} from "react-router-dom";

class NewQRStringForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qr_string: '',
            error: null,
            success: false,
            camera: false,
            greenInput: false,
        };
        this.checks = {};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.clearFrom = this.clearFrom.bind(this);
        this.handleScan = this.handleScan.bind(this);
        this.greenInputTimerId = null;
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            success: false,
            error: null,
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
                    error: response.json ? response.json : {message: response.text.slice(0, 200)},
                })

            }.bind(this));
    }


    clearFrom(event) {
        event.preventDefault();
        this.setState({
            qr_string: '',
            success: false,
            error: null,
        })
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({
            qr_string: event.target.value,
        })
    }

    handleScan(data) {
        if (!data) {
            return;
        }

        this.setState({
            qr_string: data,
            greenInput: true,
            camera: false,
        });

        clearTimeout(this.greenInputTimerId);
        this.greenInputTimerId = setTimeout(() => this.setState({greenInput: false}), 2500)
    }

    renderErrorMessage() {
        if (!this.state.error) {
            return '';
        }
        let additional;
        if (this.state.error.code === 1001) {
            additional = (<Link to={`/qr_strings/${this.state.error.item.id}`}>
                    {this.state.error.item.id}
                </Link>)
        }
        return (
            <span>
                {this.state.error.message}
                {additional ? <br/>: ''}
                {additional}
            </span>
        )
    }

    render() {
        return (
            <span>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <div className={["alert", "alert-danger", this.state.error ? '' : 'd-none'].join(' ')}
                             role="alert"
                             style={{overflowX: 'auto'}}
                        >
                            {this.renderErrorMessage()}
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
                            className={[
                                "form-control",
                                !this.state.greenInput ? "" : "border-success alert-success",
                            ].join(' ')}
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
                        <div className="col">
                            <span className="btn btn-outline-info"
                                  onClick={() => this.setState({camera: !this.state.camera})}
                                  role="img"
                                  aria-label="camera"
                            >
                                &#x1F4F7;
                            </span>
                        </div>
                        <div className="col"/>
                        <div className="col text-right">
                            <button type="reset" className="btn btn-outline-info" onClick={this.clearFrom}>
                                Clear
                            </button>
                        </div>
                    </div>
                </form>

                {!this.state.camera ? '' : <QrReader
                    delay={300}
                    onError={(err) => this.setState({error: {message: err.toString()}})}
                    onScan={this.handleScan}
                />}
            </span>
        );
    }
}

export default NewQRStringForm;
