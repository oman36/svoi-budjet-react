import React, {Component} from 'react';
import {QRStringsAPI} from './../../Api/v1/QRStringsAPI';
import {Link} from 'react-router-dom';

class LatestQRStringsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            progress: 0,
        };
        this.updateInterval = 4000;
        this.progressBarStep = 100;
        this.updateList = this.updateList.bind(this);
        this.updateProgress = this.updateProgress.bind(this);
        this.pushQRString = this.pushQRString.bind(this);
        this.props.channel.addListener(this.pushQRString)
    }

    componentDidMount() {
        this.updateProgress(1);
    }

    componentWillUnmount() {
        clearTimeout(this.timerId);
    }

    updateProgress(progress) {
        let currentProgress;
        if ('undefined' !== typeof progress) {
            currentProgress = progress;
        } else {
            currentProgress = this.state.progress + this.progressBarStep / this.updateInterval;
        }

        if (currentProgress >= 1) {
            this.updateList();
            currentProgress = 0;
        }

        this.setState({
            progress: currentProgress,
        });

        return this.timerId = setTimeout(this.updateProgress, this.progressBarStep)
    }

    pushQRString(object) {
        clearTimeout(this.timerId);

        let items = this.state.items;
        items.pop();
        items.unshift(object);
        this.setState({
            items: items,
        });

        return this.updateProgress(0)
    }

    updateList() {
        QRStringsAPI.all({
            limit: 10,
            sort_by: '-created_at'
        })
            .then(function (data) {
                this.setState({items: data.items})
            }.bind(this));
    }

    render() {
        return (
            <span>
                <br/>
                <br/>
                <div className="progress" style={{height: '2px'}}>
                    <div className="progress-bar" role="progressbar"
                         style={{
                             width: (this.state.progress * 100) + '%',
                             transition: `width ${this.state.progress > 0.01 ? '0.15' : '0' }s ease`}}/>
                </div>
                <div className="table-responsive-sm">
                <table className="table table-sm table-striped">
                    <thead>
                    <tr>
                        <th scope="col">QR string</th>
                        <th scope="col">Check</th>
                        <th scope="col">Added</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.items.map((item) => {
                        let rowClass = "table-";
                        if (item.is_valid === null) {
                            rowClass += 'default'
                        } else if (item.is_valid) {
                            rowClass += 'success';
                        } else {
                            rowClass += 'danger';
                        }

                        return (
                            <tr className={rowClass} key={item.id}>
                                <td>
                                    {item.qr_string}
                                </td>
                                <td>
                                    {(item.check_id ? <Link to={`/checks/${item.check_id}`}>Check</Link> : '')}
                                </td>
                                <td>
                                    {(new Date(item.created_at)).toLocaleString("ru")}
                                </td>
                            </tr>)
                    })}
                    </tbody>
                </table>
                </div>
           </span>
        );
    }
}

export default LatestQRStringsTable;
