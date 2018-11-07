import React, {Component} from 'react';
import NewQRStringForm from './NewQRStringForm';
import LatestQRStringsTable from './LatestQRStringsTable';

class NewQRString extends Component {
    constructor(props) {
        super(props);
        this.channel = (function () {
            let listeners = [];
            return {
                addListener: function (callback) {
                    listeners.push(callback)
                },
                write: function (data) {
                    listeners.forEach(listener => listener(data))
                }
            }
        })();
    }

    render() {
        return (
            <span>
              <NewQRStringForm channel={this.channel}/>
              <LatestQRStringsTable channel={this.channel}/>
          </span>
        );
    }
}

export default NewQRString;