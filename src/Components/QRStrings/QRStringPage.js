import React, {Component} from 'react';
import {QRStringsAPI} from "../../Api/v1/QRStringsAPI";
import PageNotFound from "../PageNotFound";
import {Link} from "react-router-dom";
import QRStringImages from "./QRStringImges";
import InputGroup from "../Misc/InputGroup";
import QRCode from 'qrcode.react';


class QRStringPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: null,
            notFound: false,
            qr_code_opened: false,
        };
    }

    componentDidMount() {
        this.id = parseInt(this.props.match.params.id);
        QRStringsAPI.one(this.id)
            .then((res) => this.setState({item: res}))
            .catch((res) => {
                if (res.status === 404) {
                    this.setState({notFound: true})
                }
            });
    }

    render() {
        if (this.state.notFound) {
            return <PageNotFound/>
        }
        if (null === this.state.item) {
            return ''
        }

        let validClass = 'danger';
        let validString = '\u2718';
        if (this.state.item.is_valid === null) {
            validClass = 'default';
            validString = '-';
        } else if (this.state.item.is_valid) {
            validClass = 'success';
            validString = '\u2714';
        }

        return (
            <span>
                <h1>QR String #{this.state.item.id}</h1>
                <InputGroup label="QR string" value={this.state.item.qr_string}/>
                <InputGroup label="Is valid" html={(
                    <span className={["form-control", `text-${validClass}`].join(' ')}
                          style={{background: 'transparent'}}
                    >{validString}</span>
                )}/>
                <InputGroup label="Check" html={(
                    <span className="form-control">
                    {!this.state.item.check_id ? '-' : (
                        <Link to={`/checks/${this.state.item.check_id}`}>
                            #{this.state.item.check_id}
                        </Link>
                    )}
                    </span>
                )}/>
                <div className="rounded border" style={{padding: '5px'}}>
                    <div className="btn btn-sm btn-info" role="button" onClick={() => this.setState({
                        qr_code_opened: !this.state.qr_code_opened,
                    })}>
                        <span>Qr code</span>
                        <span>{this.state.qr_code_opened ? '\u25B2' : '\u25BC'}</span>
                    </div>
                    {!this.state.qr_code_opened ? "" : (
                        <span>
                            <br/>
                            <br/>
                            <QRCode value={this.state.item.qr_string} size={256}/>
                        </span>
                    )}
                </div>
                <br/>
                <QRStringImages qr_string_id={this.id}/>
            </span>
        );
    }
}

export default QRStringPage;
